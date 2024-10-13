"use client";

import { IUser, IUserCreated } from "@/interfaces/user.interface";
import { useEffect, useState } from "react";

import { ROLE } from "@/enums/role.enum";
import RegisterForm from "@/components/RegisterForm";
import TableUsers from "@/components/TableUsers";
import { getUsers } from "@/api/users.api";

export default function UsersPage() {
  const [users, setUsers] = useState<IUserCreated[] | null>(null);
  const [user, setUser] = useState<IUser>({
    email: "",
    name: "",
    lastName: "",
    role: ROLE.DOCTOR,
  });

  useEffect(() => {
    const _getUsers = async () => {
      const _users = await getUsers();
      setUsers(_users);
    };
    _getUsers();
  }, []);

  const handleSubmit = () => {};
  return (
    <div className="flex h-screen bg-gray-900 flex-col lg:flex-row">
      <RegisterForm />
      <TableUsers users={users} />
    </div>
  );
}
