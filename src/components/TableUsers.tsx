import React, { useEffect } from "react";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ROLE } from "@/enums/role.enum";
import { ROLES } from "@/consts/role.conts";
import { TableHeadUsers } from "@/consts/table.conts";
import { Tooltip } from "react-tooltip";
import { getUsers } from "@/api/users.api";
import { userStore } from "@/stores/user.store";

const TableUsers = () => {
  const {
    users,
    userSelected,
    setUsers,
    setUserSelected,
    setUserForDelete,
    setInitialUserSelected,
  } = userStore();

  useEffect(() => {
    const _getUsers = async () => {
      const _users = await getUsers();
      setUsers(_users);
    };
    _getUsers();
  }, []);

  const isUserSelected = (idSelected: number) =>
    idSelected === userSelected?.id;

  const getLabelRole = (role: ROLE) =>
    ROLES.map((rol) => (rol.value === role ? rol.label : null));

  return (
    <div className="mb-6 p-4  w-full md:basis-3/5 order-1 md:order-2">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Usuarios Registrados
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              {TableHeadUsers.map((header) => (
                <th
                  className="px-4 py-2 border-b text-left font-bold bg-gray-800 text-white"
                  key={header.id}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className={`${
                    isUserSelected(user.id)
                      ? "bg-indigo-600 text-white"
                      : "even:bg-gray-50  text-gray-700"
                  }`}
                >
                  <td className="px-4 py-2 border-b">{user.name}</td>
                  <td className="px-4 py-2 border-b">{user.lastName}</td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b">
                    {getLabelRole(user.role)}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <FontAwesomeIcon
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Editar"
                      className={`mr-4 ml-4 cursor-pointer outline-none ${
                        isUserSelected(user.id)
                          ? "text-green-500 outline"
                          : "text-yellow-500"
                      }`}
                      icon={faPenToSquare}
                      onClick={
                        isUserSelected(user.id)
                          ? () => setInitialUserSelected()
                          : () => setUserSelected(user)
                      }
                    />
                    <FontAwesomeIcon
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Eliminar"
                      className="text-red-500 cursor-pointer outline-none"
                      icon={faTrash}
                      onClick={() => setUserForDelete(user)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center text-gray-700">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Tooltip id="tooltip" place="top" />
    </div>
  );
};

export default TableUsers;
