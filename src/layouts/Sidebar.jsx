import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import logoImg from "/assets/logo.png";
import sidebarButtons from "../data/sidebarButtons";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [openPathname, setOpenPathname] = useState(null);
  const isOpen = openPathname === pathname;

  const estiloBotao = (nome) =>
    `flex w-full max-w-50 cursor-pointer items-center justify-center rounded-xl border py-2 font-['Playfair_Display'] font-medium text-amarelo-claro shadow transition-all duration-300 hover:border-amarelo-claro hover:shadow-[0_0_15px_rgba(234,179,8,0.2)] ${
      pathname === nome
        ? "border-amarelo-claro bg-amarelo-claro/10"
        : "border-amarelo-claro/10"
    }`;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex w-full overflow-x-hidden bg-black">
      {/* Overlay para fechar no mobile quando aberto */}
      {isOpen && (
        <div
          onClick={() => setOpenPathname(null)}
          className="fixed inset-0 z-40 bg-black/50 transition-all duration-300 md:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col justify-between rounded-r-lg bg-linear-to-br from-amarelo-mostarda to-black p-3 text-texto shadow-lg transition-all duration-300 ${
          isOpen
            ? "w-65 translate-x-0"
            : "w-16 -translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo e botão do menu */}
        <div className="mb-8 flex items-center justify-between gap-2">
          {isOpen && (
            <div className="flex min-w-0 items-center gap-2 overflow-hidden">
              <img
                src={logoImg}
                alt="Logo Colosys"
                className="h-6 w-6 shrink-0 object-contain"
              />

              <h1 className="truncate font-['Marcellus'] text-[16px] tracking-widest">
                Colosys Sentinel
              </h1>
            </div>
          )}

          <button
            type="button"
            onClick={() => setOpenPathname(isOpen ? null : pathname)}
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
              onClick={() => handleNavigation(path)}
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

      <main className="min-h-screen min-w-0 w-full flex-1 md:ml-16 transition-all duration-300 overflow-x-hidden">
        {/* Botão flutuante extra para abrir o menu em dispositivos móveis caso esteja oculto */}
        {!isOpen && (
          <button
            type="button"
            onClick={() => setOpenPathname(pathname)}
            className="fixed left-4 top-4 z-30 flex md:hidden cursor-pointer items-center justify-center rounded-lg border border-amarelo-claro/20 bg-black/80 p-3 text-amarelo-claro shadow-lg backdrop-blur-md transition-all duration-300 hover:border-amarelo-claro"
            aria-label="Abrir menu"
          >
            <i className="fa-solid fa-bars-staggered text-lg" />
          </button>
        )}

        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
