import { NextResponse } from "next/server";
import { getAvailableDoctors } from "@/services/user.service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  if (!startDate || !endDate)
    return NextResponse.json({ error: "Falta parámetros" }, { status: 400 });
  const doctors = await getAvailableDoctors(startDate, endDate);
  return NextResponse.json(doctors);
}
