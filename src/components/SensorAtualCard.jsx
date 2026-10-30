import { C_to_F } from "../helpers/temperature";

const SensorAtualCard = ({ nome, valor, cor, largura }) => {
  const valorNumerico = Number.parseFloat(largura) || 0;
  const valorBarra = Math.min(100, Math.max(0, valorNumerico));

  const unidade = localStorage.getItem("unidade-temperatura") ?? "C";
  const valorNum = Number(valor.replace("%", "").replace("°C", ""));

  return (
    <article className="group flex min-w-0 flex-col rounded-2xl border border-amarelo-claro/15 bg-[#11110f] p-5 shadow-lg transition-all duration-300 hover:border-amarelo-claro/35 hover:shadow-[0_0_20px_rgba(234,179,8,0.05)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-sm text-texto/65">{nome}</span>

        <span className="text-[10px] uppercase tracking-wider text-texto/30">
          Atual
        </span>
      </div>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-['Playfair_Display'] text-3xl font-semibold text-amarelo-claro sm:text-4xl">
          {(nome === "Temperatura" && unidade === "F") ? C_to_F(valorNum) : valorNum}
        </span>

        <span className="text-sm text-texto/45">
          {valor.includes("°C") ? `°${unidade}` : "%"}
        </span>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between gap-2 text-xs text-texto/40">
          <span>Nível do sensor</span>
          <span>{largura}</span>
        </div>

        <div
          className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.07]"
          role="progressbar"
          aria-label={`Nível de ${nome}`}
          aria-valuenow={valorBarra}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={`h-full rounded-full ${cor} transition-all duration-700`}
            style={{ width: largura }}
          />
        </div>
      </div>
    </article>
  );
};

export default SensorAtualCard;
