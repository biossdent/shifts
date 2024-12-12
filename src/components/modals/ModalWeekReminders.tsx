import Modal from "react-modal";
import React from "react";
import { formatDate } from "@/utils/date.util";
import { reminderStore } from "@/stores/reminder.store";

const ModalWeekReminders = () => {
  const {
    reminderWeeks,
    reminderShowWeek,
    setReminderSelected,
    setReminderShowWeek,
  } = reminderStore();

  if (reminderWeeks.length === 0 || !reminderShowWeek) return null;

  return (
    <Modal
      isOpen={reminderShowWeek}
      onRequestClose={() => setReminderShowWeek(false)}
      contentLabel="Vista Previa de Cita Médica"
      className="absolute inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-30"
    >
      <div className="relative max-w-xl w-full bg-white pt-6 rounded-lg shadow-lg text-gray-600">
        <button
          onClick={() => setReminderShowWeek(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <div className="px-6">
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            Recordatorios de la semana
          </h2>
        </div>
        <div className="flex flex-col rounded-lg bg-gray-100 p-4 px-6 gap-2">
          {reminderWeeks.map((reminder) => (
            <div
              onClick={() => setReminderSelected(reminder)}
              key={reminder.id}
              className="p-3 bg-gray-700 rounded-lg shadow-md cursor-pointer w-full"
            >
              <h3 className="font-semibold text-white ml-2">
                {reminder.title}
              </h3>
              <span className="text-white font-extralight text-sm">
                {formatDate(reminder.date, "DD/MM/YYYY")}
              </span>
            </div>
          ))}
        </div>
        <div className="pb-6 px-6">
          <button
            onClick={() => setReminderShowWeek(false)}
            className="mt-1 w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalWeekReminders;
