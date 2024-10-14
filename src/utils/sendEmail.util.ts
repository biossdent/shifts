import { PAGES } from "@/consts/pages";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendPasswordResetEmail = async (to: string, token: string) => {
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${PAGES.resetPassword}?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Restablecer tu contraseña",
    html: `<p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p><a href="${resetUrl}">${resetUrl}</a>`,
  };

  await transporter.sendMail(mailOptions);
}


export const sendFirsTemporaryPasswordEmail = async (to: string, password: string) => {
  const loginUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${PAGES.login}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Hola, has sido registrado en Shifts",
    html: `<p>Para ingresar a Shifts, haz clic en el siguiente enlace: </p><a href="${loginUrl}">${loginUrl}</a> <p>y ingresa tu correo y contraseña temporal indicada en este correo</p>
          <p>Contraseña temporal: ${password}</p>`, 
  };

  await transporter.sendMail(mailOptions);
}