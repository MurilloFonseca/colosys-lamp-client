import SectionHeading from "../../components/SectionHeading";
import SensorAtualCard from "../../components/SensorAtualCard";

import sensores from "../../data/sensores";

// MOCK
const lamp = {
  temperatura: 77,
  umidade: 95,
  luminosidade: 45,
};

const LampAtual = () => {
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
            valor={`${lamp[sensor.id] ?? 50}${sensor.unidade}`}
            largura={`${Math.min(100, Math.max(0, lamp[sensor.id] ?? 50))}%`}
          />
        ))}
      </div>
    </section>
  );
};

export default LampAtual;
