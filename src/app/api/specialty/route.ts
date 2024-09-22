import { create, get } from "@/services/specialty.service";

import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/token.util";

export async function POST(request: Request) {
  const specialty = await request.json();
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ error: 'Token no valido' }, { status: 401 });
    const specialtyCreated = await create(specialty);
    return NextResponse.json(specialtyCreated);
  } catch (error) {
    return NextResponse.json({ error: 'Token no valido' }, { status: 401 })
  }
}

export async function GET(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Token no valido' }, { status: 401 });
  }

  try {
    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ error: 'Token no valido' }, { status: 401 });
    const specialties = await get()
    return NextResponse.json(specialties);
  } catch (error) {
    return NextResponse.json({ error: 'Token no valido' }, { status: 401 })
  }
}