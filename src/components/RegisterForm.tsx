'use client';

import { ChangeEvent, useState } from 'react';

import { IUserNew } from '@/interfaces/user.interface';
import { ROLE } from '@/enums/role.enum';

const RegisterForm = () => {
    const [user, setUser] = useState<IUserNew>({
        name: '',
        lastName: '',
        email: '',
        role: ROLE.DOCTOR,
        password: ''
    })

    const register = async () => {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const data = await res.json();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <div className="flex justify-center h-screen w-2/5 p-4 space-y-4 bg-gray-800 text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-white">Registrar nuevo usuario</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Nombre"
                        value={user.name}
                        onChange={handleChange}
                        name='name'
                    />
                    <input
                        type="text"
                        className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Apellido"
                        value={user.lastName}
                        onChange={handleChange}
                        name='lastName'
                    />
                    <input
                        type="email"
                        className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Correo electrónico"
                        value={user.email}
                        onChange={handleChange}
                        name='email'
                    />
                    <input
                        type="password"
                        className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Contraseña"
                        value={user.password}
                        onChange={handleChange}
                        name='password'
                    />
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-200">
                            Rol
                        </label>
                        <select
                            id="role"
                            value={user.role}
                            onChange={handleChange}
                            className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                            name='role'
                        >
                            <option value="" disabled>
                                Selecciona un rol
                            </option>
                            {Object.values(ROLE).map((rol) => <option key={rol} value={rol}>{rol}</option>
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