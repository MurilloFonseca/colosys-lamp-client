import CardLamp from "../components/CardLamp";
import { useNavigate } from "react-router-dom";

// MOCK
const lamps = [
  {
    deviceId: "Lamp127",
    name: "Lamp 01",
    state: "off",
    luminosity: 55.0,
    temperature: 24.4,
    humidity: 53.0,
  },
  {
    deviceId: "Lamp67",
    name: "Lampada teste",
    state: "on",
    luminosity: 52.0,
    temperature: 24.2,
    humidity: 57.0,
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen min-w-0 bg-linear-to-br bg-">
        <div className="w-full min-w-0 p-3 sm:p-5 lg:p-8">
          <div className="mb-6">
            <h1 className="font-['Marcellus'] mt-6 text-2xl text-amarelo-claro sm:text-3xl">
              Ecossistemas
            </h1>

            <p className="mt-2 text-sm text-texto/50">
              Monitoramento das lâmpadas cadastradas.
            </p>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 min-[420px]:grid-cols-2 xl:grid-cols-3">
            {lamps.map((lamp) => (
              <CardLamp key={lamp.deviceId} lamp={lamp} />
            ))}

            <button
              type="button"
              onClick={() => navigate("/lamp/cadastro")}
              className="flex min-h-44 min-w-0 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-amarelo-claro/25 bg-white/2 p-5 text-amarelo-claro/70 transition hover:border-amarelo-claro/70 hover:bg-amarelo-claro/5 hover:text-amarelo-claro sm:rounded-3xl"
            >
              <i className="fa-solid fa-plus text-3xl" />

              <span className="text-center font-['Playfair_Display'] text-base">
                Adicionar Ecossistema
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
