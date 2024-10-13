export const getUsers = async () => {
    const token = localStorage.getItem('authToken');
    const res = await fetch('/api/users', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return await res.json();
}

export const registerUser = async (user: any) => {
    const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return await res.json();
}