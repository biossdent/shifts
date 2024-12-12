import { createEvent, getEvents } from "@/services/event.service";

import { NextResponse } from "next/server";
import { ROLE } from "@/enums/role.enum";
import { verifyToken } from "@/utils/token.util";

export async function POST(req: Request) {
  const event = await req.json();
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token)
    return NextResponse.json({ error: "Token no valido" }, { status: 401 });

  try {
    const user = await verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Token no valido" }, { status: 401 });
    if (user.role === ROLE.DOCTOR) 
      return NextResponse.json({ error: "No puedes acceder a esta ruta" }, { status: 401 });
    const eventCreated = await createEvent(event);
    return NextResponse.json(eventCreated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token)
    return NextResponse.json({ error: "Token no valido" }, { status: 401 });

  try {
    const user = await verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Token no valido" }, { status: 401 });
    if (user.role === ROLE.DOCTOR) 
      return NextResponse.json({ error: "No puedes acceder a esta ruta" }, { status: 401 });
    const events = await getEvents();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Token no valido" }, { status: 401 });
  }
}
