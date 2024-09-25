import { IAppointment } from "@/interfaces/appointment.interface";

export const createAppointment = async (appointment: IAppointment) => {
    const token = await localStorage.getItem("token");
    if (!token) throw new Error("Token no valido");

    const res = await fetch("/api/appointment", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
    });
    return await res.json();
}

export const getAppointments = async () => {
    const token = await localStorage.getItem("token");
    if (!token) throw new Error("Token no valido");

    const res = await fetch("/api/appointment", {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await res.json();
}