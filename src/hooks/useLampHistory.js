import { useCallback, useEffect, useRef, useState } from "react";
import { getHistory } from "../api/endpoints/lamp";

export const HISTORY_SIZE = 100;
const KEYS = ["luminosity", "temperature", "humidity"];

const sameValues = (a, b) => KEYS.every((k) => a[k] === b[k]);

/**
 * Acrescenta `point` ao fim da lista, a menos que ele repita os valores do último ponto.
 * Mantém só os HISTORY_SIZE mais recentes.
 *
 * Por que ignorar valores repetidos? O Orion só notifica o STH-Comet quando algum valor MUDA,
 * então o histórico do servidor nunca tem dois pontos seguidos iguais. Aplicar a mesma regra aqui:
 *  - evita duplicar a leitura que já veio no histórico (emenda entre histórico e tempo real);
 *  - ignora leituras que só mudaram o estado da lâmpada (ligada/desligada), sem medição nova.
 */
export function appendPoint(points, point) {
  const last = points[points.length - 1];
  if (last && sameValues(last, point)) return points;
  return [...points, point].slice(-HISTORY_SIZE);
}

/**
 * Junta o histórico do servidor com os pontos que já chegaram ao vivo.
 * Só entram os pontos ao vivo mais novos que o fim do histórico.
 */
export function mergeHistory(history, current) {
  const last = history[history.length - 1];
  const cutoff = last ? Date.parse(last.t) : -Infinity;
  return current
    .filter((p) => Date.parse(p.t) > cutoff)
    .reduce(appendPoint, history);
}

/**
 * Histórico dinâmico de UMA lâmpada: as últimas 100 medições do servidor (STH-Comet),
 * mais cada nova leitura que chega pelo stream.
 *
 * @param deviceId      id da lâmpada
 * @param liveLamp      a mesma lâmpada, vinda de useLampStream() (ou undefined enquanto não chegou)
 * @param streamStatus  `status` de useLampStream(); ao reconectar, o histórico é recarregado
 *                      para preencher o que foi perdido durante a queda
 * @returns { points, status, reload }
 *   points: [{ t, luminosity, temperature, humidity }], do mais antigo para o mais novo
 *   status: 'loading' | 'ready' | 'unauthorized' | 'notfound' | 'unavailable'
 */
export function useLampHistory(deviceId, liveLamp, streamStatus) {
  const [points, setPoints] = useState([]);
  const [status, setStatus] = useState("loading");
  const [reloadKey, setReloadKey] = useState(0);
  const wasDown = useRef(false);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  // Outra lâmpada: começa do zero.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPoints([]);
  }, [deviceId]);

  // Carrega o histórico (na entrada, ao trocar de lâmpada, após reconexão ou em reload()).
  useEffect(() => {
    if (!deviceId) return undefined;
    let active = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus("loading");

    (async () => {
      try {
        const res = await getHistory(deviceId);

        if (!active) return;

        if (res.status === 404) return setStatus("notfound");
        if (!res.ok) return setStatus("unavailable");

        if (!active) return;
        // `current` guarda leituras que chegaram enquanto a requisição estava em andamento.
        setPoints((current) => mergeHistory(res.data.points, current));
        setStatus("ready");
      } catch {
        if (active) setStatus("unavailable");
      }
    })();

    return () => {
      active = false;
    };
  }, [deviceId, reloadKey]);

  // Cada leitura nova vira um ponto. `seenAt` muda a cada evento 'reading' (e é null em
  // snapshot/upsert, que não trazem medição nova).
  const seenAt = liveLamp?.seenAt;
  useEffect(() => {
    if (seenAt == null || liveLamp?.deviceId !== deviceId) return;
    if (KEYS.every((k) => liveLamp[k] == null)) return; // ainda sem nenhuma medição
    const point = {
      t: liveLamp.receivedAt ?? new Date(seenAt).toISOString(),
      luminosity: liveLamp.luminosity,
      temperature: liveLamp.temperature,
      humidity: liveLamp.humidity,
    };
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPoints((current) => appendPoint(current, point));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seenAt]);

  // Depois de uma queda do stream, recarrega o histórico para preencher o buraco.
  useEffect(() => {
    if (streamStatus === "reconnecting") {
      wasDown.current = true;
    } else if (streamStatus === "open" && wasDown.current) {
      wasDown.current = false;
      reload();
    }
  }, [streamStatus, reload]);

  return { points, status, reload };
}
