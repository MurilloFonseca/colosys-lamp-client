import { useNavigate } from "react-router-dom";

const CardLamp = ({ lamp }) => {
  const navigate = useNavigate();

  const sensoresLamp = [
    {
      nome: "Umidade",
      valor: lamp.humidity,
      cor: "bg-umidade",
      icone: "fa-droplet",
      unidade: "%",
    },
    {
      nome: "Luz",
      valor: lamp.luminosity,
      cor: "bg-luz",
      icone: "fa-lightbulb",
      unidade: "%",
    },
    {
      nome: "Temperatura",
      valor: lamp.temperature,
      cor: "bg-temperatura",
      icone: "fa-temperature-quarter",
      unidade: "%",
    },
  ];

  return (
    <article
      className={`flex min-w-0 flex-col items-center justify-center rounded-2xl border bg-fundo-card p-4 text-texto sm:rounded-3xl sm:p-6 lg:p-7 ${
        lamp.state === "on"
          ? "border-alerta-borda-card shadow-[0_0_12px_var(--color-alerta-borda-card)]"
          : "border-borda-card"
      }`}
    >
      <div className="flex w-full min-w-0 items-center justify-center gap-2 sm:gap-3">
        <div
          className={`h-3 w-3 shrink-0 rounded-full sm:h-5 sm:w-5 ${
            lamp.state === "on"
              ? "bg-luz-acessa shadow-[0_0_12px_4px_var(--color-luz-acessa)]"
              : "bg-luz-apagada shadow-[0_0_12px_4px_var(--color-luz-apagada)]"
          }`}
        />

        <h2 className="truncate font-['Playfair_Display'] text-base font-semibold italic sm:text-xl">
          {lamp.name}
        </h2>
      </div>

      <p className="mt-2 max-w-full truncate text-xs text-texto/40">
        ID: {lamp.deviceId}
      </p>

      <div className="mt-5 flex w-full max-w-60 flex-col gap-4 sm:mt-6">
        {sensoresLamp.map((sensor) => {
          const valor = Math.min(100, Math.max(0, Number(sensor.valor) || 0));

          return (
            <div key={sensor.nome} className="w-full">
              <div className="mb-1 flex justify-between gap-2 text-xs text-texto/60">
                <span>{sensor.nome}</span>
                <span>
                  {sensor.valor}
                  {sensor.unidade}
                </span>
              </div>

              <div
                className="h-3 w-full overflow-hidden rounded-full bg-black/30"
                role="progressbar"
                aria-label={`${sensor.nome} ${lamp.nome}`}
                aria-valuenow={valor}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={`flex h-full items-center justify-center rounded-full ${sensor.cor} transition-all duration-500`}
                  style={{ width: `${valor}%` }}
                >
                  {valor > 0 && (
                    <i
                      className={`fa-solid ${sensor.icone} text-[8px] text-black`}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => navigate("/lamp/atual")}
        className="mt-5 w-full max-w-32 cursor-pointer rounded-2xl border border-amarelo-claro/40 bg-preto-transparente py-2 font-['Playfair_Display'] text-sm font-medium text-amarelo-claro shadow transition-all duration-300 hover:border-amarelo-claro hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]"
      >
        Ver +
      </button>

      {lamp.state === "on" && (
        <div className="mt-5 flex w-full min-w-0 justify-center">
          <div className="flex max-w-full items-center gap-2 rounded-xl border border-red-400/30 bg-red-950/50 px-3 py-2 text-red-300">
            <i className="fa-solid fa-triangle-exclamation shrink-0 text-xs" />

            <span className="text-center font-['Playfair_Display'] text-xs sm:text-sm">
              Ecossistema em Desequilíbrio
            </span>
          </div>
        </div>
      )}
    </article>
  );
};

export default CardLamp;
