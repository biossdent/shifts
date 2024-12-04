import { NextResponse } from "next/server";
import { ROLE } from "@/enums/role.enum";
import { deleteEvent } from "@/services/event.service";
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
    if (user.role === ROLE.DOCTOR) 
      return NextResponse.json({ error: "No puedes acceder a esta ruta" }, { status: 401 });
    const event = await deleteEvent(Number(id));
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}