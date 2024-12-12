"use client";

import "../globals.css";
import "react-toastify/dist/ReactToastify.css";

import { PAGES, PUBLIC_PAGES } from "@/consts/pages.const";
import { useEffect, useRef, useState } from "react";

import { DAY_OF_SUMMARY } from "@/consts/reminders.const";
import Image from "next/image";
import { LifeLine } from "react-loading-indicators";
import Link from "next/link";
import Modal from "react-modal";
import { ROLE } from "@/enums/role.enum";
import { ToastContainer } from "react-toastify";
import { UiStore } from "@/stores/ui.store";
import moment from "moment";
import { reminderStore } from "@/stores/reminder.store";
import { sessionStore } from "@/stores/session.store";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = sessionStore();
  const { getReminderWeeks } = reminderStore();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { isMenuOpen, setIsMenuOpen } = UiStore();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push(PAGES.login);
  };

  const menuOptions = [
    {
      label: "Calendario",
      action: () => router.push(PAGES.calendar),
    },
    {
      label: "Usuarios",
      action: () => router.push(PAGES.usuarios),
    },
    {
      label: "Eventos",
      action: () => router.push(PAGES.eventos),
      unauthorized: [ROLE.DOCTOR],
    },
    {
      label: "Bloquear Citas",
      action: () => router.push(PAGES.blocDoctorAppointments),
      unauthorized: [ROLE.DOCTOR],
    },
    {
      label: "Cerrar Sesión",
      action: handleLogout,
    },
  ];

  useEffect(() => {
    if (moment().day() === DAY_OF_SUMMARY) getReminderWeeks();
  }, []);

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
        setUser(data.user);
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

  const isUnauthorized = (opt: (typeof menuOptions)[number]) => {
    if (!user) return false;
    return opt.unauthorized?.includes(user.role);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 shadow-md sticky-title !z-30">
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
                  <span>Bienvenido, {`${user.name} ${user.lastName}`}</span>
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
                    {menuOptions.map((opt, index) => {
                      if (isUnauthorized(opt)) return null;
                      return (
                        <button
                          key={index}
                          onClick={opt.action}
                          className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600 focus:outline-none"
                        >
                          {opt.label}
                        </button>
                      );
                    })}
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
