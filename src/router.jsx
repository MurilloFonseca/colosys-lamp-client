import { createBrowserRouter } from "react-router-dom";

// Layouts
import Sidebar from "./layouts/Sidebar";
import LampLayout from "./layouts/LampLayout";

// pages
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

// Sidebar pages
import Home from "./pages/Home";
import Manual from "./pages/Manual";
import Config from "./pages/Config";

// Lamp pages
import LampAtual from "./pages/Lamp/LampAtual";
import LampHistorico from "./pages/Lamp/LampHistorico";
import LampConfig from "./pages/Lamp/LampConfig";
import CadastrarLampada from "./pages/CadastrarLampada";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/manual",
        element: <Manual />,
      },
      {
        path: "/config",
        element: <Config />,
      },
      {
        path: "/lamp/cadastro",
        element: <CadastrarLampada />,
      },
    ],
  },
  {
    element: <LampLayout />,
    children: [
      {
        path: "/lamp/atual",
        element: <LampAtual />,
      },
      {
        path: "/lamp/historico",
        element: <LampHistorico />,
      },
      {
        path: "/lamp/config",
        element: <LampConfig />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
]);
