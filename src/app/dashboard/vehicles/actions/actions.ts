import { IVehicle } from "../interfaces/vehicle.interface"


export const addVehicle = async (newVehicle: IVehicle) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/vehicles`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newVehicle)
    })
}

export const getVehicles = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.API_URL}/vehicles`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    return data
}

export const updateVehicle = async (id: string, updatedVehicle: IVehicle) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/vehicles/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedVehicle)
    })
}

export const removeVehicle = async (id: string) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/vehicles/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}