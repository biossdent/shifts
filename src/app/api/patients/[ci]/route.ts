import { NextResponse } from "next/server";
import { getByCi } from "@/services/patient.service";
import { verifyToken } from "@/utils/token.util";

interface IParams {
    ci: string
}

export async function GET(req: Request, { params }: { params: IParams }) {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    const { ci } = params;
    
    if (!token) {
      return NextResponse.json({ error: "Token no valido" }, { status: 401 });
    }
  
    try {
      const user = await verifyToken(token);
      if (!user) return NextResponse.json({ error: "Token no valido" }, { status: 401 });
      const patients = await getByCi(ci);
      return NextResponse.json(patients);
    } catch (error) {
      return NextResponse.json({ error: "Token no valido" }, { status: 401 });
    }
  }