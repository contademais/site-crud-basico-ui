import Navbar from "../components/Navbar";
import api from "../services/api";
import { useEffect, useState } from "react";
import { BookPlus, BookMinus } from "lucide-react";

function Sobre() {
  let [users, setUsers] = useState([]);
  let [podaApagar, setPodaApagar] = useState(false);

  const permissions = {
    1: "Usuario",
    2: "Moderador",
    3: "Administrador",
  };

  const cores = {
    1: "bg-blue-600",
    2: "bg-yellow-600",
    3: "bg-purple-600",
  };

  async function Usuarios() {
    await api
      .get("/users/todos", {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then(async (res) => {
        if (res.data.length == 0) {
          setUsers([
            {
              id: 0,
              name: "Nenhum usuário encontrado",
              email: "",
              password: "",
            },
          ]);
          setPodaApagar(false);
        } else {
          setUsers(res.data);
          setPodaApagar(true);
        }
      })
      .catch(() => {
        setUsers([
          {
            id: 0,
            name: "Consulta não autorizada",
            email: "",
            password: "",
          },
        ]);
        setPodaApagar(false);
      });
  }

  async function ApagarUser(id) {
    try {
      await api
        .delete(`/users/${id}`, {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then(() => {
          setUsers(users.filter((user) => user.id !== id));
          alert("Usuário deletado com sucesso!");
        })
        .catch((e) => {
          alert(e.response.data.message);
        });
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  async function PromoteUser(id) {
    await api
      .put(
        `/users/promote/${id}`,
        {
          permLevel: users.find((user) => user.id === id).permLevel,
        },
        {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        Usuarios();
        alert(`Usuário promovido à ${permissions[res.data.permLevel]}!`);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }

  async function DemoteUser(id) {
    await api
      .put(
        `/users/demote/${id}`,
        {
          permLevel: users.find((user) => user.id === id).permLevel,
        },
        {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        Usuarios();
        alert(`Usuário rebaixado à ${permissions[res.data.permLevel]}!`);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }

  useEffect(() => {
    Usuarios();
  }, []);

  return (
    <div className="h-auto min-h-screen max-w-[100%] overflow-x-hidden min-w-screen bg-green-800">
      <Navbar />
      <div
        id="main"
        className="min-h-[90vh] max-w-[100vw] overflow-x-hidden h-auto flex items-center justify-center"
      >
        <div className="w-[100%] max-w-[100vw] flex flex-col overflow-x-hidden items-center">
          <div className="space-y-10 h-auto max-w-[100vw] overflow-x-hidden">
            {users.map((user) => (
              <div
                key={user.id}
                className={
                  "w-[250px] lg:w-[300px] rounded-2xl p-5 font-bold text-white " +
                  cores[user.permLevel]
                }
              >
                <div>
                  <h1 className="overflow-auto">{user.name}</h1>
                  <h1 className="overflow-auto">{user.email}</h1>
                  <h1
                    className="overflow-auto
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-neutral-500
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-neutral-600
                    "
                  >
                    {user.password}
                  </h1>
                  <h1 className="overflow-auto">
                    {permissions[user.permLevel]}
                  </h1>
                </div>
                <div className="flex gap-2">
                  {podaApagar ? (
                    <button
                      alt="Apagar"
                      className="bg-red-600 py-2 px-4 rounded-md cursor-pointer mt-5"
                      onClick={() => ApagarUser(user.id)}
                    >
                      Apagar usuário
                    </button>
                  ) : null}
                  <button
                    title="Promover"
                    className="cursor-pointer relative bottom-[-10px]"
                    onClick={() => PromoteUser(user.id)}
                  >
                    <BookPlus size={32} />
                  </button>
                  <button
                    title="Rebaixar"
                    className="cursor-pointer relative bottom-[-10px]"
                    onClick={() => DemoteUser(user.id)}
                  >
                    <BookMinus size={32} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sobre;
