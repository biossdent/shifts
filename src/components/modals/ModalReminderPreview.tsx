import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import { ROLE } from "@/enums/role.enum";
import React from "react";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { reminderStore } from "@/stores/reminder.store";
import { sessionStore } from "@/stores/session.store";

const PreviewReminderModal = () => {
  const { reminderSelected, setReminderSelected, setReminderIdForDelete } =
    reminderStore();
  const { user } = sessionStore();

  if (!reminderSelected) return null;

  return (
    <Modal
      isOpen={Boolean(reminderSelected)}
      onRequestClose={() => setReminderSelected(null)}
      contentLabel="Vista Previa de Cita Médica"
      className="absolute inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-30"
    >
      <div className="relative max-w-xl w-full bg-white p-6 rounded-lg shadow-lg text-gray-600">
        <button
          onClick={() => setReminderSelected(null)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-700">Recuerda...</h2>
        <div className="flex align-center justify-center">
        <span className="font-semibold text-xl">{reminderSelected.title}</span>
        </div>
        <div className="flex flex-row rounded-lg bg-gray-100 p-4 mb-4">
          <div className="basis-1/2">
            <div className="flex flex-row items-center mb-2">
              <FontAwesomeIcon icon={faLightbulb} className="text-indigo-600" />
              <div className="flex flex-col pl-2">
                <p className="font-semibold text-gray-400">
                  {reminderSelected.reminder}
                </p>
              </div>
            </div>
          </div>
        </div>
        {user &&
        (user.role === ROLE.RECEPTIONIST ||
          user.role === ROLE.SUPERADMIN ||
          user.role === ROLE.ADMIN) ? (
          <button
            onClick={() => setReminderIdForDelete(reminderSelected.id!)}
            className="mt-6 w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
          >
            Eliminar Recordatorio
          </button>
        ) : null}

        <button
          onClick={() => setReminderSelected(null)}
          className="mt-1 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default PreviewReminderModal;
