import { IReminder } from "@/interfaces/reminder.interface";
import moment from "moment";

export const createReminder = async (data: IReminder) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token no válido");

    const res = await fetch("/api/reminder", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...data,
            date: moment(data.date).startOf('day').toISOString()
        }),
    });
    return await res.json();
}

export const deleteReminder = async (id: number) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token no válido");

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
    if (!token) throw new Error("Token no válido");

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

export const getWeekReminders = async (date: string) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token no válido");

    const res = await fetch(`/api/reminder/week/${date}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    const _reminders = await res.json();
    return _reminders.map((reminder: IReminder) => ({
        ...reminder,
        date: new Date(reminder.date),
    }));
}