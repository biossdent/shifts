import { ISpecialty } from "@/interfaces/specialty.interface";

export const getSpecialties = async () => {
    const token = localStorage.getItem('authToken');
    const res = await fetch('/api/specialty', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return await res.json();
}

export const createSpecialty = async (specialty: ISpecialty) => {
    const token = localStorage.getItem('authToken');
    const res = await fetch('/api/specialty', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(specialty)
    })
    return await res.json();
}