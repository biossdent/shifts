'use client';

import { KeyboardEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    login: '', // Error de login del servidor
  });
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  // Función para validar email
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Validar campos antes de iniciar sesión
  const validateFields = () => {
    let emailError = '';
    let passwordError = '';

    if (!validateEmail(email)) {
      emailError = 'El correo electrónico no es válido.';
    }

    if (!password) {
      passwordError = 'La contraseña no puede estar vacía.';
    }

    setErrors({ email: emailError, password: passwordError, login: '' });

    return !emailError && !passwordError;
  };

  const login = async () => {
    if (!validateFields()) {
      return; // Si hay errores, no continúa con el login
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('authToken', data.token);
        router.push('/calendario');
      } else {
        setErrors(prevErrors => ({ ...prevErrors, login: data.error || 'Credenciales incorrectas.' }));
        setShowError(true);
      }
    } catch (error) {
      setErrors(prevErrors => ({ ...prevErrors, login: 'Error de red. Por favor, intenta de nuevo.' }));
      setShowError(true);
    }
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000);
      return () => clearTimeout(timer); // Limpiar el timeout si el componente se desmonta antes
    }
  }, [showError]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-white">Iniciar sesión</h2>
        <div className="space-y-4">
          <input
            type="email"
            className={`w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : ''}`}
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          
          <input
            type="password"
            className={`w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.password ? 'border-red-500' : ''}`}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <button
          onClick={login}
          disabled={!validateEmail(email) || !password}
          className={`w-full py-2 mt-4 text-white rounded-lg focus:outline-none ${!validateEmail(email) || !password ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}`}
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
        {/* Mensaje de error en overlay */}
        {showError && errors.login && (
          <div className="absolute top-0 left-0 right-0 mt-4 flex justify-center">
            <div className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg shadow-lg">
              {errors.login}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
