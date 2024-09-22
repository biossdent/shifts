"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { IUserCreated } from "@/interfaces/user.interface";
import Modal from "react-modal";
import SpecialtySelect from "./SpecialtySelect";
import { getDoctors } from "@/api/doctors.api";

interface IModalShiftFormProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const INITIAL_PATIENT = {
  fullName: "",
  ci: "",
  phone: "",
};

const INITIAL_APPOINTMENT = {
  diagnostic: "",
  specialty: "",
  startDate: "",
  endDate: "",
};

export default function ModalShiftForm(props: IModalShiftFormProps) {
  const { showModal, setShowModal } = props;
  const [doctors, setDoctors] = useState<IUserCreated[] | null>(null);
  const [patient, setPatient] = useState(INITIAL_PATIENT);
  const [appointment, setAppointment] = useState(INITIAL_APPOINTMENT);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  useEffect(() => {
    const _getDoctors = async () => {
      const _doctors = await getDoctors();
      setDoctors(_doctors);
    };
    _getDoctors();
  }, []);

  useEffect(() => {
    Modal.setAppElement("body"); // Asegúrate de que el selector sea correcto
  }, []);

  const handleInputChangePatient = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleInputChangeCita = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDoctor(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí manejas el envío del formulario
    console.log("Datos del paciente:", patient);
    console.log("Datos de la cita:", appointment);
    console.log("Doctor seleccionado:", selectedDoctor);
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      contentLabel="Añadir Nuevo Evento"
      className="absolute inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="relative max-w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Botón de cierre en la esquina superior derecha */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit}>
          {/* Sección de información del paciente y la appointment en disposición horizontal */}
          <div className="mb-6 flex flex-col md:flex-row gap-6">
            {/* Sección de información del paciente */}
            <div className="w-full md:w-1/2s">
              <h2 className="text-xl font-bold mb-4 text-gray-700">
                Información del Paciente
              </h2>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={patient.fullName}
                  onChange={handleInputChangePatient}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                  placeholder="Ingresa el nombre completo"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">
                  Número de Cédula
                </label>
                <input
                  type="text"
                  name="ci"
                  value={patient.ci}
                  onChange={handleInputChangePatient}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                  placeholder="Ingresa el número de cédula"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">
                  Número de Celular
                </label>
                <input
                  type="text"
                  name="phone"
                  value={patient.phone}
                  onChange={handleInputChangePatient}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                  placeholder="Ingresa el número de celular"
                />
              </div>
            </div>

            {/* Sección de información de la appointment */}
            <div className="w-full md:w-1/2">
              <h2 className="text-xl font-bold mb-4 text-gray-700">
                Información de la Cita
              </h2>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">
                  Diagnóstico
                </label>
                <textarea
                  name="diagnostic"
                  value={appointment.diagnostic}
                  onChange={handleInputChangeCita}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                  placeholder="Ingresa el diagnóstico"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">
                  Especialidad
                </label>
                <SpecialtySelect />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">
                  Fecha de Inicio
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={appointment.startDate}
                  onChange={handleInputChangeCita}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">
                  Fecha de Fin
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={appointment.endDate}
                  onChange={handleInputChangeCita}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Sección para seleccionar el doctor */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Seleccionar Doctor
            </h2>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Doctor
              </label>
              <select
                name="doctor"
                value={selectedDoctor}
                onChange={handleDoctorChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
              >
                <option value="" disabled>
                  Selecciona un doctor
                </option>
                {doctors?.map((doctor: IUserCreated, index: number) => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.name} {doctor.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
          >
            Guardar Cita
          </button>
        </form>
      </div>
    </Modal>
  );
}
