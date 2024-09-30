import { create, get } from "@/services/appointment.service";

import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/token.util";

export async function POST(req: Request) {
    const appointment = await req.json();
    const token = req.headers.get("Authorization")?.split(" ")[1];
    console.log({token})
    if (!token) {
        return NextResponse.json({ error: "Token no validoaaaa" }, { status: 401 });
    }

    try {
        const user = await verifyToken(token);
        console.log({user})
        if (!user)
            return NextResponse.json({ error: "Token no valido" }, { status: 401 });
        const appointmentCreated = await create(appointment);
        console.log({appointmentCreated})
        return NextResponse.json(appointmentCreated);
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
        const appointments = await get();
        return NextResponse.json(appointments);
    } catch (error) {
        return NextResponse.json({ error: "Token no valido" }, { status: 401 });
    }
}