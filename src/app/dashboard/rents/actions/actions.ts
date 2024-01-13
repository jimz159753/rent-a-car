import { FieldType, IVehicle, StatusEnum } from "../interfaces/rent.interface"

export const addRent = async (newRent: FieldType) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/rents`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRent)
    })
}

export const getRents = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.API_URL}/rents`, {
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

export const updateRent = async (id: string, updatedRent: FieldType) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/rents/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRent)
    })
}

export const removeRent = async (id: string) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/rents/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getClients = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.API_URL}/clients`, {
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

export const updateVehicle = async (id: string, vehicle: IVehicle) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/vehicles/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehicle)
    })
}