"use client";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";

import { Calendar, View, Views, momentLocalizer } from "react-big-calendar";
import React, { useEffect, useState } from "react";
import {
  eventStyleGetter,
  getEventEndAccessor,
  getEventStartAccessor,
  getEventTitle,
} from "@/utils/calendar.util";

import AppointmentOrReminderForm from "@/components/ModalAppointmentOrReminderForm";
import AsideCalendar from "@/components/AsideCalendar";
import { EVENTS_TYPE } from "@/enums/events.enum";
import { IAppointmentCreated } from "@/interfaces/appointment.interface";
import { IReminder } from "@/interfaces/reminder.interface";
import { MESSAGES_CALENDAR } from "@/consts/calendar";
import { ModalDeleteAppointmentConfirmation } from "@/components/ModalDeleteAppointmentConfirmation";
import PreviewAppointmentModal from "@/components/ModalAppointmentPreview";
import { ROLE } from "@/enums/role.enum";
import { UiStore } from "@/stores/ui.store";
import { appointmentsStore } from "@/stores/appointments.store";
import moment from "moment";
import { reminderStore } from "@/stores/reminder.store";
import { sessionStore } from "@/stores/session.store";

const localizer = momentLocalizer(moment);

export type IEvent = IAppointmentCreated | IReminder;

export default function CalendarPage() {
  const {
    appointments,
    setAppointmentSelected,
    filteredAppointments,
    getAppointments,
  } = appointmentsStore();
  const { getReminders, reminders, setReminderSelected } = reminderStore();
  const { user } = sessionStore();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<IEvent[]>([]);
  useState(appointments);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const { setIsMenuOpen } = UiStore();

  useEffect(() => {
    getAppointments();
    getReminders();
  }, []);

  useEffect(() => {
    setEvents([...reminders, ...filteredAppointments]);
  }, [reminders, filteredAppointments]);

  const handleDateClick = (date: Date) => {
    if (
      user &&
      (user.role === ROLE.RECEPTIONIST ||
        user.role === ROLE.SUPERADMIN ||
        user.role === ROLE.ADMIN)
    ) {
      const _formatDate = moment(date).format("YYYY-MM-DD[T]HH:mm");
      setSelectedDate(_formatDate);
      setShowModal(true);
      setIsMenuOpen(false);
    }
  };

  const handleEventClick = (event: IEvent) => {
    if (event.type === EVENTS_TYPE.APPOINTMENT)
      setAppointmentSelected(event as IAppointmentCreated);
    else setReminderSelected(event as IReminder);
  };

  return (
    <div className="flex h-screen bg-gray-900 flex-col md:flex-row">
      <AsideCalendar handleEventClick={handleEventClick} />
      <div className="w-full h-full md:basis-4/5 order-1 md:order-2">
        <div className="bg-white rounded-lg shadow-lg h-full">
          <Calendar
            culture="es"
            localizer={localizer}
            events={events}
            startAccessor={getEventStartAccessor}
            endAccessor={getEventEndAccessor}
            titleAccessor={getEventTitle}
            style={{ height: "500" }}
            className="text-black"
            selectable
            onSelectSlot={({ start }) => handleDateClick(start)}
            onSelectEvent={handleEventClick}
            messages={MESSAGES_CALENDAR}
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            defaultView={view}
            view={view}
            date={date}
            eventPropGetter={eventStyleGetter}
            onView={(view) => setView(view)}
            onNavigate={(date) => {
              setDate(new Date(date));
            }}
          />
        </div>
      </div>
      <AppointmentOrReminderForm
        showModal={showModal}
        date={selectedDate!}
        setShowModal={setShowModal}
      />
      <ModalDeleteAppointmentConfirmation />
      <PreviewAppointmentModal />
    </div>
  );
}
