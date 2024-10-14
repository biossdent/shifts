import { NextResponse } from "next/server";
import { updatePassword } from "@/services/user.service";
import { verifyToken } from "@/utils/token.util";

export async function PUT(request: Request) {
  const { newPassword } = await request.json();
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Token no valido" }, { status: 401 });
  }
  if (!newPassword)
    return NextResponse.json(
      { error: "Contraseña requerida" },
      { status: 400 }
    );
  try {
    const user = await verifyToken(token);
    if (!user)
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 400 }
      );
    const userUpdated = await updatePassword(user.id, newPassword);
    return NextResponse.json({userUpdated, message: "Contraseña actualizada correctamente"});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
