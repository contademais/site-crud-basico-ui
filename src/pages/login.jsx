import Navbar from "../components/Navbar";
import api from "../services/api";
import { useRef, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

function Login() {
  const inputEmail = useRef();
  const inputPassword = useRef();

  const [olho, setOlho] = useState(<EyeClosed />);
  const [visivel, setVisivel] = useState(false);
  const [tipoSenha, setTipoSenha] = useState("password");

  function mostrarSenha(aberto, fechado) {
    if (visivel) {
      setTipoSenha("password");
      setVisivel(false);
      setOlho(fechado);
    } else {
      setTipoSenha("text");
      setVisivel(true);
      setOlho(aberto);
    }
  }

  async function loginUser() {
    await api
      .post("/login", {
        email: inputEmail.current.value,
        password: inputPassword.current.value,
      })
      .then((res) => {
        alert("Usuário logado com sucesso!");
        localStorage.setItem("token", res.data.token);
        window.location.href = "/usuarios";
      })
      .catch((e) => {
        alert("Erro: " + e);
      });
  }

  return (
    <div className="h-auto min-h-screen max-w-screen min-w-screen bg-green-800">
      <Navbar />
      <div id="main" className="h-[90vh] flex items-center justify-center">
        <div
          id="form"
          className="bg-white h-auto w-[300px] md:w-[400px] rounded-3xl flex flex-col items-center gap-7"
        >
          <h1 className="mt-3 font-bold text-3xl">Login</h1>
          <div
            id="email e senha"
            className="flex flex-col w-[80%] items-center-safe"
          >
            <div className="flex flex-col items-start gap-5">
              <div className="flex flex-col">
                <label htmlFor="name">Email:</label>
                <div className="flex">
                  <input
                    id="email"
                    type="text"
                    ref={inputEmail}
                    placeholder="Insira seu email"
                    className="bg-slate-200 max-w-[100%] border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex flex-col max-w-[100%]">
                  <label htmlFor="password">Senha:</label>
                  <div className="flex">
                    <input
                      id="password"
                      type={tipoSenha}
                      ref={inputPassword}
                      placeholder="Insira sua senha"
                      className="bg-slate-200 border-slate-300 outline-slate-400 px-4 py-2 rounded-md mr-1 md:mr-3"
                      onPaste={(e) => e.preventDefault()}
                    />
                    <button
                      id="mostrarSenha"
                      className="cursor-pointer"
                      onClick={() => mostrarSenha(<Eye />, <EyeClosed />)}
                    >
                      {olho}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[213px] flex justify-center mb-5">
            <button
              type="submit"
              onClick={loginUser}
              className="bg-green-800 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
