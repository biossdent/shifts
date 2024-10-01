"use client";

import * as Yup from "yup";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ciRegex, phoneRegex } from "@/regex/validate.reg";
import { createPatient, getPatientByCI } from "@/api/patient.api";

import { DateTime } from "luxon";
import { IUserCreated } from "@/interfaces/user.interface";
import { InputWithError } from "./InputWithError";
import Modal from "react-modal";
import SpecialtySelect from "./SpecialtySelect";
import { createAppointment } from "@/api/appointment.api";
import { getDoctors } from "@/api/doctors.api";
import { toast } from "react-toastify";
import { useFormik } from "formik";

interface IModalAppointmentFormProps {
  showModal: boolean;
  date: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const INITIAL_PATIENT = {
  fullName: "",
  ci: "",
  phone: "",
};

const INITIAL_APPOINTMENT = {
  diagnostic: "",
  specialtyId: "",
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
  specialtyId: Yup.number().required("Especialidad obligatoria"),
  startDate: Yup.date().required("Fecha de inicio obligatoria"),
  endDate: Yup.date().required("Fecha de fin obligatoria"),
  doctorId: Yup.number().required("Selecciona un doctor"),
});

export default function ModalAppointmentForm(
  props: IModalAppointmentFormProps
) {
  const { showModal, date, setShowModal } = props;
  const [doctors, setDoctors] = useState<IUserCreated[] | null>(null);
  const [patientId, setPatientId] = useState<number | null>(null);
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

  const formik = useFormik({
    initialValues: {
      ...INITIAL_PATIENT,
      ...INITIAL_APPOINTMENT,
      startDate: new Date(date).toISOString(),
      doctorId: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      let _patientId = patientId;
      if (!patientId) {
        const patient = {
          ci: values.ci,
          fullName: values.fullName,
          phone: values.phone,
        };
        const createdPatient = await createPatient(patient);
        if (!createdPatient) return;
        _patientId = createdPatient.id;
      }

      const appointment = {
        patientId: _patientId!,
        doctorId: Number(values.doctorId),
        diagnostic: values.diagnostic,
        specialtyId: Number(values.specialtyId),
        startDate: DateTime.fromISO(values.startDate).toISO()!,
        endDate: DateTime.fromISO(values.endDate).toISO()!,
      };
      const { error } = await createAppointment(appointment);
      if (error) toast.error(error.message);
    },
  });

  const handleCIChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (e.target.value.length === 10) {
      const patient = await getPatientByCI(e.target.value);
      if (!patient) return;

      setPatientId(patient.id);
      formik.setFieldValue("fullName", patient.fullName);
      formik.setFieldValue("phone", patient.phone);
    }
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

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <h2 className="text-xl font-bold mb-4 text-gray-700">
                Información del Paciente
              </h2>
              <InputWithError
                label="Número de Cédula"
                placeholder="Ingresa el número de cédula"
                {...formik.getFieldProps("ci")}
                {...formik.getFieldMeta("ci")}
                onChange={handleCIChange}
              />
              <InputWithError
                label="Nombre Completo"
                placeholder="Ingresa el nombre completo"
                {...formik.getFieldProps("fullName")}
                {...formik.getFieldMeta("fullName")}
              />
              <InputWithError
                label="Número de Celular"
                placeholder="Ingresa el número de celular"
                {...formik.getFieldProps("phone")}
                {...formik.getFieldMeta("phone")}
              />
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="text-xl font-bold mb-4 text-gray-700">
                Información de la Cita
              </h2>
              <InputWithError
                label="Diagnóstico"
                placeholder="Ingresa el diagnóstico"
                {...formik.getFieldProps("diagnostic")}
                {...formik.getFieldMeta("diagnostic")}
              />
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">
                  Especialidad
                </label>
                <SpecialtySelect
                  {...formik.getFieldProps("specialtyId")}
                  {...formik.getFieldMeta("specialtyId")}
                />
              </div>
              <InputWithError
                label="Fecha de Inicio"
                {...formik.getFieldProps("startDate")}
                {...formik.getFieldMeta("startDate")}
                type="datetime-local"
              />
              <InputWithError
                label="Fecha de Fin"
                {...formik.getFieldProps("endDate")}
                {...formik.getFieldMeta("endDate")}
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
              <select
                name="doctorId"
                value={formik.values.doctorId}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
              >
                <option value={0} disabled>
                  Selecciona un doctor
                </option>
                {doctors &&
                  doctors.map((doctor: IUserCreated) => (
                    <option key={doctor.id} value={Number(doctor.id)}>
                      Dr. {doctor.name} {doctor.lastName}
                    </option>
                  ))}
              </select>
              {formik.touched.doctorId && formik.errors.doctorId ? (
                <div className="text-red-500">{formik.errors.doctorId}</div>
              ) : null}
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
