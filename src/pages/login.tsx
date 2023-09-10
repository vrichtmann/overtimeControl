import { useState } from "react";
import { loginStore } from "../hooks/loginStore";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setLogged } = loginStore();

  const Login = () => {
    if (
      email === import.meta.env.VITE_LOGIN_EMAIL &&
      password === import.meta.env.VITE_LOGIN_PASSWORD
    ) {
      setLogged(true);
      localStorage.setItem("signed", "1");
    } else {
      alert("Usuário ou senha não existe");
    }
  };

  return (
    <div className="relative m-auto flex text-center p-6 md:p-0 lg:p-0">
      <div className="w-auto p-4">
        <div className="text-5xl mb-2 font-bold text-white">
          Overtime Control
        </div>
        <h1 className="text-md text-white">
          Crie e organize suas horas
          <span className="text-white"> </span>
        </h1>

        <div className="w-full">
          <input
            className="w-full mt-10 p-4 rounded-lg md:w-96"
            id="username"
            type="text"
            value={email}
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div>
          <input
            className="w-full mt-6 p-4 rounded-lg md:w-96"
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="mt-10 mb-2">
          <button
            className="bg-blue-500 w-full rounded-lg W-60 p-4 md:w-96 text-white text-xl font-bold"
            onClick={Login}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
