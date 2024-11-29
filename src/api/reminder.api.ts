import { IReminder } from "@/interfaces/reminder.interface";

export const createReminder = async (data: IReminder) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token no valido");

    const res = await fetch("/api/reminder", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...data,
            date: new Date(data.date).toISOString(),
        }),
    });
    return await res.json();
}

export const deleteReminder = async (id: number) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token no valido");

    const res = await fetch(`/api/reminder/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await res.json();
}

export const getReminders = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token no valido");

    const res = await fetch("/api/reminder", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'date': new Date().toISOString(),
        }
    });
    const _reminders = await res.json();
    return _reminders.map((reminder: IReminder) => ({
        ...reminder,
        date: new Date(reminder.date),
    }));
}