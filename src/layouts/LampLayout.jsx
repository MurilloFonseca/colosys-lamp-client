import { Outlet, useLocation, useNavigate } from "react-router-dom";

import lampButtons from "../data/lampButtons";
import { useLampStream } from "../hooks/useLampStream";
import Loading from "../components/Loading";

const LampLayout = () => {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  const { lamps } = useLampStream();

  const lamp = lamps.find((l) => l.deviceId === state?.id);

  if (!lamp) return <Loading />;

  return (
    <div className="fixed inset-0 z-50 min-h-screen w-full overflow-y-auto bg-[#090909] text-texto">
      {/* Fundo decorativo */}
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(128,91,16,0.13),transparent_55%)]"
        aria-hidden="true"
      />

      {/* Botão fechar */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="fixed right-5 top-5 z-50 flex cursor-pointer items-center justify-center rounded-lg border border-amarelo-claro/40 mr-3 p-2.5 text-amarelo-claro shadow transition-all duration-700 hover:scale-110 hover:border-amarelo-claro hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]"
        aria-label="Fechar dados da lâmpada"
        title="Fechar"
      >
        <i className="fa-solid fa-x text-xl" />
      </button>

      <div className="relative mx-auto flex min-h-screen w-full flex-col items-center px-4 pb-12 pt-20 sm:px-6 lg:px-10">
        <div className="w-full max-w-6xl">
          {/* Cabeçalho */}
          <header className="mb-8 flex flex-col items-center text-center">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-px w-8 bg-amarelo-claro/40 sm:w-12" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-amarelo-claro/60 sm:text-xs">
                Colosys Sentinel · Monitoramento
              </span>

              <span className="h-px w-8 bg-amarelo-claro/40 sm:w-12" />
            </div>

            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <div
                className={`h-3 w-3 shrink-0 rounded-full sm:h-4 sm:w-4 ${
                  lamp.state === "on"
                    ? "bg-luz-acessa shadow-[0_0_12px_4px_var(--color-luz-acessa)]"
                    : "bg-luz-apagada shadow-[0_0_12px_4px_var(--color-luz-apagada)]"
                }`}
              />

              <h1 className="wrap-break-words font-['Playfair_Display'] text-3xl font-semibold italic text-amarelo-claro sm:text-4xl lg:text-5xl">
                {lamp.name}
              </h1>
            </div>

            <p className="mt-3 text-xs tracking-widest text-texto/45 sm:text-sm">
              IDENTIFICADOR · {lamp.deviceId}
            </p>

            <div className="mt-5 flex items-center gap-2 rounded-full border border-amarelo-claro/15 bg-white/2.5 px-4 py-2">
              <i
                className={`fa-solid ${
                  lamp.state === "on" ? "fa-power-off" : "fa-moon"
                } text-xs ${
                  lamp.state === "on" ? "text-amarelo-claro" : "text-texto/40"
                }`}
              />

              <span className="text-xs text-texto/70">
                {lamp.state === "on" ? "Sistema ativo" : "Lâmpada desligada"}
              </span>
            </div>
          </header>

          {/* Três botões de navegação mantidos */}
          <nav
            className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-3 border-y border-amarelo-claro/10 py-5"
            aria-label="Seções dos dados da lâmpada"
          >
            {lampButtons.map((botao) => (
              <button
                key={botao.path}
                type="button"
                onClick={() =>
                  navigate(botao.path, { state: { id: state.id } })
                }
                aria-pressed={pathname === botao.path}
                className={`flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border px-3 py-3 text-sm transition-all duration-300 sm:min-w-40 sm:flex-none sm:px-6 sm:text-base ${
                  pathname === botao.path
                    ? "border-amarelo-claro/70 bg-amarelo-claro/10 text-amarelo-claro shadow-[0_0_18px_rgba(234,179,8,0.08)]"
                    : "border-white/10 bg-white/2 text-texto/55 hover:border-amarelo-claro/40 hover:text-amarelo-claro"
                }`}
              >
                <i className={`fa-solid ${botao.icon}`} />
                {botao.texto}
              </button>
            ))}
          </nav>

          {/* Main */}
          <main>
            <Outlet />
          </main>

          {/* Rodapé */}
          <footer className="mt-12 flex flex-col items-center gap-2 border-t border-amarelo-claro/10 pt-6 text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-amarelo-claro/40">
              Colosys Sentinel
            </span>

            <p className="text-xs text-texto/30">
              Sistema inteligente de monitoramento de ecossistemas
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LampLayout;
