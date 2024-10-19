"use client";

import { KeyboardEvent, useState } from "react";

import { toast } from "react-toastify";
import { validateEmail } from "@/utils/validations.util";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const handleResetRequest = async () => {
    const response = await fetch("/api/send-reset-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (data.error) return toast.error(data.error);
    if (data.message) return toast.success(data.message);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!validateEmail(email)) return;
      handleResetRequest();
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-white">
          Olvide mi Contraseña
        </h2>
        <div className="space-y-4">
          <input
            type="email"
            className={
              "w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            }
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <button
          onClick={handleResetRequest}
          disabled={!validateEmail(email)}
          className={`w-full py-2 mt-4 text-white rounded-lg focus:outline-none ${
            !validateEmail(email)
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
