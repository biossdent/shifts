"use client";

import { ChangeEvent, useState } from "react";

import ColorPickerInput from "../ColorPickerInput";
import { createEvent } from "@/api/event.api";
import { eventStore } from "@/stores/event.store";
import { toast } from "react-toastify";

const INITIAL_ERRORS = {
  title: "",
  color: "",
};

const EventsForm = () => {
  const {
    events,
    eventSelected,
    setEvents,
    setEventSelected,
    setInitialEventSelected,
  } = eventStore();

  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const validateFields = () => {
    let titleError = "";
    let colorError = "";

    if (!eventSelected.title) {
      titleError = "Debe agregar un titulo.";
    }

    if (!eventSelected.color) {
      colorError = "Debe seleccionar un color.";
    }

    setErrors({
      title: titleError,
      color: colorError,
    });

    return !titleError && !colorError;
  };

  const saveEvent = async () => {
    if (!validateFields()) {
      if (errors.title) toast.error(errors.title);
      if (errors.color) toast.error(errors.color);
      return;
    }
    const createdEvent = await createEvent(eventSelected);
    if (createdEvent.error) return toast.error(createdEvent.error);
    toast.success("Evento creado exitosamente");
    setEvents([...events, createdEvent]);
    setInitialEventSelected();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setEventSelected({
      ...eventSelected,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-center h-screen w-full md:basis-2/5 p-4 space-y-4 bg-gray-800 text-white md:flex-row order-2 lg:order-1 md:mr-4">
      <div className="w-full space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-white">
          Crear Evento
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Titulo"
            value={eventSelected.title}
            onChange={handleChange}
            name="title"
          />
          <div>
            <ColorPickerInput name="color" value={eventSelected.color} onChange={handleChange} />
          </div>
        </div>
        <button
          onClick={saveEvent}
          className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none"
        >
          Crear
        </button>
      </div>
    </div>
  );
};

export default EventsForm;
