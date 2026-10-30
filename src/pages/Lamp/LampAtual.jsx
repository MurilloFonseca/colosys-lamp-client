import { useLocation } from "react-router-dom";
import SectionHeading from "../../components/SectionHeading";
import SensorAtualCard from "../../components/SensorAtualCard";
import Loading from "../../components/Loading";

import sensores from "../../data/sensores";
import { useLampStream } from "../../hooks/useLampStream";

const LampAtual = () => {
  const { state } = useLocation();
  const { lamps } = useLampStream();

  const lamp = lamps.find((l) => l.deviceId === state?.id);

  if (!lamp) return <Loading />;

  return (
    <section>
      <SectionHeading
        eyebrow="Leitura em tempo real"
        titulo="Sensores atuais"
        descricao="Acompanhe as condições atuais do ecossistema."
      />

      <div className="mt-7 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {sensores.map((sensor) => (
          <SensorAtualCard
            key={sensor.id}
            nome={sensor.nome}
            cor={sensor.fundo}
            valor={`${lamp[sensor.id]}${sensor.unidade}`}
            largura={`${sensor.nome === "Temperatura" ? 2 * Math.min(100, Math.max(0, lamp[sensor.id] ?? 0)) : Math.min(100, Math.max(0, lamp[sensor.id] ?? 0))}%`}
          />
        ))}
      </div>
    </section>
  );
};

export default LampAtual;
