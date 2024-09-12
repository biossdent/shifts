'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-white">Iniciar sesión</h2>
        <div className="space-y-4">
          <input
            type="email"
            className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={login}
          className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none"
        >
          Iniciar sesión
        </button>
        <div className="flex justify-between mt-4">
          <a href="/forgot-password" className="text-sm text-indigo-400 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
          <a href="/register" className="text-sm text-indigo-400 hover:underline">
            Crear una cuenta
          </a>
        </div>
      </div>
    </div>
  );
}
