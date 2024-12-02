"use client";

import { ModalDeleteUserConfirmation } from "@/components/ModalDeleteUserConfirmation";
import RegisterForm from "@/components/RegisterForm";
import TableUsers from "@/components/TableUsers";

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
