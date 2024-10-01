import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify"

export const metadata = {
  title: 'Iniciar Sesion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
      <ToastContainer />
    </html>
  )
}
