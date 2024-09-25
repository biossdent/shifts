"use client";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik, useField } from "formik";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ciRegex, phoneRegex } from "@/regex/validate.reg";

import { IUserCreated } from "@/interfaces/user.interface";
import { InputWithError } from "./InputWithError";
import Modal from "react-modal";
import SpecialtySelect from "./SpecialtySelect";
import { getDoctors } from "@/api/doctors.api";

interface IModalAppointmentFormProps {
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

const validationSchema = Yup.object({
  fullName: Yup.string().required("Nombre completo obligatorio"), 
  ci: Yup.string()
    .required("Número de cédula obligatorio")
    .matches(ciRegex, "Número de cédula inválido"),
  phone: Yup.string()
    .required("Número de celular obligatorio") 
    .matches(phoneRegex, "Número de celular inválido"),
  diagnostic: Yup.string(),
  specialty: Yup.string().required("Especialidad  obligatoria"),
  startDate: Yup.date().required("Fecha de inicio obligatoria"),
  endDate: Yup.date().required("Fecha de fin obligatoria"),
  doctor: Yup.string().required("Selecciona un doctor"),
});

export default function ModalAppointmentForm(
  props: IModalAppointmentFormProps
) {
  const { showModal, setShowModal } = props;
  const [doctors, setDoctors] = useState<IUserCreated[] | null>(null);

  useEffect(() => {
    const _getDoctors = async () => {
      const _doctors = await getDoctors();
      setDoctors(_doctors);
    };
    _getDoctors();
  }, []);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const handleSubmit = (values: any) => {
    console.log("Datos del paciente:", values);
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
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>

        <Formik
          initialValues={{
            ...INITIAL_PATIENT,
            ...INITIAL_APPOINTMENT,
            doctor: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-6 flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <h2 className="text-xl font-bold mb-4 text-gray-700">
                  Información del Paciente
                </h2>
                <InputWithError
                  label="Número de Cédula"
                  name="ci"
                  type="text"
                  placeholder="Ingresa el número de cédula"
                />
                <InputWithError
                  label="Nombre Completo"
                  name="fullName"
                  type="text"
                  placeholder="Ingresa el nombre completo"
                />
                <InputWithError
                  label="Número de Celular"
                  name="phone"
                  type="text"
                  placeholder="Ingresa el número de celular"
                />
              </div>

              <div className="w-full md:w-1/2">
                <h2 className="text-xl font-bold mb-4 text-gray-700">
                  Información de la Cita
                </h2>
                <InputWithError
                  label="Diagnóstico"
                  name="diagnostic"
                  as="textarea"
                  placeholder="Ingresa el diagnóstico"
                />
                <div className="mb-4">
                  <label className="block mb-1 font-medium text-gray-700">
                    Especialidad
                  </label>
                  <SpecialtySelect name="specialty" />
                </div>
                <InputWithError
                  label="Fecha de Inicio"
                  name="startDate"
                  type="datetime-local"
                />
                <InputWithError
                  label="Fecha de Fin"
                  name="endDate"
                  type="datetime-local"
                />
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-700">
                Seleccionar Doctor
              </h2>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">
                  Doctor
                </label>
                <Field
                  as="select"
                  name="doctor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                >
                  <option value="" disabled>
                    Selecciona un doctor
                  </option>
                  {doctors &&
                    doctors?.map((doctor: IUserCreated) => (
                      <option key={doctor.id} value={doctor.id}>
                        Dr. {doctor.name} {doctor.lastName}
                      </option>
                    ))}
                </Field>
                <ErrorMessage
                  name="doctor"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
            >
              Guardar Cita
            </button>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
}
