import { createReminder, getRemindersByDateAndUserId } from "@/services/reminder.service";

import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/token.util";

export async function POST(req: Request) {
  const reminder = await req.json();
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token)
    return NextResponse.json({ error: "Token no valido1" }, { status: 401 });

  try {
    const user = await verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Token no valido2" }, { status: 401 });
    const reminderCreated = await createReminder(reminder);
    return NextResponse.json(reminderCreated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const date = req.headers.get("date")?.split(" ")[1]!;
  if (!token)
    return NextResponse.json({ error: "Token no valido" }, { status: 401 });

  try {
    const user = await verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Token no valido" }, { status: 401 });
    const reminders = await getRemindersByDateAndUserId(date, user.id);
    return NextResponse.json(reminders);
  } catch (error) {
    return NextResponse.json({ error: "Token no valido" }, { status: 401 });
  }
}
