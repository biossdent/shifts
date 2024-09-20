import { NextResponse } from "next/server";
import { get } from "@/services/user.service";
import { verifyToken } from "@/utils/token.util";

export async function GET(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ error: 'Token no valido' }, { status: 401 });
    const users = await get()
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Token no valido' }, { status: 401 })
  }
}