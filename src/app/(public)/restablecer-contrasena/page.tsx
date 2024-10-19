"use client";

import { ChangeEvent, KeyboardEvent, useState } from "react";

import PasswordInput from "@/components/InputPassword";
import { toast } from "react-toastify";
import { updatePasswordByReset } from "@/api/users.api";
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const [resetPassword, setResetPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleResetPassword = async () => {
    const token = searchParams.get('token');
    if (!isValidPassword()) return toast.error("Las contraseñas no coinciden");
    const data = await updatePasswordByReset(resetPassword.password, token!);
    if (data.error) return toast.error(data.error);
    if (data.message) return toast.success(data.message);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleResetPassword();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResetPassword({ ...resetPassword, [e.target.name]: e.target.value });
  };

  const isValidPassword = () => {
    return resetPassword.password === resetPassword.confirmPassword;
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-white">
          Restablecer Contraseña
        </h2>
        <div className="space-y-4">
          <PasswordInput
            name="password"
            value={resetPassword.password}
            placeholder="Ingresa tu nueva contraseña"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <PasswordInput
            name="confirmPassword"
            value={resetPassword.confirmPassword}
            placeholder="Confirma la contraseña ingresada"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
        </div>
        <button
          onClick={handleResetPassword}
          className="w-full py-2 mt-4 text-white rounded-lg focus:outline-none bg-indigo-600 hover:bg-indigo-500"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
