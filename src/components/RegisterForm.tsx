'use client';

import { ChangeEvent } from 'react';
import { ROLES } from '@/consts/role';
import { registerUser } from '@/api/users.api';
import { toast } from 'react-toastify';
import { userStore } from '@/stores/user.store';

const RegisterForm = () => {
    const { userSelected, setUserSelected, setUsers, users, setInitialUserSelected } = userStore();

    const register = async () => {
        const createdUser = await registerUser(userSelected);
        if (createdUser.error) return toast.error(createdUser.error);
        toast.success('Usuario creado exitosamente');
        setUsers([...users, createdUser]);
        setInitialUserSelected();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUserSelected({ ...userSelected, [e.target.name]: e.target.value })
    }

    return (
        <div className="flex justify-center h-screen w-full md:basis-2/5 p-4 space-y-4 bg-gray-800 text-white md:flex-row order-2 md:order-1 md:mr-4">
            <div className="w-full space-y-6 bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-white">Registrar nuevo usuario</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Nombre"
                        value={userSelected.name}
                        onChange={handleChange}
                        name='name'
                    />
                    <input
                        type="text"
                        className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Apellido"
                        value={userSelected.lastName}
                        onChange={handleChange}
                        name='lastName'
                    />
                    <input
                        type="email"
                        className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Correo electrónico"
                        value={userSelected.email}
                        onChange={handleChange}
                        name='email'
                    />
                    {/* <input
                        type="password"
                        className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Contraseña"
                        value={userSelected.password}
                        onChange={handleChange}
                        name='password'
                    /> */}
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-200">
                            Rol
                        </label>
                        <select
                            id="role"
                            value={userSelected.role}
                            onChange={handleChange}
                            className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                            name='role'
                        >
                            <option value="" disabled>
                                Selecciona un rol
                            </option>
                            {ROLES.map((rol) => <option key={rol.id} value={rol.value}>{rol.label}</option>
                            )}
                        </select>
                    </div>

                </div>
                <button
                    onClick={register}
                    className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none"
                >
                    Registrar
                </button>
            </div>
        </div>
    );
}

export default RegisterForm;