import { NextResponse } from "next/server";
import { create } from "@/services/user.service";

export async function POST(request: Request) {
  const user = await request.json();
  if (!user || !user.email || !user.password || !user.name)
    return NextResponse.json({ error: "Usuario no valido" }, { status: 400 });
  try {
    const userCreated = await create(user);
    return NextResponse.json(userCreated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
