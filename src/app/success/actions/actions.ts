import { ClientType, RentType } from "../interface/sucess.interface";

export const addClient = async (newClient: ClientType) => {
  await fetch(`${process.env.API_URL}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newClient),
  });
};

export const addRent = async (newRent: RentType) => {
  await fetch(`${process.env.API_URL}/rents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRent),
  });
};

export const successPayment = async (sessionId: string) => {
  const res = await fetch(
    `${process.env.API_URL}/stripe/session/${sessionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return await res.json();
};
