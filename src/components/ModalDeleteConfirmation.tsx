import Modal from "react-modal";
import React from "react";
import { appointmentsStore } from "@/stores/appointments.store";
import { deleteAppointment } from "@/api/appointment.api";
import moment from "moment";
import { toast } from "react-toastify";

const DeleteAppointmentConfirmationModal = () => {
  const { appointmentSelected, appointmentIdForDelete, setAppointmentSelected, setConfirmationDeleteId, setAppointmentIdForDelete } =
    appointmentsStore();

  const handleDelete = async () => {
    const _delete = await deleteAppointment(appointmentIdForDelete!);
    if (!_delete) return toast.error("Error al eliminar cita");
    setConfirmationDeleteId(appointmentIdForDelete!);
    toast.success("Cita eliminada con éxito");
    setAppointmentSelected(null);
  };
  
  if (!appointmentIdForDelete) return null;

  return (
    <Modal
      isOpen={Boolean(appointmentIdForDelete)}
      onRequestClose={() => setAppointmentSelected(null)}
      contentLabel="Confirmación de Eliminación de Cita"
      className="absolute inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="relative max-w-md w-full bg-white p-6 rounded-lg shadow-lg text-gray-600">
        <button
          onClick={() => setAppointmentSelected(null)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Confirmación de Eliminación
        </h2>

        <p className="text-gray-700 mb-6">
          ¿Estás seguro de que deseas eliminar esta cita con{" "}
          <span className="font-semibold">
            {appointmentSelected?.doctor.name}{" "}
            {appointmentSelected?.doctor.lastName}
          </span>{" "}
          el{" "}
          <span className="font-semibold">
            {moment(appointmentSelected?.startDate).format("DD/MM/YYYY")}
          </span>{" "}
          a las{" "}
          <span className="font-semibold">
            {moment(appointmentSelected?.startDate).format("hh:mm A")}
          </span>
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
            onClick={() => setAppointmentIdForDelete(null)}
            className="w-full py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAppointmentConfirmationModal;
