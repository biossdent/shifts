import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";

import { IEvent } from "@/interfaces/event.interface";
import { appointmentsStore } from "@/stores/appointments.store";
import { eventStore } from "@/stores/event.store";
import { updateEventInAppointment } from "@/api/appointment.api";

interface IOption {
  label: string;
  value: number;
}

const EventSelect = () => {
  const { appointmentSelected, setAppointments, appointments } =
    appointmentsStore();
  const [options, setOptions] = useState<IOption[]>([]);
  const { events, getEvents } = eventStore();
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);

  const handleChange = async (selected: SingleValue<IOption | null>) => {
    let updatedAppointment: any;
    setSelectedOption(selected);
    if (!appointmentSelected) return;

    updatedAppointment = await updateEventInAppointment(
      appointmentSelected.id!,
      selected?.value ?? null
    );

    appointments.map((appointment) => {
      if (appointment.id === appointmentSelected.id) {
        appointment.eventId = updatedAppointment.eventId;
        appointment.event = updatedAppointment.event;
      }
    });
    setAppointments(appointments);
  };

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    const _options: IOption[] = events.map((event: IEvent) => ({
      label: event.title,
      value: event.id!,
    }));
    setOptions(_options);
  }, [events]);

  useEffect(() => {
    setSelectedOption(
      options.find((option) => option.value === appointmentSelected!.eventId)!
    );
  }, [appointmentSelected, options]);

  if (!appointmentSelected) return;

  return (
    <Select
      isMulti={false}
      options={options}
      value={selectedOption}
      onChange={handleChange}
      placeholder="Elige un Evento"
      isClearable
      classNames={{
        container: () => "text-gray-700",
        control: () => "border-2 !border-gray-300",
      }}
    />
  );
};

export default EventSelect;
