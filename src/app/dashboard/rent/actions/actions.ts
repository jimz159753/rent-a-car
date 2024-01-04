import { IRent } from "../interfaces/rent.interface"

export const addRent = async (newRent: IRent) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/rents`, {
        method: 'POST',
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
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    return data
}

export const updateRent = async (id: string, updatedRent: IRent) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/rents/${id}`, {
        method: 'PATCH',
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
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getClients = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.API_URL}/clients`, {
        method: 'GET',
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
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    return data
}