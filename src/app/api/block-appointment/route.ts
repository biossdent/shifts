import {
  createBlockAppointment,
  getAllBlockAppointments,
} from "@/services/blockAppointment.service";

import { NextResponse } from "next/server";
import { ROLE } from "@prisma/client";
import { verifyToken } from "@/utils/token.util";

export async function POST(request: Request) {
  const blockAppointment = await request.json();

  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token)
    return NextResponse.json({ error: "Token no valido" }, { status: 401 });

  try {
    const user = await verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Token no valido" }, { status: 401 });
    const blockAppointmentCreated = await createBlockAppointment(
      blockAppointment
    );
    return NextResponse.json(blockAppointmentCreated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Token no valido" }, { status: 401 });
  }

  try {
    const user = await verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Token no valido" }, { status: 401 });
    if (user.role === ROLE.DOCTOR)
      return NextResponse.json({
        error: "no puedes ver las citas de bloqueo de un doctor",
      });
    const blockAppointments = await getAllBlockAppointments();
    return NextResponse.json(blockAppointments);
  } catch (error) {
    return NextResponse.json({ error: "Token no valido" }, { status: 401 });
  }
}
