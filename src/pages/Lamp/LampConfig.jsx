import { useState } from "react";
import SectionHeading from "../../components/SectionHeading";

import sensores from "../../data/sensores";
import SensorConfigCard from "../../components/SensorConfigCard";

const LampConfig = () => {
  const [config, setConfig] = useState({
    temperatura: { min: 15, max: 30 },
    umidade: { min: 40, max: 80 },
    luminosidade: { min: 20, max: 70 },
  });

  function alterarValor(sensor, tipo, valor) {
    setConfig((prev) => ({
      ...prev,
      [sensor]: {
        ...prev[sensor],
        [tipo]: parseInt(valor),
      },
    }));
  }

  const salvarConfiguracoes = (e) => {
    e.preventDefault();

    // Integração com o back-end será adicionada depois.
    console.log("Configurações da lâmpada:", config);
  };

  return (
    <section className="mx-auto w-full max-w-5xl">
      <SectionHeading
        eyebrow="Personalização"
        titulo="Configuração"
        descricao="Gerencie as configurações deste ecossistema."
      />

      <div className="mt-6">
        <div className="flex min-h-screen w-full flex-col items-center bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
          {/* Cabeçalho */}
          <header className="mb-10 flex w-full max-w-3xl flex-col items-center text-center">
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
              Defina os limites ideais para cada sensor e mantenha o ambiente da
              vinheria sob controle.
            </p>
          </header>

          {/* Configurações */}
          <form
            onSubmit={salvarConfiguracoes}
            className="flex w-full max-w-3xl flex-col gap-5"
          >
            {sensores.map((sensor) => (
              <SensorConfigCard
                key={sensor.id}
                sensor={sensor}
                config={config}
                alterarValor={alterarValor}
              />
            ))}

            {/* Botão salvar */}
            <div className="mt-3 flex flex-col items-center gap-3">
              <button
                type="submit"
                className="flex w-full max-w-sm items-center justify-center gap-3 rounded-full border border-amarelo-claro/40 bg-amarelo-claro/5 px-6 py-3 text-amarelo-claro shadow transition-all duration-500 hover:border-amarelo-claro hover:bg-amarelo-claro/10 hover:shadow-[0_0_20px_rgba(234,179,8,0.12)]"
              >
                <i className="fa-solid fa-floppy-disk"></i>
                Salvar configurações
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LampConfig;
