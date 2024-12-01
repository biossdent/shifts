import moment from "moment";

export const getAllBlockAppointments = async () => {
  const token = localStorage.getItem("authToken");
  const res = await fetch("/api/block-appointment", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const createBlockAppointment = async (blockAppointment: any) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Token no valido");

  const res = await fetch("/api/block-appointment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...blockAppointment,
      startDate: moment(blockAppointment.startDate).toISOString(),
      endDate: moment(blockAppointment.endDate).toISOString(),
    }),
  });
  return await res.json();
};

export const deleteBlockAppointment = async (id: number) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Token no valido");

  const res = await fetch(`/api/block-appointment/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};