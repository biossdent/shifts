import { NextResponse } from "next/server";
import { getWeekReminders } from "@/services/reminder.service";
import { verifyToken } from "@/utils/token.util";

interface IParams {
  date: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const { date } = params;
  if (!token) {
    return NextResponse.json({ error: "Token no válido" }, { status: 401 });
  }

  try {
    const user = await verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Token no válido" }, { status: 401 });
    const reminders = await getWeekReminders(user.id, date);
    return NextResponse.json(reminders);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
