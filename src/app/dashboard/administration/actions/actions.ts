import { FieldType } from "../interfaces/user.interface";

export const addUser = async (newUser: FieldType) => {
  const token = localStorage.getItem("token");
  await fetch(`${process.env.API_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
};

export const getUsers = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.API_URL}/users`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const updateUser = async (id: string, updatedUser: FieldType) => {
  const token = localStorage.getItem("token");
  await fetch(`${process.env.API_URL}/users/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });
};

export const removeUser = async (id: string) => {
  const token = localStorage.getItem("token");
  await fetch(`${process.env.API_URL}/users/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
