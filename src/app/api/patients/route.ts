import { NextResponse } from "next/server";
import { createPatient } from "@/services/patient.service";
import { verifyToken } from "@/utils/token.util";

export async function POST(request: Request) {
  const patient = await request.json();
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Token no valido" }, { status: 401 });
  }

  try {
    const user = await verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Token no valido" }, { status: 401 });
    const patientCreated = await createPatient(patient);
    return NextResponse.json(patientCreated);
  } catch (error) {
    return NextResponse.json({ error: "Token no valido" }, { status: 401 });
  }
}