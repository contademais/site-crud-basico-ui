import Navbar from "../components/Navbar";
import api from "../services/api";
import { useRef, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

function Cadastro() {
  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();

  async function createUser() {
    if (inputPassword.current.value === inputConfirmPassword.current.value) {
      await api
        .post("/register", {
          name: inputName.current.value,
          email: inputEmail.current.value,
          password: inputPassword.current.value,
        })
        .then(() => {
          alert("Usuário cadastrado com sucesso!");
          window.location.href = "/login";
        })
        .catch((e) => {
          alert(e.response.data.message);
        })
        .finally(() => {
          inputName.current.value = "";
          inputEmail.current.value = "";
          inputPassword.current.value = "";
          inputConfirmPassword.current.value = "";
        });
    } else {
      alert("As senhas devem ser iguais!");
    }
  }

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

  return (
    <div className="h-auto min-h-screen max-w-screen min-w-screen bg-green-800">
      <Navbar />
      <div id="main" className="h-[90vh] flex items-center justify-center">
        <div
          id="form"
          className="bg-white h-auto w-[400px] rounded-3xl flex flex-col items-center gap-7"
        >
          <h1 className="mt-3 font-bold text-3xl">Cadastro</h1>
          <div className="flex flex-col">
            <label htmlFor="name">Nome:</label>
            <input
              id="name"
              type="text"
              ref={inputName}
              placeholder="Insira seu nome"
              className="bg-slate-200 border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              ref={inputEmail}
              placeholder="Insira seu email"
              className="bg-slate-200 border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Senha: (mínimo 8 caracteres)</label>
            <div className="flex w-[213px]">
              <input
                id="password"
                type={tipoSenha}
                ref={inputPassword}
                placeholder="Insira sua senha"
                className="bg-slate-200 border-slate-300 outline-slate-400 px-4 py-2 rounded-md mr-3"
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
          <div className="flex flex-col">
            <label htmlFor="confirmPassword">Confirme a senha:</label>
            <input
              id="confirmPassword"
              type={tipoSenha}
              ref={inputConfirmPassword}
              placeholder="Confirme sua senha"
              className="bg-slate-200 border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
              onPaste={(e) => e.preventDefault()}
            />
          </div>
          <div className="w-[213px] mb-5 flex justify-center">
            <button
              type="submit"
              onClick={createUser}
              className="bg-green-800 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
