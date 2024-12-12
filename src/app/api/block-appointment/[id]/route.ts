import { NextResponse } from "next/server";
import { deleteBlockAppointment } from "@/services/blockAppointment.service";
import { verifyToken } from "@/utils/token.util";

interface IParams {
  id: number;
}
export async function DELETE(req: Request, { params }: { params: IParams }) {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    const { id } = params;
  if (!token) {
    return NextResponse.json({ error: "Token no valido" }, { status: 401 });
  }

try {
    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ error: "Token no valido" }, { status: 401 });
    const appointment = await deleteBlockAppointment(Number(id));
    return NextResponse.json(appointment);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}