import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import AppointmentForm from "../forms/AppointmentForm";
import { FORM_TYPE } from "@/enums/formType.enum";
import Modal from "react-modal";
import ReminderForm from "../forms/ReminderForm";

interface IAppointmentOrReminderFormProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  date: string;
}

const AppointmentOrReminderForm = (props: IAppointmentOrReminderFormProps) => {
  const { showModal, setShowModal, date } = props;
  const [formType, setFormType] = useState<FORM_TYPE>(FORM_TYPE.APPOINTMENT);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={true}
      contentLabel="Añadir Nueva Cita"
      className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white p-6 rounded-lg shadow-lg max-h-screen overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <div className="mb-2 flex">
          <button
            className={`flex-1 px-4 py-2 border ${
              formType === FORM_TYPE.APPOINTMENT
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-indigo-600 border-x-indigo-600 border-t-indigo-600 border-b-0 hover:bg-indigo-50"
            }`}
            onClick={() => setFormType(FORM_TYPE.APPOINTMENT)}
          >
            Cita Médica
          </button>
          <button
            className={`flex-1 px-4 py-2 border ${
              formType === FORM_TYPE.REMINDER
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-indigo-600 border-x-indigo-600 border-t-indigo-600 border-b-0 hover:bg-indigo-50"
            }`}
            onClick={() => setFormType(FORM_TYPE.REMINDER)}
          >
            Recordatorio
          </button>
        </div>
        <div>
          {formType === FORM_TYPE.APPOINTMENT ? (
            <AppointmentForm date={date} setShowModal={setShowModal} />
          ) : (
            <ReminderForm date={date} setShowModal={setShowModal} />
          )}
        </div>
        <button
          onClick={handleClose}
          className={`mt-4 w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-500 md:hidden`}
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default AppointmentOrReminderForm;
