"use client";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import React, { useEffect, useState } from "react";
import {
  format,
  formatDate,
  getDay,
  isSameDay,
  parse,
  parseISO,
  set,
  startOfWeek,
} from "date-fns";

import { IAppointmentCreated } from "@/interfaces/appointment.interface";
import ModalAppointmentForm from "@/components/ModalAppointmentForm";
import PreviewAppointmentModal from "@/components/ModalAppointmentPreview";
import { appointmentsStore } from "@/stores/appointiments";
import { es } from "date-fns/locale";
import { getAppointments } from "@/api/appointment.api";

const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function CalendarPage() {
  const { appointments, myAppointments, setAppointments, setMyAppointments } =
    appointmentsStore();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] =
    useState<IAppointmentCreated | null>(null);

  useEffect(() => {
    const _getAppointments = async () => {
      const appointments = await getAppointments();
      setAppointments(appointments);
    };
    _getAppointments();
  }, []);

  const handleDateClick = (date: string) => {
    const _date = parseISO(date);
    const _formatDate = formatDate(_date, "yyyy-MM-dd'T'HH:mm");
    setSelectedDate(_formatDate);
    setShowModal(true);
  };

  const handleEventClick = (appointment: IAppointmentCreated) => {
    setSelectedEvent(appointment);
    setIsPreviewOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-1/5 p-4 space-y-4 bg-gray-800 text-white">
        <h2 className="text-2xl font-bold">Citas del día</h2>
        {appointments &&
        appointments.filter((appointment) =>
          isSameDay(appointment.startDate, new Date())
        ).length > 0 ? (
          appointments
            .filter((appointment) =>
              isSameDay(appointment.startDate, new Date())
            )
            .map((appointment, index) => (
              <div key={index} className="p-3 bg-gray-700 rounded-lg shadow-md">
                <h3 className="font-semibold">holaaa</h3>
                <p>
                  {format(appointment.startDate, "hh:mm a")} -{" "}
                  {format(appointment.endDate, "hh:mm a")}
                </p>
              </div>
            ))
        ) : (
          <p>No hay citas para hoy.</p>
        )}
      </div>

      <div className="w-4/5">
        <div
          className="bg-white rounded-lg shadow-lg"
          style={{ height: "100%" }}
        >
          <Calendar
            localizer={localizer}
            events={appointments}
            startAccessor="startDate"
            endAccessor="endDate"
            titleAccessor={(event) => event.patient.fullName}
            style={{ height: "100%" }}
            className="text-black"
            selectable
            onSelectSlot={({ start }) => handleDateClick(start.toISOString())}
            onSelectEvent={handleEventClick}
          />
        </div>
      </div>
      <ModalAppointmentForm
        showModal={showModal}
        setShowModal={setShowModal}
        date={selectedDate!}
      />

      {selectedEvent && (
        <PreviewAppointmentModal
          showModal={isPreviewOpen}
          setShowModal={setIsPreviewOpen}
          appointment={selectedEvent}
        />
      )}
    </div>
  );
}
