import React, { useEffect, useState } from "react";

import { IAppointmentCreated } from "@/interfaces/appointment.interface";
import { IReminder } from "@/interfaces/reminder.interface";
import { IUserCreated } from "@/interfaces/user.interface";
import { ModalDeleteReminderConfirmation } from "./modals/ModalDeleteReminderConfirmation";
import PreviewReminderModal from "./modals/ModalReminderPreview";
import { ROLE } from "@prisma/client";
import Select from "react-select";
import { appointmentsStore } from "@/stores/appointments.store";
import { getDoctors } from "@/api/doctors.api";
import { getReminders } from "@/api/reminder.api";
import moment from "moment";
import { reminderStore } from "@/stores/reminder.store";
import { sessionStore } from "@/stores/session.store";

interface IAsideCalendarProps {
  handleEventClick: (appointment: IAppointmentCreated) => void;
}

const AsideCalendar = (props: IAsideCalendarProps) => {
  const { handleEventClick } = props;
  const { user } = sessionStore();
  const { appointments, filteredAppointments, setFilteredAppointments } =
    appointmentsStore();
  const { reminders, setReminders, setReminderSelected } = reminderStore();
  const [doctors, setDoctors] = useState<IUserCreated[] | null>(null);

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

  useEffect(() => {
    const _getReminders = async () => {
      const reminders = await getReminders();
      setReminders(reminders);
    };
    _getReminders();
  }, []);

  const handleChangeDoctorFilter = (doctorsFilter: any) => {
    if (doctorsFilter.length === 0)
      return setFilteredAppointments(appointments);

    const _filteredAppointments = appointments.filter((appointment) =>
      doctorsFilter.some((doctor: any) => doctor.value === appointment.doctorId)
    );

    setFilteredAppointments(_filteredAppointments);
  };

  const handleReminderClick = (reminder: IReminder) => {
    setReminderSelected(reminder);
  };

  return (
    <>
      <div className="w-full md:basis-1/5 order-2 md:order-1 p-4 bg-gray-800 text-white mt-8 md:mt-0 flex flex-col h-full">
        {user &&
        (user.role === ROLE.RECEPTIONIST || user.role === ROLE.SUPERADMIN) ? (
          <div className="mb-2">
            <p>Filtrar por doctor</p>
            <Select
              defaultValue={null}
              isMulti
              name="colors"
              options={doctors!}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Doctor..."
              onChange={handleChangeDoctorFilter}
              noOptionsMessage={() => "No se encontro"}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "#111827",
                }),
                container: (base) => ({
                  ...base,
                  color: "#000",
                  zIndex: 20,
                }),
              }}
            />
          </div>
        ) : null}
        <div className="flex-1 overflow-y-auto space-y-4 w-full mb-4">
          <h2 className="text-2xl font-bold sticky-title">Citas del día</h2>
          {filteredAppointments &&
          filteredAppointments.filter((appointment) =>
            moment(appointment.startDate).isSame(new Date(), "day")
          ).length > 0 ? (
            filteredAppointments
              .filter((appointment) =>
                moment(appointment.startDate).isSame(new Date(), "day")
              )
              .map((appointment) => (
                <div
                  onClick={() => handleEventClick(appointment)}
                  key={appointment.id}
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
        <div className="flex-1 overflow-y-auto space-y-4">
          <h2 className="text-2xl font-bold sticky-title">
            Recordatorios del día
          </h2>
          {reminders &&
          reminders.filter((reminder) =>
            moment(reminder.date).isSame(new Date(), "day")
          ).length > 0 ? (
            reminders
              .filter((reminder) =>
                moment(reminder.date).isSame(new Date(), "day")
              )
              .map((reminder) => (
                <div
                  onClick={() => handleReminderClick(reminder)}
                  key={reminder.id}
                  className="p-3 bg-gray-700 rounded-lg shadow-md cursor-pointer"
                >
                  <h3 className="font-semibold">{reminder.title}</h3>
                </div>
              ))
          ) : (
            <p>No hay recordatorios para hoy.</p>
          )}
        </div>
      </div>
      <PreviewReminderModal />
      <ModalDeleteReminderConfirmation />
    </>
  );
};

export default AsideCalendar;
