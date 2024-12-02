"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { IUserCreated } from "@/interfaces/user.interface";
import PasswordInput from "./InputPassword";
import { ROLES } from "@/consts/role.conts";
import { blockAppointmentStoreStore } from "@/stores/blockAppoitment.store";
import { createBlockAppointment } from "@/api/blockAppointment.api";
import { getDoctors } from "@/api/doctors.api";
import { toast } from "react-toastify";

const INITIAL_ERRORS = {
  doctorId: "",
  startDate: "",
  endDate: "",
};

const BlockDoctorAppointmentsForm = () => {
  const {
    blockAppointments,
    blockAppointmentSelected,
    setBlockAppointments,
    setBlockAppointmentsSelected,
    setInitialBlockAppointmentSelected,
  } = blockAppointmentStoreStore();
  const [doctors, setDoctors] = useState<IUserCreated[] | null>(null);
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  useEffect(() => {
    const _getDoctors = async () => {
      try {
        const _doctors = await getDoctors();
        setDoctors(_doctors);
      } catch (error) {
        toast.error(
          "Error al cargar doctores, la página se recargará en unos instantes"
        );
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    };
    _getDoctors();
  }, []);

  const validateFields = () => {
    let doctorIdError = "";
    let startDateError = "";
    let endDateError = "";

    if (!blockAppointmentSelected.doctorId) {
      doctorIdError = "Debe seleccionar un doctor.";
    }

    if (!blockAppointmentSelected.startDate) {
      startDateError = "Debe seleccionar una fecha de inicio.";
    }

    if (!blockAppointmentSelected.endDate) {
      endDateError = "Debe seleccionar una fecha de fin.";
    }

    setErrors({
      doctorId: doctorIdError,
      startDate: startDateError,
      endDate: endDateError,
    });

    return !doctorIdError && !startDateError && !endDateError;
  };

  const saveBlockAppointment = async () => {
    if (!validateFields()) {
      if (errors.doctorId) toast.error(errors.doctorId);
      if (errors.startDate) toast.error(errors.startDate);
      if (errors.endDate) toast.error(errors.endDate);
      return;
    }
    const createdBlockAppointment = await createBlockAppointment(
      {
        ...blockAppointmentSelected,
        doctorId: Number(blockAppointmentSelected.doctorId),
      }
    );
    if (createdBlockAppointment.error)
      return toast.error(createdBlockAppointment.error);
    toast.success("Bloqueo de citas creado exitosamente");
    setBlockAppointments([...blockAppointments, createdBlockAppointment]);
    setInitialBlockAppointmentSelected();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setBlockAppointmentsSelected({
      ...blockAppointmentSelected,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-center h-screen w-full md:basis-2/5 p-4 space-y-4 bg-gray-800 text-white md:flex-row order-2 lg:order-1 md:mr-4">
      <div className="w-full space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-white">
          Crear Bloqueo de Citas
        </h2>
        <div className="space-y-4">
          <select
            id="doctorId"
            value={blockAppointmentSelected.doctorId}
            onChange={handleChange}
            className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            name="doctorId"
          >
            <option value="">Selecciona un Doctor</option>
            {doctors?.map((doctor: IUserCreated) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} {doctor.lastName}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Razón"
            value={blockAppointmentSelected.reason}
            onChange={handleChange}
            name="reason"
          />
          <div>
            <label className="" htmlFor="starDate">
              Fecha de inicio
            </label>
            <input
              value={blockAppointmentSelected.startDate}
              name="startDate"
              type="datetime-local"
              placeholder="Fecha de inicio"
              onChange={handleChange}
              className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="" htmlFor="endDate">
              Fecha de fin
            </label>
            <input
              value={blockAppointmentSelected.endDate}
              name="endDate"
              type="datetime-local"
              placeholder="Fecha de Fin"
              onChange={handleChange}
              className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <button
          onClick={saveBlockAppointment}
          className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none"
        >
          Crear
        </button>
      </div>
    </div>
  );
};

export default BlockDoctorAppointmentsForm;
