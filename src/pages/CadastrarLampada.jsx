import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLamp } from "../api/endpoints/lamp";

const CadastrarLampada = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idLimpo = id.trim();
    const nomeLimpo = nome.trim();

    if (!idLimpo || !nomeLimpo) {
      setErro("Preencha o ID e o nome do ecossistema.");
      return;
    }

    try {
      await createLamp(idLimpo, nomeLimpo);
      navigate(-1)
    } catch {
      setErro("Algo deu errado! Tente novamente")
    }
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center bg-linear-to-br from-[#090909] via-[#10100f] to-[#0a0a0a] p-4 text-texto sm:p-6 lg:p-8">
      {/* Botão fechar */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="fixed right-5 top-5 z-50 flex cursor-pointer items-center justify-center rounded-lg border border-amarelo-claro/40 p-2.5 text-amarelo-claro shadow transition-all duration-700 hover:scale-110 hover:border-amarelo-claro hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]"
        aria-label="Fechar cadastro de ecossistema"
        title="Fechar"
      >
        <i className="fa-solid fa-x text-xl" />
      </button>

      {/* Conteúdo centralizado */}
      <div className="mx-auto w-full max-w-2xl">
        {/* Cabeçalho */}
        <div className="mb-8 pr-12">
          <span className="text-xs uppercase tracking-[0.25em] text-amarelo-claro/60">
            Gerenciamento
          </span>

          <h1 className="mt-2 font-['Marcellus'] text-2xl text-amarelo-claro sm:text-3xl">
            Cadastrar ecossistema
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-texto/60 sm:text-base">
            Cadastre uma nova lâmpada informando seu identificador e o nome que
            será exibido no painel.
          </p>
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-amarelo-claro/15 bg-fundo-card p-5 shadow-lg sm:rounded-3xl sm:p-8"
        >
          {/* Título do formulário */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amarelo-claro/20 bg-amarelo-claro/5 text-amarelo-claro">
              <i className="fa-solid fa-lightbulb text-xl" />
            </div>

            <div>
              <h2 className="font-['Playfair_Display'] text-lg font-semibold">
                Dados da lâmpada
              </h2>

              <p className="text-sm text-texto/50">
                Os campos são obrigatórios.
              </p>
            </div>
          </div>

          {/* ID */}
          <div className="mb-5">
            <label
              htmlFor="eco-id"
              className="mb-2 block font-['Playfair_Display'] text-sm text-amarelo-claro"
            >
              ID do ecossistema
            </label>

            <input
              id="eco-id"
              name="id"
              type="text"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                setErro("");
              }}
              placeholder="Ex.: LAMP-003"
              maxLength={40}
              required
              className="w-full min-w-0 rounded-xl border border-amarelo-claro/20 bg-black/40 px-4 py-3 text-sm text-texto outline-none transition placeholder:text-texto/30 focus:border-amarelo-claro focus:ring-1 focus:ring-amarelo-claro/30"
            />

            <p className="mt-2 text-xs text-texto/40">
              Coloque o ID presente no seu equipamento.
            </p>
          </div>

          {/* Nome */}
          <div className="mb-5">
            <label
              htmlFor="eco-nome"
              className="mb-2 block font-['Playfair_Display'] text-sm text-amarelo-claro"
            >
              Nome do Ecossistema
            </label>

            <input
              id="eco-nome"
              name="nome"
              type="text"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                setErro("");
              }}
              placeholder="Ex.: Lamp 03"
              maxLength={60}
              required
              className="w-full min-w-0 rounded-xl border border-amarelo-claro/20 bg-black/40 px-4 py-3 text-sm text-texto outline-none transition placeholder:text-texto/30 focus:border-amarelo-claro focus:ring-1 focus:ring-amarelo-claro/30"
            />
          </div>

          {/* Mensagem de erro */}
          {erro && (
            <p
              role="alert"
              className="mb-5 rounded-xl border border-red-400/30 bg-red-950/30 p-3 text-sm text-red-300"
            >
              <i className="fa-solid fa-circle-exclamation mr-2" />
              {erro}
            </p>
          )}

          {/* Ações */}
          <div className="flex flex-col-reverse gap-3 border-t border-amarelo-claro/10 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full cursor-pointer rounded-xl border border-amarelo-claro/20 px-5 py-3 text-sm text-texto/70 transition hover:border-amarelo-claro/60 hover:text-amarelo-claro sm:w-auto"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-xl border border-amarelo-claro/40 bg-amarelo-claro/10 px-5 py-3 font-['Playfair_Display'] text-sm font-medium text-amarelo-claro transition hover:border-amarelo-claro hover:bg-amarelo-claro/15 sm:w-auto"
            >
              <i className="fa-solid fa-plus mr-2" />
              Cadastrar lâmpada
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CadastrarLampada;
