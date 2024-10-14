export const getUsers = async () => {
  const token = localStorage.getItem("authToken");
  const res = await fetch("/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const registerUser = async (user: any) => {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await res.json();
};

export const updatePasswordByReset = async (password: string, token: string) => {
  const response = await fetch("/api/reset-password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newPassword: password }),
  });
  return await response.json();
};
