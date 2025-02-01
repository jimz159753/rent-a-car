import { FieldType } from "../interfaces/user.interface";

export const updateUserPassword = async (
  id: string,
  updatedUserPassword: FieldType,
) => {
  const token = localStorage.getItem("token");
  await fetch(`${process.env.API_URL}/auth/update/password/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUserPassword),
  });
};
