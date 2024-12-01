import Modal from "react-modal";
import React from "react";
import { blockAppointmentStoreStore } from "@/stores/blockAppoitment.store";
import { deleteBlockAppointment } from "@/api/blockAppointment.api";
import { toast } from "react-toastify";

export const ModalDeleteBlockAppointmentConfirmation = () => {
  const {
    blockAppointmentIdForDelete,
    setConfirmationDeleteId,
    setBlockAppointmentsIdForDelete,
    setInitialBlockAppointmentSelected,
  } = blockAppointmentStoreStore();

  const handleDelete = async () => {
    if (!blockAppointmentIdForDelete) return;
    const _delete = await deleteBlockAppointment(blockAppointmentIdForDelete);
    if (_delete.error)
      return toast.error("Error al eliminar el bloqueo de cita");
    setConfirmationDeleteId(blockAppointmentIdForDelete);
    toast.success("Bloqueo de cita eliminado con éxito");
    setInitialBlockAppointmentSelected();
  };

  if (!blockAppointmentIdForDelete) return null;

  return (
    <Modal
      isOpen={Boolean(blockAppointmentIdForDelete)}
      onRequestClose={() => setInitialBlockAppointmentSelected()}
      contentLabel="Confirmación de Eliminación de Usuario"
      className="absolute inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="relative max-w-md w-full bg-white p-6 rounded-lg shadow-lg text-gray-600">
        <button
          onClick={() => setInitialBlockAppointmentSelected()}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Confirmación de Eliminación
        </h2>

        <p className="text-gray-700 mb-6">
          ¿Estás seguro de que deseas eliminar el bloqueo de cita?
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleDelete}
            className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
          >
            Eliminar
          </button>
          <button
            onClick={() => setBlockAppointmentsIdForDelete(null)}
            className="w-full py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};
