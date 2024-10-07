"use client";

import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";

import { LifeLine } from "react-loading-indicators";
import { PAGES } from "@/consts/pages";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { userStore } from "@/stores/user.store";

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout(props: IProps) {
  const { children } = props;
  const { user, setUser } = userStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      console.log("user", user);
      if (user) return router.push(PAGES.calendario);
      
      const token = localStorage.getItem("authToken");
      if (!token) return;
      const res = await fetch("/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!data.user) return setLoading(false);
      setUser(data.user);
      router.push(PAGES.calendario);
    };
    checkAuth();
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
    <html lang="es">
      <body>{children}</body>
      <ToastContainer />
    </html>
  );
}
