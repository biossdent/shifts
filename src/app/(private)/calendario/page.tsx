"use client";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import React, { useEffect, useState } from "react";
import { format, getDay, isSameDay, parse, startOfWeek } from "date-fns";

import { IAppointmentCreated } from "@/interfaces/appointment.interface";
import ModalAppointmentForm from "@/components/ModalAppointmentForm";
import { enUS } from "date-fns/locale";
import { getAppointments } from "@/api/appointment.api";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function CalendarPage() {
  const [appointment, setAppointment] = useState<IAppointmentCreated[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const _getAppointments = async () => {
      const appointments = await getAppointments();
      setAppointment(appointments);
    };
    _getAppointments();
  }, []);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-1/5 p-4 space-y-4 bg-gray-800 text-white">
        <h2 className="text-2xl font-bold">Eventos del día</h2>
        {appointment &&
        appointment.filter((appointment) =>
          isSameDay(appointment.startDate, new Date())
        ).length > 0 ? (
          appointment
            .filter((event) => isSameDay(event.startDate, new Date()))
            .map((event, index) => (
              <div key={index} className="p-3 bg-gray-700 rounded-lg shadow-md">
                <h3 className="font-semibold">holaaa</h3>
                <p>
                  {format(event.startDate, "hh:mm a")} -{" "}
                  {format(event.endDate, "hh:mm a")}
                </p>
              </div>
            ))
        ) : (
          <p>No hay eventos para hoy.</p>
        )}
      </div>

      <div className="w-4/5">
        <div
          className="bg-white rounded-lg shadow-lg"
          style={{ height: "100%" }}
        >
          <Calendar
            localizer={localizer}
            events={[]}
            startAccessor="startDate"
            endAccessor="endDate"
            style={{ height: "100%" }}
            className="text-black"
            selectable
            onSelectSlot={({ start }) => handleDateClick(start.toISOString())}
          />
        </div>
      </div>

      <ModalAppointmentForm
        showModal={showModal}
        setShowModal={setShowModal}
        date={selectedDate!}
      />
    </div>
  );
}
