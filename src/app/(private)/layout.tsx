'use client';

import '../globals.css';

import { useEffect, useState } from 'react';

import { Inter } from 'next/font/google';
import Modal from 'react-modal';
import { publicPages } from '@/consts/pages';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  const menuOptions = [
    {
      label: "Mi Perfil",
      action: () => router.push("/perfil")
    },
    {
      label: "Usuarios",
      action: () => router.push("/usuarios")
    },
    {
      label: "Cerrar Sesión",
      action: handleLogout
    }
  ]

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');

      if (!token && publicPages.includes(window.location.href)) {
        router.push('/login');
      } else {
        const res = await fetch('/api/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.user) {
          setUser(data.user.name);
        } else {
          router.push('/login');
        }
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    // Configura el selector correcto aquí
    Modal.setAppElement('body'); // Ajusta el selector si es necesario
  }, []);



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (loading) {
    return (
      <html lang="es">
        <body>
          <div className="flex items-center justify-center h-screen bg-gray-900 text-white">Cargando...</div>
        </body>
      </html>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestión de turnos</h1>
          <div className="relative">
            {user ? (
              <div className="text-lg relative">
                <button
                  onClick={toggleMenu}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <span>Bienvenido, {user}</span>
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-50">
                    {menuOptions.map(opt =>
                      <button
                        onClick={opt.action}
                        className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600 focus:outline-none"
                      >
                        {opt.label}
                      </button>)}
                  </div>
                )}
              </div>
            ) : (
              'Cargando usuario...'
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Mi Aplicación. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
