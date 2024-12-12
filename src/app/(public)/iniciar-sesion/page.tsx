"use client";

import { KeyboardEvent, useState } from "react";

import { PAGES } from "@/consts/pages.const";
import { loginApi } from "@/api/login.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/utils/validations.util";

const INITIAL_ERRORS = {
  email: "",
  password: "",
  login: "",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const router = useRouter();

  const validateFields = () => {
    let emailError = "";
    let passwordError = "";

    if (!validateEmail(email)) {
      emailError = "El correo electrónico no es válido.";
    }

    if (!password) {
      passwordError = "La contraseña no puede estar vacía.";
    }

    setErrors({ email: emailError, password: passwordError, login: "" });

    return !emailError && !passwordError;
  };

  const login = async () => {
    if (!validateFields()) {
      if (errors.email) toast.error(errors.email);
      if (errors.password) toast.error(errors.password);
      return;
    }

    try {
      const { data, ok } = await loginApi(email, password);
      if (ok && data.token) {
        localStorage.setItem("authToken", data.token);
        router.push(PAGES.calendar);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          login: data.error || "Credenciales incorrectas.",
        }));
        toast.error(data.error || "Credenciales incorrectas.");
      }
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        login: "Error de red. Por favor, intenta de nuevo.",
      }));
      toast.error("Error de red. Por favor, intenta de nuevo.");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-white">
          Iniciar sesión
        </h2>
        <div className="space-y-4">
          <input
            type="email"
            className={`w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <input
            type="password"
            className={`w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.password ? "border-red-500" : ""
            }`}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <button
          onClick={login}
          disabled={!validateEmail(email) || !password}
          className={`w-full py-2 mt-4 text-white rounded-lg focus:outline-none ${
            !validateEmail(email) || !password
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          Iniciar sesión
        </button>
        {/* <div className="flex justify-between mt-4">
          <a
            href={PAGES.forgotPassword}
            className="text-sm text-indigo-400 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div> */}
      </div>
    </div>
  );
}
