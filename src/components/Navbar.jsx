import { useState, useEffect } from "react";
import api from "../services/api";

function Navbar() {
  const [showLogged, setShowLogged] = useState(true);

  const botoes = [
    {
      id: 1,
      nome: "Inicio",
      link: "/",
      showLogged: true,
    },
    {
      id: 2,
      nome: "Usuarios",
      link: "/usuarios",
      showLogged: true,
    },
    {
      id: 3,
      nome: "Cadastro",
      link: "/cadastro",
      showLogged: showLogged,
    },
    {
      id: 4,
      nome: "Login",
      link: "/login",
      showLogged: showLogged,
    },
    {
      id: 5,
      nome: "Deslogar",
      link: "/login",
      showLogged: !showLogged,
      onClick: () => {
        localStorage.removeItem("token");
      },
    },
  ];

  async function autenticate() {
    await api
      .post("/users/autenticar", {}, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then(() => {
        setShowLogged(false);
      })
      .catch(() => {});
  }

  useEffect(() => async function () {
    autenticate();
  }, []);

  return (
    <nav className="h-[10vh] max-w-[100%] bg-green-800 border-b-2 border-white flex items-center justify-around">
      <h1 className="uppercase text-3xl font-bold text-white tracking-[10px]">
        Logo
      </h1>
      <div>
        <ul className="flex gap-10">
          {botoes.map(
            (botao) =>
              botao.showLogged && (
                <li
                  key={botao.id}
                  className="uppercase font-bold text-white cursor-pointer"
                >
                  <a onClick={botao.onClick} href={botao.link}>
                    {botao.nome}
                  </a>
                </li>
              )
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
