import { IUserCreated } from '@/interfaces/user.interface';
import React from 'react';
import { TableHeadUsers } from '@/consts/table';

interface IUsersTableProps {
  users: IUserCreated[] | null
}

const TableUsers = (props: IUsersTableProps) => {
  const { users } = props;
  return (
    <div className="mb-6 w-3/5 p-2">
      <h2 className="text-xl font-bold mb-4 text-white">Usuarios Registrados</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              {TableHeadUsers.map((header) =>
                <th className="px-4 py-2 border-b text-left text-gray-700 font-medium" key={header.id}>{header.label}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="even:bg-gray-50">
                  <td className="px-4 py-2 border-b text-gray-700">{user.id}</td>
                  <td className="px-4 py-2 border-b text-gray-700">{user.name}</td>
                  <td className="px-4 py-2 border-b text-gray-700">{user.lastName}</td>
                  <td className="px-4 py-2 border-b text-gray-700">{user.email}</td>
                  <td className="px-4 py-2 border-b text-gray-700">{user.role}</td>
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

      {/* Botón similar al de guardar en el formulario */}
      <button
        className="w-full py-2 mt-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
      >
        Añadir Usuario
      </button>
    </div>
  );
};

export default TableUsers;
