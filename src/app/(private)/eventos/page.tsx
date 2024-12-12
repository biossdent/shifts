"use client";

import EventsForm from "@/components/forms/EventsForm";
import { ModalDeleteEventConfirmation } from "@/components/modals/ModalDeleteEventConfirmation";
import TableEvents from "@/components/tables/TableEvents";

export default function EventsPage() {

  return (
    <div className="flex h-screen bg-gray-900 flex-col lg:flex-row">
      <EventsForm />
      <TableEvents />
      <ModalDeleteEventConfirmation/>
    </div>
  );
}
