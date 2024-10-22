import { get, updateUser } from "@/services/user.service";

import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/token.util";

export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const user = await verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Token no valido" }, { status: 401 });
    const users = await get(user.id, user.role);
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Token no valido" }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const userDataForUpdate = await request.json();

  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (!userDataForUpdate.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (userDataForUpdate.password) {
    userDataForUpdate.password = await userDataForUpdate.password;
  }

  try {
    const user = await verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Token no valido" }, { status: 401 });
    const userUpdated = await updateUser(userDataForUpdate);
    return NextResponse.json(userUpdated);
  } catch (error) {
    return NextResponse.json({ error: "Token no valido" }, { status: 401 });
  }
}
