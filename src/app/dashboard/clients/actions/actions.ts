import { IClient } from "../interfaces/client.interface"

export const addClient = async (newClient: IClient) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/clients`, {
        method: 'POST',
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
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    return data
}

export const updateClient = async (id: string, updatedClient: IClient) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/clients/${id}`, {
        method: 'PATCH',
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
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}