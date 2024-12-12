import { deleteAppointment, updateEventInAppointment } from "@/services/appointment.service";

import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/token.util";

interface IParams {
  id: number;
}
export async function DELETE(req: Request, { params }: { params: IParams }) {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    const { id } = params;
  if (!token) {
    return NextResponse.json({ error: "Token no válido" }, { status: 401 });
  }

try {
    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ error: "Token no válido" }, { status: 401 });
    const appointment = await deleteAppointment(Number(id));
    return NextResponse.json(appointment);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}

export async function PUT(req: Request, { params }: { params: IParams }) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const { eventId } = await req.json();
  const { id } = params;

  if (!token) {
    return NextResponse.json({ error: "Token no válido" }, { status: 401 });
  }

  try {
    const user = await verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Token no válido" }, { status: 401 });
    const appointmentUpdated = await updateEventInAppointment(Number(id), eventId);
    return NextResponse.json(appointmentUpdated);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}