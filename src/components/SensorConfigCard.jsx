import { C_to_F } from "../helpers/temperature";

const SensorConfigCard = ({ sensor, config, alterarValor }) => {
  const unidade = localStorage.getItem("unidade-temperatura") ?? "C";

  const mudar = sensor.nome === "Temperatura" && unidade === "F";

  return (
    <section
      key={sensor.id}
      className="rounded-2xl border border-amarelo-claro/15 bg-white/3 p-5 shadow-lg transition-all duration-500 hover:border-amarelo-claro/35 sm:p-6"
    >
      {/* Identificação do sensor */}
      <div className="mb-6 flex items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${sensor.fundo}/10 ${sensor.cor}`}
        >
          <i className={`fa-solid ${sensor.icon} text-xl`}></i>
        </div>

        <div>
          <h2 className="font-['Playfair_Display'] text-xl font-semibold text-amarelo-claro sm:text-2xl">
            {sensor.nome}
          </h2>

          <p className="mt-1 text-xs text-white/40 sm:text-sm">
            {sensor.descricaoConfig}
          </p>
        </div>
      </div>

      {/* Valores mínimo e máximo */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Mínimo */}
        <div className="flex flex-col gap-2">
          <label htmlFor={`${sensor.id}-min`} className="text-sm text-white/70">
            <i className="fa-solid fa-arrow-down-short-wide mr-2 text-white/40"></i>
            Valor mínimo
          </label>

          <div className="flex items-center rounded-xl border border-white/10 bg-black/40 transition-colors focus-within:border-amarelo-claro/50">
            <input
              id={`${sensor.id}-min`}
              type="number"
              step="any"
              value={
                mudar ? C_to_F(config[sensor.id].min) : config[sensor.id].min
              }
              onChange={(e) => alterarValor(sensor.id, "min", e.target.value)}
              className="w-full min-w-0 bg-transparent px-4 py-3 text-base text-white outline-none"
              required
            />

            <span className="px-4 text-sm text-amarelo-claro/70">
              {sensor.nome === "Temperatura" ? `°${unidade}` : sensor.unidade}
            </span>
          </div>
        </div>

        {/* Máximo */}
        <div className="flex flex-col gap-2">
          <label htmlFor={`${sensor.id}-max`} className="text-sm text-white/70">
            <i className="fa-solid fa-arrow-up-short-wide mr-2 text-white/40"></i>
            Valor máximo
          </label>

          <div className="flex items-center rounded-xl border border-white/10 bg-black/40 transition-colors focus-within:border-amarelo-claro/50">
            <input
              id={`${sensor.id}-max`}
              type="number"
              step="any"
              value={
                mudar ? C_to_F(config[sensor.id].max) : config[sensor.id].max
              }
              onChange={(e) => alterarValor(sensor.id, "max", e.target.value)}
              className="w-full min-w-0 bg-transparent px-4 py-3 text-base text-white outline-none"
              required
            />

            <span className="px-4 text-sm text-amarelo-claro/70">
              {sensor.nome === "Temperatura" ? `°${unidade}` : sensor.unidade}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SensorConfigCard;
