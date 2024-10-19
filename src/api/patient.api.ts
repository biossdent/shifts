import { IPatient } from "@/interfaces/patient.interface";

export const getPatientByCI = async (ci: string) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token no valido");

    const res = await fetch(`/api/patients/${ci}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await res.json();
}

export const createPatient = async (patient: IPatient) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token no valido");

    const res = await fetch("/api/patients", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
    });
    return await res.json();
}