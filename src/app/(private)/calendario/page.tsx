"use client";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";

import { Calendar, View, Views, momentLocalizer } from "react-big-calendar";
import React, { useEffect, useState } from "react";
import Select, { SingleValueProps, components } from "react-select";

import { IAppointmentCreated } from "@/interfaces/appointment.interface";
import { IUserCreated } from "@/interfaces/user.interface";
import ModalAppointmentForm from "@/components/ModalAppointmentForm";
import { ModalDeleteAppointmentConfirmation } from "@/components/ModalDeleteAppointmentConfirmation";
import PreviewAppointmentModal from "@/components/ModalAppointmentPreview";
import { ROLE } from "@/enums/role.enum";
import { UiStore } from "@/stores/ui.store";
import { appointmentsStore } from "@/stores/appointments.store";
import { getAppointments } from "@/api/appointment.api";
import { getDoctors } from "@/api/doctors.api";
import moment from "moment";
import { sessionStore } from "@/stores/session.store";

const messages = {
  today: "Hoy",
  previous: "Atrás",
  next: "Siguiente",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  allDay: "Todo el día",
  noEventsInRange: "No hay eventos en este rango",
};

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const { appointments, setAppointments, setAppointmentSelected } =
    appointmentsStore();
  const { user } = sessionStore();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filteredAppointments, setFilteredAppointments] =
    useState(appointments);
  const [showModal, setShowModal] = useState(false);
  const [doctors, setDoctors] = useState<IUserCreated[] | null>(null);
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const { setIsMenuOpen } = UiStore();

  useEffect(() => {
    const _getAppointments = async () => {
      const appointments = await getAppointments();
      setAppointments(appointments);
      setFilteredAppointments(appointments);
    };
    _getAppointments();
  }, []);

  useEffect(() => {
    const _getDoctors = async () => {
      const _doctors = await getDoctors();
      const doctorsFormatted = _doctors.map((doctor: IUserCreated) => ({
        label: `${doctor.name} ${doctor.lastName}`,
        value: doctor.id,
      }));
      setDoctors(doctorsFormatted);
    };
    _getDoctors();
  }, []);

  const handleDateClick = (date: Date) => {
    if (user && (user.role === ROLE.RECEPTIONIST || user.role === ROLE.SUPERADMIN)) {
      const _formatDate = moment(date).format("YYYY-MM-DD[T]HH:mm");
      setSelectedDate(_formatDate);
      setShowModal(true);
      setIsMenuOpen(false);
    }
  };

  const handleEventClick = (appointment: IAppointmentCreated) => {
    setAppointmentSelected(appointment);
  };

  const handleChangeDoctorFilter = (doctorsFilter: any) => {
    if (doctorsFilter.length === 0)
      return setFilteredAppointments(appointments);

    const _filteredAppointments = appointments.filter((appointment) =>
      doctorsFilter.some((doctor: any) => doctor.value === appointment.doctorId)
    );

    setFilteredAppointments(_filteredAppointments);
  };

  return (
    <div className="flex h-screen bg-gray-900 flex-col md:flex-row">
      <div className="w-full md:basis-1/5 order-2 md:order-1 p-4 space-y-4 bg-gray-800 text-white mt-8 md:mt-0">
        {user && (user.role === ROLE.RECEPTIONIST || user.role === ROLE.SUPERADMIN) ? (
          <>
            <p>Filtrar por doctor</p>
            <Select
              defaultValue={null}
              isMulti
              name="colors"
              options={doctors!}
              className="basic-multi-select"
              classNamePrefix="select"
              classNames={{ container: () => "text-gray-700" }}
              onChange={handleChangeDoctorFilter}
            />
          </>
        ) : null}
        <h2 className="text-2xl font-bold">Citas del día</h2>
        {filteredAppointments &&
        filteredAppointments.filter((appointment) =>
          moment(appointment.startDate).isSame(new Date(), "day")
        ).length > 0 ? (
          filteredAppointments
            .filter((appointment) =>
              moment(appointment.startDate).isSame(new Date(), "day")
            )
            .map((appointment, index) => (
              <div
                onClick={() => handleEventClick(appointment)}
                key={index}
                className="p-3 bg-gray-700 rounded-lg shadow-md cursor-pointer"
              >
                <h3 className="font-semibold">
                  {appointment.patient.fullName}
                </h3>
                <p>{appointment.diagnostic}</p>
                <p>
                  {moment(appointment.startDate).format("hh:mm A")} -{" "}
                  {moment(appointment.endDate).format("hh:mm A")}
                </p>
              </div>
            ))
        ) : (
          <p>No hay citas para hoy.</p>
        )}
      </div>

      <div className="w-full h-full md:basis-4/5 order-1 md:order-2">
        <div className="bg-white rounded-lg shadow-lg h-full">
          <Calendar
            culture="es"
            localizer={localizer}
            events={filteredAppointments}
            startAccessor="startDate"
            endAccessor="endDate"
            titleAccessor={(event) => event.patient.fullName}
            style={{ height: "500" }}
            className="text-black"
            selectable
            onSelectSlot={({ start }) => handleDateClick(start)}
            onSelectEvent={handleEventClick}
            messages={messages}
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            defaultView={view}
            view={view}
            date={date}
            onView={(view) => setView(view)}
            onNavigate={(date) => {
              setDate(new Date(date));
            }}
          />
        </div>
      </div>
      <ModalAppointmentForm
        showModal={showModal}
        setShowModal={setShowModal}
        date={selectedDate!}
      />
      <ModalDeleteAppointmentConfirmation />

      <PreviewAppointmentModal />
    </div>
  );
}
