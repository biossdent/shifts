"use client";

import BlockDoctorAppointmentsForm from "@/components/BlockDoctorAppointmentsForm";
import { ModalDeleteBlockAppointmentConfirmation } from "@/components/ModalDeleteBlockAppointmentConfirmation";
import TableBlockDoctorAppointments from "@/components/TableBlockDoctorAppointments";

export default function UsersPage() {

  return (
    <div className="flex h-screen bg-gray-900 flex-col lg:flex-row">
      <BlockDoctorAppointmentsForm />
      <TableBlockDoctorAppointments />
      <ModalDeleteBlockAppointmentConfirmation/>
    </div>
  );
}
