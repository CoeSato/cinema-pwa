import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import MenuPrivado from "./componentes/MenuPrivado";
import MenuPublico from "./componentes/MenuPublico";
import Home from "./componentes/telas/Home";
import Sobre from "./componentes/telas/Sobre";
import Filmes from "./componentes/telas/filme/Filme";
import Diretores from "./componentes/telas/diretor/Diretor";
import Series from "./componentes/telas/serie/Serie";
import Login from "./componentes/telas/login/Login";
import Cadastro from "./componentes/telas/cadastro/Cadastro";
import UsuarioPerfil from './componentes/telas/usuario/UsuarioPerfil';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPublico />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "sobre",
        element: <Sobre />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "cadastro",
        element: <Cadastro />
      },
      {
        path: "*",
        element: <h1>404 - Página não encontrada</h1>
      }
    ]
  },
  {
    path: "/privado",
    element: <MenuPrivado />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "filmes",
        element: <Filmes />
      },
      {
        path: "series",
        element: <Series />
      },
      {
        path: "diretores",
        element: <Diretores />
      },
      {
        path: "perfil",
        element: <UsuarioPerfil />
      },
      {
        path: "sobre",
        element: <Sobre />
      },
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;