import { useLocation } from "react-router-dom";
import Grafico from "../../components/Grafico";
import SectionHeading from "../../components/SectionHeading";

import sensores from "../../data/sensores";
import { useLampStream } from "../../hooks/useLampStream";
import Loading from "../../components/Loading";
import { useLampHistory } from "../../hooks/useLampHistory";
import { C_to_F } from "../../helpers/temperature";

const colors = {
  temperature: "#fbd1a2",
  humidity: "#96f7ed",
  luminosity: "#b7e4c7",
};

const LampHistorico = () => {
  const unidade = localStorage.getItem("unidade-temperatura") ?? "C";

  const { state } = useLocation();
  const { lamps, status: streamStatus } = useLampStream();

  const lamp = lamps.find((l) => l.deviceId === state?.id);

  const { points } = useLampHistory(state?.id, lamp, streamStatus);

  const rows = [...points].reverse();

  if (!lamp) return <Loading />;

  return (
    <section className="mx-auto w-full max-w-4xl">
      <SectionHeading
        eyebrow="Registro de atividade"
        titulo="Histórico"
        descricao="Consulte os registros e as variações dos sensores."
      />

      {/* Gráficos: estrutura mantida, sem quadradinhos com ícones */}
      <div className="mt-12">
        <div className="mt-7 grid w-full grid-cols-1 gap-5">
          {sensores.map((sensor) => (
            <Grafico
              key={sensor.id}
              nome={sensor.nome}
              descricao={sensor.descricaoHistorico}
              cor={colors[sensor.id]}
              x={rows.map(({ t }) => t)}
              y={rows.map((row) =>
                sensor.nome === "Temperatura" && unidade === "F"
                  ? C_to_F(row[sensor.id])
                  : row[sensor.id],
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LampHistorico;
