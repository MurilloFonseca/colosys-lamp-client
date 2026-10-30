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

const parse = (eventData) => {
  try {
    return JSON.parse(eventData);
  } catch {
    return null;
  }
};

export const useLampStream = () => {
  const [byId, dispatch] = useReducer(reducer, {});
  const [status, setStatus] = useState("connecting");

  useEffect(() => {
    let active = true;
    let timer = null;
    let attempt = 0;
    let abortController = null;

    const connect = async () => {
      if (!active) return;

      abortController = new AbortController();

      try {
        const response = await fetch(`${API_URL}/api/lamps/stream`, {
          method: "GET",
          credentials: "include", // Envia o cookie httpOnly do login
          headers: {
            "Accept": "text/event-stream",
            "ngrok-skip-browser-warning": "true", // Bypassa a página de aviso do ngrok
          },
          signal: abortController.signal,
        });

        if (!response.ok) {
          if (response.status === 401) {
            const res = await getMe().catch(() => null);
            if (!active) return;
            if (res && res.status === 401) {
              setStatus("unauthorized");
              return;
            }
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        attempt = 0;
        setStatus("open");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (active) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n\n");
          buffer = parts.pop();

          for (const part of parts) {
            let eventName = "message";
            let dataLines = [];

            const lines = part.split("\n");
            for (const line of lines) {
              if (line.startsWith("event:")) {
                eventName = line.replace("event:", "").trim();
              } else if (line.startsWith("data:")) {
                dataLines.push(line.replace("data:", "").trim());
              } else if (line.startsWith("data ")) {
                dataLines.push(line.replace("data ", "").trim());
              }
            }

            if (dataLines.length > 0) {
              const dataString = dataLines.join("\n");

              if (eventName === "snapshot") {
                const lamps = parse(dataString);
                if (Array.isArray(lamps)) dispatch({ type: "snapshot", lamps });
              } else if (eventName === "reading") {
                const lamp = parse(dataString);
                if (lamp?.deviceId) dispatch({ type: "reading", lamp });
              } else if (eventName === "upsert") {
                const lamp = parse(dataString);
                if (lamp?.deviceId) dispatch({ type: "upsert", lamp });
              } else if (eventName === "delete") {
                const data = parse(dataString);
                const deviceId = data?.deviceId ?? data?.id;
                if (deviceId) dispatch({ type: "delete", deviceId });
              }
            }
          }
        }
      } catch (error) {
        if (!active || error.name === "AbortError") return;

        setStatus("reconnecting");

        // Verifica se a sessão expirou
        const res = await getMe().catch(() => null);
        if (!active) return;

        if (res && res.status === 401) {
          setStatus("unauthorized");
          return;
        }

        const delay = Math.min(1000 * 2 ** attempt++, 30_000); // 1s, 2s, 4s ... até 30s
        timer = setTimeout(connect, delay);
      }
    };

    connect();

    return () => {
      active = false;
      clearTimeout(timer);
      abortController?.abort();
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