"use client";

import { ModalDeleteUserConfirmation } from "@/components/modals/ModalDeleteUserConfirmation";
import RegisterForm from "@/components/forms/RegisterForm";
import TableUsers from "@/components/tables/TableUsers";

export default function UsersPage() {

  //TODO: permitir editar usuarios sin cambiar la contraseña
  return (
    <div className="flex h-screen bg-gray-900 flex-col lg:flex-row">
      <RegisterForm />
      <TableUsers />
      <ModalDeleteUserConfirmation/>
    </div>
  );
}
