export const getDoctors = async () => {
    const token = localStorage.getItem('authToken');
    const res = await fetch('/api/doctors', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return await res.json();
}