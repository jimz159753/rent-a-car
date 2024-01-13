import { FieldType } from "../interfaces/client.interface"

export const addClient = async (newClient: FieldType) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/clients`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newClient)
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

export const updateClient = async (id: string, updatedClient: FieldType) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/clients/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedClient)
    })
}

export const removeClient = async (id: string) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/clients/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}