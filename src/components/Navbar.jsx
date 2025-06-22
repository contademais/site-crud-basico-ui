import { useState, useEffect } from "react";

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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setShowLogged(false);
    } else {
      setShowLogged(true);
    }
  }, [])

  return (
    <nav className="h-[10vh] max-h-[10%] max-w-[100vw] overflow-auto lg:overflow-hidden min-w-[100%] bg-green-800 border-b-2 border-white flex items-center justify-around">
      <h1 className="uppercase text-2xl font-bold text-white tracking-[5px] xl:tracking-[10px] xl:text-3xl">
        Logo
      </h1>
      <div>
        <ul className="flex gap-3 xl:gap-10">
          {botoes.map(
            (botao) =>
              botao.showLogged && (
                <li
                  key={botao.id}
                  className="text-xs xl:text-lg uppercase font-bold text-white cursor-pointer"
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
