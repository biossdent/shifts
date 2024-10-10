import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css'

import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

export const metadata = {
    title: 'Gestión de Turnos',
  }
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="es">
        <body>
          {children}
          </body>
      </html>
    )
  }
  