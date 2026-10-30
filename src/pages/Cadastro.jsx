import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import Loading from "../components/Loading";
import { registerUser } from "../api/endpoints/auth";

const Cadastro = () => {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated, login } = useAuth();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const cadastrarUsuario = async (e) => {
    e.preventDefault();

    setErro("");
    setSucesso("");

    if (!nome.trim() || !email.trim() || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (senha.length < 8) {
      setErro("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    try {
      await registerUser(nome, email, senha);
      await login(email, senha);
      navigate("/");
    } catch {
      setSenha("");
      setErro("Erro ao cadastrar usuário");
    }
  };

  if (isLoading) return <Loading />;

  if (isAuthenticated) navigate("/");

  return (
    <section className="min-h-screen bg-black px-5 py-10 text-texto sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-5xl">
        {/* Cabeçalho */}
        <header className="mb-10 text-center">
          <h1 className="font-['Marcellus'] mt-3 text-3xl text-amarelo-claro sm:text-4xl">
            Colosys Sentinel
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-texto/50">
            Crie a sua conta
          </p>

          <div className="mx-auto mt-5 h-px w-16 bg-amarelo-escuro" />
        </header>

        {/* Formulário */}
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-amarelo-claro/15 bg-[#11110f] p-5 shadow-lg sm:p-8">
          <h2 className="font-['Playfair_Display'] text-xl italic text-amarelo-claro">
            Nova conta
          </h2>

          <p className="mt-2 text-sm text-texto/45">
            Informe seus dados para realizar o cadastro.
          </p>

          <form onSubmit={cadastrarUsuario} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="nome"
                className="mb-2 block text-sm text-texto/70"
              >
                Nome completo
              </label>

              <input
                id="nome"
                type="text"
                autoComplete="name"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                placeholder="Digite o nome completo"
                className="w-full rounded-xl border border-amarelo-claro/15 bg-black/40 px-4 py-3 text-sm text-texto outline-none transition placeholder:text-texto/25 focus:border-amarelo-claro/60"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-texto/70"
              >
                E-mail
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                placeholder="exemplo@email.com"
                className="w-full rounded-xl border border-amarelo-claro/15 bg-black/40 px-4 py-3 text-sm text-texto outline-none transition placeholder:text-texto/25 focus:border-amarelo-claro/60"
                required
              />
            </div>

            <div>
              <label
                htmlFor="senha"
                className="mb-2 block text-sm text-texto/70"
              >
                Senha
              </label>

              <input
                id="senha"
                type="password"
                autoComplete="new-password"
                value={senha}
                onChange={(evento) => setSenha(evento.target.value)}
                placeholder="Mínimo de 8 caracteres"
                minLength={8}
                className="w-full rounded-xl border border-amarelo-claro/15 bg-black/40 px-4 py-3 text-sm text-texto outline-none transition placeholder:text-texto/25 focus:border-amarelo-claro/60"
                required
              />
            </div>

            {erro && (
              <p
                role="alert"
                className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300"
              >
                {erro}
              </p>
            )}

            {sucesso && (
              <p
                role="status"
                className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-300"
              >
                {sucesso}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center rounded-xl border border-amarelo-claro/30 bg-amarelo-claro/10 px-5 py-3 font-['Playfair_Display'] text-amarelo-claro transition hover:border-amarelo-claro hover:bg-amarelo-claro/15 hover:shadow-[0_0_15px_rgba(234,179,8,0.1)] duration-700"
            >
              Criar conta
            </button>
          </form>

          <div className="mt-7 border-t border-amarelo-claro/10 pt-6 text-center">
            <p className="text-sm text-texto/50">Já tem uma conta?</p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-3 w-full rounded-xl border border-amarelo-claro/20 px-5 py-3 font-['Playfair_Display'] text-amarelo-claro transition duration-700 hover:border-amarelo-claro hover:bg-amarelo-claro/5"
            >
              Entrar
            </button>
          </div>
        </div>

        {/* Rodapé */}
        <p className="mt-8 text-center text-xs text-texto/30">
          COLOSYS SENTINEL · SISTEMA DE MONITORAMENTO DE ECOSSISTEMAS
        </p>
      </div>
    </section>
  );
};

export default Cadastro;
