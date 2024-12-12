"use client";

import * as Yup from "yup";

import {
  INITIAL_APPOINTMENT,
  INITIAL_PATIENT,
} from "@/consts/appointment.const";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { ciRegex, phoneRegex } from "@/regex/validate.reg";

import { IDoctor } from "@/interfaces/user.interface";
import { InputWithError } from "../InputWithError";
import SpecialtySelect from "../SpecialtySelect";
import { appointmentsStore } from "@/stores/appointments.store";
import { createAppointment } from "@/api/appointment.api";
import { doctorsStore } from "@/stores/doctors.store";
import { getPatientByValue } from "@/api/patient.api";
import moment from "moment";
import { toast } from "react-toastify";
import { useFormik } from "formik";

interface IAppointmentFormProps {
  date: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const validationSchema = Yup.object({
  patient: Yup.object({
    fullName: Yup.string().required("Nombre completo obligatorio"),
    clinicalHistory: Yup.string().required("Historia Clinica obligatoria"),
    ci: Yup.string()
      .required("Número de cédula obligatorio")
      .matches(ciRegex, "Número de cédula inválido"),
    phone: Yup.string()
      .required("Número de celular obligatorio")
      .matches(phoneRegex, "Número de celular inválido"),
  }),
  appointment: Yup.object({
    diagnostic: Yup.string(),
    specialtyId: Yup.number().required("Especialidad obligatoria"),
    startDate: Yup.date().required("Fecha de inicio obligatoria"),
    endDate: Yup.date().required("Fecha de fin obligatoria"),
    doctorId: Yup.number().required("Selecciona un doctor"),
  }),
});

export default function AppointmentForm(props: IAppointmentFormProps) {
  const { date, setShowModal } = props;
  const { appointments, setAppointments } = appointmentsStore();
  const { isLoadingDoctor, availableDoctors, getAvailableDoctors } = doctorsStore();

  useEffect(() => {
    formik.setFieldValue("appointment.startDate", date);
    const startDate = moment(date);
    const endDate = startDate.clone().add(30, "minutes");
    const formatEndDate = endDate.format("YYYY-MM-DDTHH:mm");
    formik.setFieldValue("appointment.endDate", formatEndDate);
    getAvailableDoctors(startDate.toISOString(), endDate.toISOString());
  }, [date]);

  const formik = useFormik({
    initialValues: {
      patient: INITIAL_PATIENT,
      appointment: INITIAL_APPOINTMENT,
    },
    validationSchema,
    onSubmit: async (appointment) => {
      const appointmentCreated = await createAppointment(appointment);
      if (appointmentCreated.error)
        return toast.error(appointmentCreated.error);
      toast.success("Cita creada con éxito");
      setAppointments([...appointments, appointmentCreated]);
      formik.resetForm();
      setShowModal(false);
    },
  });

  const handleFieldForSearchPatientChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "CH" | "CI"
  ) => {
    cleanPatientFields(type);
    formik.handleChange(e);
    if (
      (type === "CI" && e.target.value.length === 10) ||
      (type === "CH" && e.target.value.length > 1)
    ) {
      const patient = await getPatientByValue(e.target.value);
      if (!patient) return;

      if (type === "CI")
        formik.setFieldValue(
          "patient.clinicalHistory",
          patient.clinicalHistory
        );
      else formik.setFieldValue("patient.ci", patient.ci);
      formik.setFieldValue("patient.id", patient.id);
      formik.setFieldValue("patient.fullName", patient.fullName);
      formik.setFieldValue("patient.phone", patient.phone);
    }
  };

  const cleanPatientFields = (type: "CH" | "CI") => {
    if (type === "CI") formik.setFieldValue("patient.clinicalHistory", "");
    else formik.setFieldValue("patient.ci", "");
    formik.setFieldValue("patient.id", undefined);
    formik.setFieldValue("patient.fullName", "");
    formik.setFieldValue("patient.phone", "");
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Información del Paciente
            </h2>
            <InputWithError
              label="Número de Historica Clinica"
              placeholder="Ingresa la Historica Clinica"
              {...formik.getFieldProps("patient.clinicalHistory")}
              {...formik.getFieldMeta("patient.clinicalHistory")}
              onChange={(e) => handleFieldForSearchPatientChange(e, "CH")}
            />
            <InputWithError
              label="Número de Cédula"
              placeholder="Ingresa el número de cédula"
              {...formik.getFieldProps("patient.ci")}
              {...formik.getFieldMeta("patient.ci")}
              onChange={(e) => handleFieldForSearchPatientChange(e, "CI")}
            />
            <InputWithError
              label="Nombre Completo"
              placeholder="Ingresa el nombre completo"
              {...formik.getFieldProps("patient.fullName")}
              {...formik.getFieldMeta("patient.fullName")}
            />
            <InputWithError
              label="Número de Celular"
              placeholder="Ingresa el número de celular"
              {...formik.getFieldProps("patient.phone")}
              {...formik.getFieldMeta("patient.phone")}
            />
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Información de la Cita
            </h2>
            <InputWithError
              label="Diagnóstico"
              placeholder="Ingresa el diagnóstico"
              {...formik.getFieldProps("appointment.diagnostic")}
              {...formik.getFieldMeta("appointment.diagnostic")}
            />
            <SpecialtySelect
              {...formik.getFieldProps("appointment.specialtyId")}
              {...formik.getFieldMeta("appointment.specialtyId")}
            />
            <InputWithError
              label="Fecha de Inicio"
              {...formik.getFieldProps("appointment.startDate")}
              {...formik.getFieldMeta("appointment.startDate")}
              type="datetime-local"
            />
            <InputWithError
              label="Fecha de Fin"
              {...formik.getFieldProps("appointment.endDate")}
              {...formik.getFieldMeta("appointment.endDate")}
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
              name="appointment.doctorId"
              value={formik.values.appointment.doctorId}
              onChange={(e) =>
                formik.setFieldValue("appointment.doctorId", +e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
              disabled={isLoadingDoctor}
            >
              <option>{isLoadingDoctor ? 'Cargando doctores...' : 'Selecciona un doctor'}</option>
              {availableDoctors?.map((doctor: IDoctor) => (
                <option key={doctor.id} value={doctor.id} disabled={!doctor.available}>
                  Dr. {doctor.name} {doctor.lastName}
                </option>
              )) || <option disabled>Cargando doctores...</option>}
            </select>
            {formik.touched.appointment?.doctorId &&
            formik.errors.appointment?.doctorId ? (
              <div className="text-red-500">
                {formik.errors.appointment?.doctorId}
              </div>
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
  );
}
