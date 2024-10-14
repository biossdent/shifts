import { NextResponse } from "next/server";
import { generateResetToken } from "@/utils/token.util";
import { getByEmail } from "@/services/user.service";
import { sendPasswordResetEmail } from "@/utils/sendEmail.util";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email requerido" }, { status: 400 });
  }

  const user = await getByEmail(email);

  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 400 });
  }

  try {
    const token = generateResetToken(user.id);
    sendPasswordResetEmail(email, token);

    return NextResponse.json({ message: "Correo de restablecimiento enviado" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al enviar el correo de restablecimiento" },
      { status: 500 }
    );
  }
}
