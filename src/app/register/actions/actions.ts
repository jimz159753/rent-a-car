import { IRent } from "../interface/register.interface"

export const addRent = async (newRent: IRent) => {
    return await fetch(`${process.env.API_URL}/stripe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRent)
    })
}