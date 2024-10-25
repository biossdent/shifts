"use client";

import { ChangeEvent, useState } from "react";
import { registerUser, updateUser } from "@/api/users.api";

import { IUserCreated } from "@/interfaces/user.interface";
import PasswordInput from "./InputPassword";
import { ROLES } from "@/consts/role";
import { toast } from "react-toastify";
import { userStore } from "@/stores/user.store";
import { validateEmail } from "@/utils/validations.util";

const INITIAL_ERRORS = {
  name: "",
  email: "",
  password: "",
  rol: ""
};

const RegisterForm = () => {
  const {
    userSelected,
    setUserSelected,
    setUsers,
    users,
    setInitialUserSelected,
  } = userStore();
  const isEditing = userSelected.id !== undefined;
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const validateFields = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let rolError = "";

    if (!userSelected.name) {
      nameError = "El nombre no puede estar vacío.";
    }

    if (!validateEmail(userSelected.email)) {
      emailError = "El correo electrónico no es válido.";
    }

    if (!userSelected.password) {
      passwordError = "La contraseña no puede estar vacía.";
    }

    if (userSelected.password?.length! < 6) {
      passwordError = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (!userSelected.role) {
      rolError = "Debe seleccionar un rol.";
    }

    setErrors({ name: nameError, email: emailError, password: passwordError, rol: rolError });

    return !nameError && !emailError && !passwordError && !rolError;
  };

  const createOrUpdateUser = async () => {
    if (!validateFields()) {
      if (errors.name) toast.error(errors.name);
      if (errors.email) toast.error(errors.email);
      if (errors.password) toast.error(errors.password);
      if (errors.rol) toast.error(errors.rol);
      return;
    }
    if (isEditing) {
      const updatedUser = await updateUser(userSelected as IUserCreated);
      if (updatedUser.error) return toast.error(updatedUser.error);
      toast.success("Usuario actualizado exitosamente");
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setInitialUserSelected();
    } else {
      const createdUser = await registerUser(userSelected);
      if (createdUser.error) return toast.error(createdUser.error);
      toast.success("Usuario creado exitosamente");
      setUsers([...users, createdUser]);
      setInitialUserSelected();
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserSelected({ ...userSelected, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center h-screen w-full md:basis-2/5 p-4 space-y-4 bg-gray-800 text-white md:flex-row order-2 lg:order-1 md:mr-4">
      <div className="w-full space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-white">
          {isEditing ? "Actualizar Usuario": "Registrar Nuevo Usuario"}  
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nombre"
            value={userSelected.name}
            onChange={handleChange}
            name="name"
          />
          <input
            type="text"
            className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Apellido"
            value={userSelected.lastName}
            onChange={handleChange}
            name="lastName"
          />
          <input
            type="email"
            className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Correo electrónico"
            value={userSelected.email}
            onChange={handleChange}
            name="email"
          />
          <PasswordInput
            name="password"
            value={userSelected.password ?? ""}
            onChange={handleChange}
            placeholder="Contraseña"
          />
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-200"
            >
              Rol
            </label>
            <select
              id="role"
              value={userSelected.role}
              onChange={handleChange}
              className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              name="role"
            >
              <option value="" disabled>
                Selecciona un rol
              </option>
              {ROLES.map((rol) => (
                <option key={rol.id} value={rol.value}>
                  {rol.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={createOrUpdateUser}
          className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none"
        >
          {isEditing ? "Actualizar" : "Registrar"}
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
