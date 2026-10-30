import { useCallback, useEffect, useReducer, useState } from "react";
import { getMe } from "../api/endpoints/auth";
import { API_URL } from "../api/apiClient";

const reducer = (state, action) => {
  switch (action.type) {
    case "snapshot":
      return Object.fromEntries(
        action.lamps.map((l) => [l.deviceId, { ...l, seenAt: null }]),
      );

    case "reading":
      return {
        ...state,
        [action.lamp.deviceId]: { ...action.lamp, seenAt: Date.now() },
      };

    case "upsert":
      return {
        ...state,
        [action.lamp.deviceId]: { ...action.lamp, seenAt: null },
      };

    case "delete": {
      // eslint-disable-next-line no-unused-vars
      const { [action.deviceId]: _removed, ...rest } = state;
      return rest;
    }

    default:
      return state;
  }
};

const parse = (event) => {
  try {
    return JSON.parse(event.data);
  } catch {
    return null;
  }
};

export const useLampStream = () => {
  const [byId, dispatch] = useReducer(reducer, {});
  const [status, setStatus] = useState("connecting");

  useEffect(() => {
    let active = true;
    let es = null;
    let timer = null;
    let attempt = 0;

    const connect = () => {
      // withCredentials: o navegador envia o cookie httpOnly do login (necessário entre origens diferentes).
      es = new EventSource(`${API_URL}/api/lamps/stream`, {
        withCredentials: true,
      });

      es.onopen = () => {
        attempt = 0;
        setStatus("open");
      };

      // O servidor usa eventos NOMEADOS ("event: snapshot"). Para eles, `es.onmessage` NÃO dispara:
      // é preciso addEventListener com o mesmo nome.
      es.addEventListener("snapshot", (e) => {
        const lamps = parse(e);
        if (Array.isArray(lamps)) dispatch({ type: "snapshot", lamps });
      });

      es.addEventListener("reading", (e) => {
        const lamp = parse(e);
        if (lamp?.deviceId) dispatch({ type: "reading", lamp });
      });

      es.addEventListener("upsert", (e) => {
        const lamp = parse(e);
        if (lamp?.deviceId) dispatch({ type: "upsert", lamp });
      });

      es.addEventListener("delete", (e) => {
        const data = parse(e);
        const deviceId = data?.deviceId ?? data?.id;

        if (deviceId) dispatch({ type: "delete", deviceId });
      });

      es.onerror = async () => {
        if (!active) return;

        if (es.readyState === EventSource.CONNECTING) {
          // Conexão caiu (rede, servidor reiniciando): o navegador reconecta sozinho, e o servidor
          // manda um snapshot novo ao conectar, que corrige qualquer leitura perdida.
          setStatus("reconnecting");
          return;
        }

        // CLOSED: o navegador desistiu de vez. Isso acontece com QUALQUER resposta diferente de 200:
        // 401 (sessão expirou), mas também 502/503 de um proxy ou do servidor ainda iniciando.
        // EventSource não informa o código, então perguntamos ao servidor se a sessão ainda vale.
        const res = await getMe().catch(() => null);

        if (!active) return;

        if (res && res.status === 401) {
          setStatus("unauthorized"); // sem nova tentativa: é preciso entrar de novo
          return;
        }

        setStatus("reconnecting");
        const delay = Math.min(1000 * 2 ** attempt++, 30_000); // 1 s, 2 s, 4 s ... até 30 s
        timer = setTimeout(connect, delay);
      };
    };

    connect();

    return () => {
      active = false;
      clearTimeout(timer);
      es?.close();
    };
  }, []);

  const upsertLamp = useCallback(
    (lamp) => dispatch({ type: "upsert", lamp }),
    [],
  );
  const removeLamp = useCallback(
    (deviceId) => dispatch({ type: "delete", deviceId }),
    [],
  );

  return {
    lamps: Object.values(byId),
    status,
    upsertLamp,
    removeLamp,
  };
};
