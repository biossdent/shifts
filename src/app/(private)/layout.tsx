"use client";

import "../globals.css";
import "react-toastify/dist/ReactToastify.css";

import { PAGES, PUBLIC_PAGES } from "@/consts/pages";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { LifeLine } from "react-loading-indicators";
import Link from "next/link";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push(PAGES.login);
  };

  const menuOptions = [
    {
      label: "Mi Perfil",
      action: () => router.push(PAGES.perfil),
    },
    {
      label: "Usuarios",
      action: () => router.push(PAGES.usuarios),
    },
    {
      label: "Cerrar Sesión",
      action: handleLogout,
    },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");

      if (!token && PUBLIC_PAGES.includes(window.location.pathname)) {
        router.push(PAGES.login);
      } else {
        const res = await fetch("/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!data.user) return router.push(PAGES.login);
        setUser(data.user.name);
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <html lang="es">
        <body>
          <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <LifeLine color="#FFF" size="medium" text="" textColor="" />
          </div>
        </body>
      </html>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href={PAGES.calendar} className="flex flex-row h-auto">
            <Image
              className="pr-2 w-auto h-auto"
              src="/images/BiossDent.png"
              alt="logo"
              width={45}
              height={45}
              />
            <h1 className="text-2xl font-bold">Gestión de turnos</h1>
          </Link>
          <div className="relative" ref={menuRef}>
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-50">
                    {menuOptions.map((opt, index) => (
                      <button
                        key={index}
                        onClick={opt.action}
                        className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600 focus:outline-none"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              "Cargando usuario..."
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4">{children}</main>
      <ToastContainer />
    </div>
  );
}
