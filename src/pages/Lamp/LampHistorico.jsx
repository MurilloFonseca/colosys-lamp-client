import Grafico from "../../components/Grafico";
import SectionHeading from "../../components/SectionHeading";

import sensores from "../../data/sensores";

const LampHistorico = () => {
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
              cor={sensor.cor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LampHistorico;
