import {
  createAppointment,
  getAllAppointments,
  getAppointmentsByDoctorId,
} from "@/services/appointment.service";
import { createPatient, getPatientById, updatePatient } from "@/services/patient.service";

import { NextResponse } from "next/server";
import { ROLE } from "@/enums/role.enum";
import { isEqual } from "lodash";
import isNil from "lodash/isNil";
import { verifyToken } from "@/utils/token.util";

export async function POST(req: Request) {
  const data = await req.json();
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Token no valido" }, { status: 401 });
  }

  try {
    const user = await verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Token no valido" }, { status: 401 });
    const { appointment, patient } = data;
    if (isNil(patient.id)) {
      const patientCreated = await createPatient(patient);
      if (isNil(patientCreated)) return NextResponse.json({ error: 'error al crear el paciente' }, { status: 400 });
      appointment.patientId = patientCreated.id;
    } else {
      const oldPatient = await getPatientById(patient.id);
      if (!isEqual(oldPatient, patient)) updatePatient(patient);
      appointment.patientId = patient.id;
    }
    const appointmentCreated = await createAppointment(appointment);
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
    let appointments = [];
    if (user.role === ROLE.DOCTOR)
      appointments = await getAppointmentsByDoctorId(user.id);
    else appointments = await getAllAppointments();
    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: "Token no valido" }, { status: 401 });
  }
}
