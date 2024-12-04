"use client";

import BlockDoctorAppointmentsForm from "@/components/forms/BlockDoctorAppointmentsForm";
import { ModalDeleteBlockAppointmentConfirmation } from "@/components/modals/ModalDeleteBlockAppointmentConfirmation";
import TableBlockDoctorAppointments from "@/components/tables/TableBlockDoctorAppointments";

export default function BlockDoctorAppointmentPage() {

  return (
    <div className="flex h-screen bg-gray-900 flex-col lg:flex-row">
      <BlockDoctorAppointmentsForm />
      <TableBlockDoctorAppointments />
      <ModalDeleteBlockAppointmentConfirmation/>
    </div>
  );
}
