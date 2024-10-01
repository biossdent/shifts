import { IAppointment } from "@/interfaces/appointment.interface";

export const createAppointment = async (appointment: IAppointment) => {
    const token = localStorage.getItem("authToken");
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
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token no valido");

    const res = await fetch("/api/appointment", {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const _appointments = await res.json();
    return _appointments.map((appointment: IAppointment) => {
        return {
            ...appointment,
            startDate: new Date(appointment.startDate),
            endDate: new Date(appointment.endDate),
        };
    });
}