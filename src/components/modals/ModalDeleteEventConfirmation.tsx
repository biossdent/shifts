import Modal from "react-modal";
import React from "react";
import { deleteEvent } from "@/api/event.api";
import { eventStore } from "@/stores/event.store";
import { toast } from "react-toastify";

export const ModalDeleteEventConfirmation = () => {

    const { eventForDelete, setInitialEventSelected, setConfirmationDeleteId, setEventForDelete } = eventStore();

  const handleDelete = async () => {
    const _delete = await deleteEvent(eventForDelete?.id!);
    if (_delete.error) return toast.error("Error al eliminar el Evento");
    setConfirmationDeleteId(eventForDelete?.id!);
    toast.success("Evento eliminado con éxito");
    setInitialEventSelected();
  };
  
  if (!eventForDelete) return null;

  return (
    <Modal
      isOpen={Boolean(eventForDelete)}
      onRequestClose={() => setInitialEventSelected()}
      contentLabel="Confirmación de Eliminación del Recordatorio"
      className="absolute inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="relative max-w-md w-full bg-white p-6 rounded-lg shadow-lg text-gray-600">
        <button
          onClick={() => setInitialEventSelected()}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Confirmación de Eliminación
        </h2>

        <p className="text-gray-700 mb-6">
          ¿Estás seguro de que deseas eliminar el evento {" "}
          <span className="font-semibold">
            {eventForDelete?.title}{" "}
          </span>{" "}
          ?
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleDelete}
            className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
          >
            Eliminar
          </button>
          <button
            onClick={() => setEventForDelete(null)}
            className="w-full py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};