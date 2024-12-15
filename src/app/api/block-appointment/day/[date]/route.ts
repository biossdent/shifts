import { NextResponse } from "next/server";
import { getBlockAppointmentsForDay } from "@/services/blockAppointment.service";
import { verifyToken } from "@/utils/token.util";

interface IParams {
    date: string;
  }

export async function GET(req: Request, { params }: { params: IParams }) {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    const { date } = params;
    console.log('date',date)
  if (!token) {
    return NextResponse.json({ error: "Token no valido" }, { status: 401 });
  }

try {
    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ error: "Token no valido" }, { status: 401 });
    const appointment = await getBlockAppointmentsForDay(date);
    return NextResponse.json(appointment);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}