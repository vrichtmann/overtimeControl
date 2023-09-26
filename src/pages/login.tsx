import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { loginStore } from "../hooks/loginStore";
import { FirebaseError } from "firebase/app";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setIsLoading } = loginStore();

  const login = async () => {
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setIsLoading(false);

      const firebaseError = error as FirebaseError;
      if (firebaseError) {
        if (ERROR_MESSAGES[firebaseError.code as keyof typeof ERROR_MESSAGES]) {
          alert(
            ERROR_MESSAGES[firebaseError.code as keyof typeof ERROR_MESSAGES]
          );
        }
      }
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
            type="email"
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
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

const ERROR_MESSAGES = {
  ["auth/invalid-login-credentials"]: "O Email ou usuário estão incorretos!",
  ["auth/missing-password"]: "Insira sua senha",
  ["auth/invalid-email"]: "Insira seu email",
};
