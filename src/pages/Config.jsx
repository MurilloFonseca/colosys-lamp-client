import { useState } from "react";

const Config = () => {
  const [unidade, setUnidade] = useState(
    () => localStorage.getItem("unidade-temperatura") || "C",
  );

  const alterarUnidade = (novaUnidade) => {
    setUnidade(novaUnidade);
    localStorage.setItem("unidade-temperatura", novaUnidade);
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-black via-zinc-950 to-black text-texto">
      {/* Container principal com margens e padding responsivos.
          O pt-16 no mobile evita a colisão com o botão flutuante da sidebar */}
      <div className="w-full min-w-0 p-4 pt-16 sm:p-6 sm:pt-6 lg:p-8">
        <div className="mx-auto w-full max-w-3xl">
          {/* Cabeçalho da página */}
          <header className="mb-8 sm:mb-10">
            <h1 className="font-['Marcellus'] text-2xl text-amarelo-claro sm:text-3xl lg:text-4xl">
              Configurações
            </h1>

            <p className="mt-1.5 sm:mt-3 text-xs sm:text-sm text-texto/60">
              Personalize sua experiência de monitoramento.
            </p>
          </header>

          {/* Secção de definições */}
          <section className="rounded-2xl border border-amarelo-claro/15 bg-linear-to-br from-[#252419] to-[#101010] p-5 shadow-[0_0_30px_rgba(234,179,8,0.05)] sm:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amarelo-claro/20 bg-amarelo-claro/10 text-xl text-amarelo-claro">
                <i className="fa-solid fa-temperature-half"></i>
              </div>

              <div>
                <h2 className="font-['Playfair_Display'] text-lg sm:text-xl">
                  Unidade de temperatura
                </h2>

                <p className="mt-1 text-xs sm:text-sm text-texto/60">
                  Escolha como deseja visualizar as temperaturas das lâmpadas.
                </p>
              </div>
            </div>

            {/* Grelha de opções de temperatura */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => alterarUnidade("C")}
                aria-pressed={unidade === "C"}
                className={`group flex flex-col items-center gap-2 sm:gap-3 rounded-xl border p-4 sm:p-5 transition-all duration-300 cursor-pointer ${
                  unidade === "C"
                    ? "border-amarelo-claro bg-amarelo-claro/10 text-amarelo-claro shadow-[0_0_18px_rgba(234,179,8,0.12)]"
                    : "border-amarelo-claro/10 bg-black/20 text-texto/60 hover:border-amarelo-claro/50 hover:text-amarelo-claro"
                }`}
              >
                <i className="fa-solid fa-temperature-three-quarters text-2xl"></i>

                <span className="font-['Marcellus'] text-xl sm:text-2xl">
                  °C
                </span>

                <span className="text-xs sm:text-sm">Celsius</span>

                {unidade === "C" && (
                  <span className="text-xs text-amarelo-claro">
                    <i className="fa-solid fa-check mr-1"></i>
                    Selecionado
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => alterarUnidade("F")}
                aria-pressed={unidade === "F"}
                className={`group flex flex-col items-center gap-2 sm:gap-3 rounded-xl border p-4 sm:p-5 transition-all duration-300 cursor-pointer ${
                  unidade === "F"
                    ? "border-amarelo-claro bg-amarelo-claro/10 text-amarelo-claro shadow-[0_0_18px_rgba(234,179,8,0.12)]"
                    : "border-amarelo-claro/10 bg-black/20 text-texto/60 hover:border-amarelo-claro/50 hover:text-amarelo-claro"
                }`}
              >
                <i className="fa-solid fa-temperature-half text-2xl"></i>

                <span className="font-['Marcellus'] text-xl sm:text-2xl">
                  °F
                </span>

                <span className="text-xs sm:text-sm">Fahrenheit</span>

                {unidade === "F" && (
                  <span className="text-xs text-amarelo-claro">
                    <i className="fa-solid fa-check mr-1"></i>
                    Selecionado
                  </span>
                )}
              </button>
            </div>

            <p className="mt-5 text-xs text-texto/40">
              <i className="fa-solid fa-circle-info mr-2"></i>
              Sua preferência fica salva neste navegador.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Config;
