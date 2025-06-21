import "./App.css";
import Navbar from "./components/Navbar.jsx";
import api from "./services/api";
import { useState, useRef } from "react";

function App() {
  const [user, setUser] = useState({});
  const EmailInput = useRef();

  async function getUser() {
    await api
      .get(`/users/${EmailInput.current.value}`, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }

  return (
    <div className="h-auto min-h-screen max-w-screen min-w-screen bg-green-800">
      <Navbar />
      <div className="flex flex-col items-center justify-evenly h-[90vh]">
        <div id="Titulo">
          <h1 className="font-bold text-3xl text-white">Pesquisa de ID's</h1>
        </div>
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Insira o Email do Usuário"
            ref={EmailInput}
            className="bg-slate-200 border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
          />
          <button
            onClick={() => getUser()}
            className="bg-slate-500 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Buscar
          </button>
          <div
            className="bg-slate-500 border-slate-300 text-white outline-slate-400 px-4 py-2 rounded-md"
            key={user.id}
          >
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.password}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
