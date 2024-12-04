import { IEvent } from "@/interfaces/event.interface";

export const createEvent = async (data: IEvent) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token no valido");

    const res = await fetch("/api/events", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...data,
        }),
    });
    return await res.json();
}

export const deleteEvent = async (id: number) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token no valido");

    const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await res.json();
}

export const getEvents = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token no valido");

    const res = await fetch("/api/events", {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return await res.json();
}