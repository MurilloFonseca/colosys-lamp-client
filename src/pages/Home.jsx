import CardLamp from "../components/CardLamp";
import { useNavigate } from "react-router-dom";
import { useLampStream } from "../hooks/useLampStream";


const Home = () => {
  const navigate = useNavigate();

  const { lamps } = useLampStream();

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-black via-zinc-950 to-black text-texto">
      {/* Container principal com margens e padding responsivos. 
          Nota: pt-16 no mobile garante que o conteúdo não colide com o botão flutuante da sidebar */}
      <div className="w-full min-w-0 p-4 pt-16 sm:p-6 sm:pt-6 lg:p-8">
        {/* Cabeçalho da página */}
        <header className="mb-6 sm:mb-8">
          <h1 className="font-['Marcellus'] text-2xl text-amarelo-claro sm:text-3xl lg:text-4xl">
            Ecossistemas
          </h1>

          <p className="mt-1.5 text-xs sm:text-sm text-texto/60">
            Monitoramento das lâmpadas cadastradas.
          </p>
        </header>

        {/* Grelha de cartões e botão de adicionar */}
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-6 min-[480px]:grid-cols-2 xl:grid-cols-3">
          {lamps.map((lamp) => (
            <CardLamp key={lamp.deviceId} lamp={lamp} />
          ))}

          {/* Botão para Adicionar Ecossistema */}
          <button
            type="button"
            onClick={() => navigate("/lamp/cadastro")}
            className="flex min-h-45 sm:min-h-50 w-full min-w-0 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-amarelo-claro/25 bg-white/2 p-5 text-amarelo-claro/70 transition-all duration-300 hover:border-amarelo-claro/70 hover:bg-amarelo-claro/5 hover:text-amarelo-claro hover:shadow-[0_0_15px_rgba(234,179,8,0.1)] sm:rounded-3xl"
          >
            <i className="fa-solid fa-plus text-2xl sm:text-3xl" />

            <span className="text-center font-['Playfair_Display'] text-sm sm:text-base">
              Adicionar Ecossistema
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
