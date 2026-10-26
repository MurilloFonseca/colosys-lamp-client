import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import logoImg from "/assets/logo.png";
import sidebarButtons from "../data/sidebarButtons";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const estiloBotao = (nome) =>
    `flex w-full max-w-50 cursor-pointer items-center justify-center rounded-xl border py-2 font-['Playfair_Display'] font-medium text-amarelo-claro shadow transition-all duration-300 hover:border-amarelo-claro hover:shadow-[0_0_15px_rgba(234,179,8,0.2)] ${
      pathname === nome
        ? "border-amarelo-claro bg-amarelo-claro/10"
        : "border-amarelo-claro/10"
    }`;

  return (
    <div className="flex w-screen h-screen bg-black">
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-90 bg- black/50 transition-all duration-300"
          aria-hidden="true"
        />
      )}

      <aside
        className={`left-0 top-0 z-100 flex h-screen flex-col justify-between rounded-r-lg bg-linear-to-br from-amarelo-mostarda to-black p-3 text-texto shadow-lg transition-[width] duration-300 ${
          isOpen ? "w-65" : "w-16"
        }`}
      >
        {/* Logo e botão do menu */}
        <div className="mb-8 flex items-center justify-between gap-2">
          {isOpen && (
            <div className="flex min-w-0 items-center gap-2 overflow-hidden">
              <img
                src={logoImg}
                alt="Logo Vinheria Agnello"
                className="h-6 w-6 shrink-0 object-contain"
              />

              <h1 className="truncate font-['Marcellus'] text-[16px] tracking-widest">
                Vinheria Agnello
              </h1>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsOpen((atual) => !atual)}
            className="flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-amarelo-claro/10 p-2.5 text-amarelo-claro shadow transition-all duration-300 hover:border-amarelo-claro hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
          >
            <i className="fa-solid fa-bars-staggered" />
          </button>
        </div>

        {/* Navegação */}
        <nav className="my-auto flex w-full flex-col items-center justify-center gap-4">
          {sidebarButtons.map(({ path, title, icon }) => (
            <button
              key={path}
              type="button"
              onClick={() => navigate(path)}
              className={estiloBotao(path)}
              title={title}
              aria-current={pathname === path ? "page" : undefined}
            >
              {isOpen ? title : <i className={`fa-solid fa-${icon}`} />}
            </button>
          ))}
        </nav>

        {/* Perfil do usuário */}
        <div
          className={`flex items-center overflow-hidden rounded-xl bg-[#282920f5] transition-all duration-300 ${
            isOpen
              ? "h-25 w-full gap-3 p-4"
              : "h-10 w-10 self-center justify-center p-2"
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-preto-transparente text-amarelo-escuro">
            <i className="fa-solid fa-user-secret text-2xl" />
          </div>

          {isOpen && (
            <div className="flex min-w-0 flex-1 flex-col gap-2 overflow-hidden">
              <h2 className="truncate font-['Playfair_Display'] font-semibold italic text-texto">
                User
              </h2>

              <p className="truncate font-light italic">Administrador</p>
              <div className="pl-18">
                <button className="w-20 cursor-pointer rounded-xl border border-amarelo-claro/40 bg-preto-transparente font-['Playfair_Display'] text-sm font-medium text-amarelo-claro shadow transition-all duration-300 hover:border-amarelo-claro hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      <main className="w-full min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
