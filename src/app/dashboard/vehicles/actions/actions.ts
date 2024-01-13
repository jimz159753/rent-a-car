import { FieldType } from "../interfaces/vehicle.interface"


export const addVehicle = async (newVehicle: FieldType) => {
    const token = localStorage.getItem('token')
    const formData = new FormData()
    for (const name in newVehicle) {
        formData.append(name, newVehicle[name as keyof typeof newVehicle])
    }
    await fetch(`${process.env.API_URL}/vehicles`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    })
}

export const getVehicles = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.API_URL}/vehicles`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    return data
}

export const updateVehicle = async (id: string, updatedVehicle: FieldType) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/vehicles/${id}`, {
        method: 'PATCH',
        credentials: 'include',
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
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}