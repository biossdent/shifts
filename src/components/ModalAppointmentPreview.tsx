import {
  faCalendarDays,
  faIdCard,
  faPhone,
  faStethoscope,
  faTooth,
  faUser,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import React from "react";
import { appointmentsStore } from "@/stores/appointments.store";
import moment from "moment";

const PreviewAppointmentModal = () => {
  const { appointmentSelected, setAppointmentSelected, setAppointmentIdForDelete } = appointmentsStore();

  if (!appointmentSelected) return null;

  const handleDelete = async () => {
    setAppointmentSelected(null);
    setAppointmentIdForDelete(null);
  };

  return (
    <Modal
      isOpen={Boolean(appointmentSelected)}
      onRequestClose={() => setAppointmentSelected(null)}
      contentLabel="Vista Previa de Cita Médica"
      className="absolute inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-30"
    >
      <div className="relative max-w-xl w-full bg-white p-6 rounded-lg shadow-lg text-gray-600">
        <button
          onClick={() => setAppointmentSelected(null)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Vista Previa de la cita
        </h2>

        <div className="flex flex-row rounded-lg bg-gray-100 p-4 mb-4">
          <div className="basis-1/2">
            <div className="flex flex-row items-center mb-2">
              <FontAwesomeIcon icon={faUser} className="text-indigo-600" />
              <div className="flex flex-col pl-2">
                <p className="font-semibold">Nombre</p>{" "}
                <p className="font-medium text-gray-400">
                  {appointmentSelected.patient.fullName}
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center">
              <FontAwesomeIcon icon={faIdCard} className="text-indigo-600" />
              <div className="flex flex-col pl-2">
                <p className="font-semibold">Número de Cédula</p>{" "}
                <p className="font-medium text-gray-400">
                  {appointmentSelected.patient.ci}
                </p>
              </div>
            </div>
          </div>
          <div className="basis-1/2">
            <div className="flex flex-row items-center">
              <FontAwesomeIcon icon={faPhone} className="text-indigo-600" />
              <div className="flex flex-col pl-2">
                <p className="font-semibold">Teléfono</p>{" "}
                <p className="font-medium text-gray-400">
                  {appointmentSelected.patient.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-lg bg-gray-100 p-4 mb-4">
          <div className="flex flex-row">
            <div className="basis-1/2">
              <div className="flex flex-row items-center">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-indigo-600"
                />
                <div className="flex flex-col pl-2">
                  <p className="font-semibold">Fecha de Inicio</p>{" "}
                  <p className="font-medium text-gray-400">
                    {moment(appointmentSelected.startDate).format("DD/MM/YYYY")}
                  </p>
                  <p className="font-medium text-gray-400">
                    {moment(appointmentSelected.startDate).format("hh:mm A")}
                  </p>
                </div>
              </div>
            </div>
            <div className="basis-1/2">
              <div className="flex flex-row items-center mb-2">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-indigo-600"
                />
                <div className="flex flex-col pl-2">
                  <p className="font-semibold">Fecha de Finalización</p>{" "}
                  <p className="font-medium text-gray-400">
                    {moment(appointmentSelected.endDate).format("DD/MM/YYYY")}
                  </p>
                  <p className="font-medium text-gray-400">
                    {moment(appointmentSelected.endDate).format("hh:mm A")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-1 mb-2">
            <div className="flex flex-row items-center">
              <FontAwesomeIcon icon={faTooth} className="text-indigo-600" />
              <div className="flex flex-col pl-2">
                <p className="font-semibold">Especialidad</p>{" "}
                <p className="font-medium text-gray-400">
                  {appointmentSelected.specialty.label}
                </p>
              </div>
            </div>
          </div>
          <div className="basis-1 mb-2">
            <div className="flex flex-col pl-2 w-full">
              <div className="flex flex-row items-center justify-center">
                <FontAwesomeIcon
                  icon={faStethoscope}
                  className="text-indigo-600 pr-2"
                />
                <p className="font-semibold text-center">Diagnóstico</p>{" "}
              </div>
              <p className="font-medium text-gray-400">
                {appointmentSelected.diagnostic}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-lg bg-gray-100 p-4 mb-4">
          <div className="basis-1 mb-2">
            <div className="flex flex-col pl-2 w-full">
              <div className="flex flex-row items-center justify-center">
                <FontAwesomeIcon
                  icon={faUserDoctor}
                  className="text-indigo-600 pr-2"
                />
                <p className="font-semibold text-center">Doctor</p>{" "}
              </div>
              <p className="font-medium text-gray-400">
                {appointmentSelected.doctor.name + " " + appointmentSelected.doctor.lastName}
              </p>
            </div>
          </div>
        </div>

        <button onClick={() => setAppointmentIdForDelete(appointmentSelected.id)} className="mt-6 w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-500">
          Eliminar Cita
        </button>

        <button
          onClick={() => setAppointmentSelected(null)}
          className="mt-1 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default PreviewAppointmentModal;
