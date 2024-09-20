export const getUsers = async () => {
    const token = localStorage.getItem('authToken');
    const res = await fetch('/api/users', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return await res.json();
}