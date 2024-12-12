export const getDoctors = async () => {
    const token = localStorage.getItem('authToken');
    const res = await fetch('/api/doctors', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return await res.json();
}

export const getAvailableDoctors = async (startDate: string, endDate: string) => {
    const token = localStorage.getItem('authToken');
    const url = new URL('/api/doctors/available', window.location.origin);
    url.searchParams.append('startDate', startDate);
    url.searchParams.append('endDate', endDate);
    const res = await fetch(url.toString(), {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return await res.json();
}