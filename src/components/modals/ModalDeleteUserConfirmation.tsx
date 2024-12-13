import Modal from "react-modal";
import React from "react";
import { deleteUser } from "@/api/users.api";
import { toast } from "react-toastify";
import { userStore } from "@/stores/user.store";

export const ModalDeleteUserConfirmation = () => {
  const {
    userForDelete,
    setUserConfirmationDeleteId,
    setUserForDelete,
    setInitialUserSelected,
  } = userStore();

  const handleDelete = async () => {
    const _delete = await deleteUser(userForDelete?.id!);
    if (_delete.error) return toast.error("Error al eliminar el usuario");
    setUserConfirmationDeleteId(userForDelete?.id!);
    toast.success("Usuario eliminado con éxito");
    setInitialUserSelected();
  };

  if (!userForDelete) return null;

  return (
    <Modal
      isOpen={Boolean(userForDelete)}
      onRequestClose={() => setInitialUserSelected()}
      contentLabel="Confirmación de Eliminación de Usuario"
      className="absolute inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="relative max-w-md w-full bg-white p-6 rounded-lg shadow-lg text-gray-600">
        <button
          onClick={() => setInitialUserSelected()}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Confirmación de Eliminación
        </h2>
        <div className="mb-6">
          <p className="text-gray-700 mb-2">
            ¿Estás seguro de que deseas eliminar el usuario:{" "}
            <span className="font-semibold">
              {userForDelete.name} {userForDelete?.lastName}
            </span>{" "}
          </p>
          <p>
            Al eliminarlo se eliminaran todas sus <b>citas</b>, <b>recordatorios</b> y <b>bloqueos de citas</b> creados 
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleDelete}
            className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
          >
            Eliminar
          </button>
          <button
            onClick={() => setUserForDelete(null)}
            className="w-full py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};
