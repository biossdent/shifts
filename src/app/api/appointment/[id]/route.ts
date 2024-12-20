import { createPatient, getPatientById, updatePatient } from "@/services/patient.service";
import {
  deleteAppointment,
  updateAppointment,
} from "@/services/appointment.service";

import { NextResponse } from "next/server";
import isEqual from "lodash/isEqual";
import isNil from "lodash/isNil";
import { verifyToken } from "@/utils/token.util";

interface IParams {
  id: number;
}
export async function DELETE(req: Request, { params }: { params: IParams }) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const { id } = params;
  if (!token) {
    return NextResponse.json({ error: "Token no válido" }, { status: 401 });
  }

  try {
    const user = await verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Token no válido" }, { status: 401 });
    const appointment = await deleteAppointment(Number(id));
    return NextResponse.json(appointment);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}

export async function PUT(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const data = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Token no válido" }, { status: 401 });
  }

  try {
    const user = await verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Token no válido" }, { status: 401 });
    const { appointment, patient } = data;
    if (isNil(patient.id)) {
      const patientCreated = await createPatient(patient);
      if (isNil(patientCreated))
        return NextResponse.json(
          { error: "error al crear el paciente" },
          { status: 400 }
        );
      appointment.patientId = patientCreated.id;
    } else {
      const oldPatient = await getPatientById(patient.id);
      if (!isEqual(oldPatient, patient)) updatePatient(patient);
      appointment.patientId = patient.id;
    }
    const appointmentUpdated = await updateAppointment(appointment);
    return NextResponse.json(appointmentUpdated);
  } catch (error) {
    return NextResponse.json({ error }, { status: 401 });
  }
}
