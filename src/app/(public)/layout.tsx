"use client";

import "react-toastify/dist/ReactToastify.css";

import { PAGES, PUBLIC_PAGES } from "@/consts/pages.const";
import { useEffect, useState } from "react";

import { LifeLine } from "react-loading-indicators";
import { ToastContainer } from "react-toastify";
import { sessionStore } from "@/stores/session.store";
import { useRouter } from "next/navigation";

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout(props: IProps) {
  const { children } = props;
  const { user, setUser } = sessionStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if  (PUBLIC_PAGES.includes(window.location.pathname)) return setLoading(false);
    const checkAuth = async () => {
      if (user) return router.push(PAGES.calendar);
      
      const token = localStorage.getItem("authToken");
      if (!token) return router.push(PAGES.login);
      const res = await fetch("/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.error && window.location.pathname !== PAGES.login) router.push(PAGES.login);
      if (!data.user) return setLoading(false);
      setUser(data.user);
      router.push(PAGES.calendar);
    };
    checkAuth();
  }, [router, user]);

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
    <html lang="es">
      <body>{children}</body>
      <ToastContainer />
    </html>
  );
}
