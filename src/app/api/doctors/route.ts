import { NextResponse } from "next/server";
import { ROLE } from "@prisma/client";
import { getByRole } from "@/services/user.service";
import { verifyToken } from "@/utils/token.util";

export async function GET(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    
    if (!token) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        const user = await verifyToken(token);
        if (!user) return NextResponse.json({ error: 'Token no valido' }, { status: 401 });
        const doctors = await getByRole(ROLE.DOCTOR);
        return NextResponse.json(doctors);
    } catch (error) {
        return NextResponse.json({ error: 'Token no valido' }, { status: 401 })
    }
    
}