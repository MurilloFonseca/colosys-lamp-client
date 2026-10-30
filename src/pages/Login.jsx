import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import Loading from "../components/Loading";

function Login() {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated, login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const entrar = async (evento) => {
    evento.preventDefault();
    setErro("");

    if (!email.trim() || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email.trim())) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (senha.length < 8) {
      setErro("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    try {
      await login(email, senha);
    } catch {
      setSenha("")
      setErro("Email ou senha inválidos")
    }
  };

  if (isLoading) return <Loading />;

  if (isAuthenticated) navigate("/");

  return (
    <section className="min-h-screen bg-black px-5 py-10 text-texto sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-5xl">
        {/* Cabeçalho */}
        <header className="mb-10 text-center">
          <h1 className="mt-3 font-['Marcellus'] text-3xl text-amarelo-claro sm:text-4xl">
            Colosys Sentinel
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-texto/50">
            Entre com suas credenciais para acessar o sistema.
          </p>

          <div className="mx-auto mt-5 h-px w-16 bg-amarelo-escuro" />
        </header>

        {/* Formulário de login */}
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-amarelo-claro/15 bg-[#11110f] p-5 shadow-lg sm:p-8">
          <h2 className="font-['Playfair_Display'] text-xl italic text-amarelo-claro">
            Entrar na conta
          </h2>

          <p className="mt-2 text-sm text-texto/45">
            Informe seu e-mail e sua senha cadastrados.
          </p>

          <form onSubmit={entrar} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-sm text-texto/70"
              >
                E-mail
              </label>

              <input
                id="login-email"
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
                htmlFor="login-senha"
                className="mb-2 block text-sm text-texto/70"
              >
                Senha
              </label>

              <input
                id="login-senha"
                type="password"
                autoComplete="password"
                value={senha}
                onChange={(evento) => setSenha(evento.target.value)}
                placeholder="Digite sua senha"
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

            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center rounded-xl border border-amarelo-claro/30 bg-amarelo-claro/10 px-5 py-3 font-['Playfair_Display'] text-amarelo-claro transition duration-700 hover:border-amarelo-claro hover:bg-amarelo-claro/15 hover:shadow-[0_0_15px_rgba(234,179,8,0.1)]"
            >
              Entrar
            </button>
          </form>

          <div className="mt-7 border-t border-amarelo-claro/10 pt-6 text-center">
            <p className="text-sm text-texto/50">Ainda não tem uma conta?</p>

            <button
              type="button"
              onClick={() => navigate("/cadastro")}
              className="mt-3 w-full rounded-xl border border-amarelo-claro/20 px-5 py-3 font-['Playfair_Display'] text-amarelo-claro transition duration-700 hover:border-amarelo-claro hover:bg-amarelo-claro/5"
            >
              Criar conta
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
}

export default Login;
