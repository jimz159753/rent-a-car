import { IDocument } from "../interfaces/document.interface"



export const addDocument = async (newDocument: IDocument) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/documents`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDocument)
    })
}

export const getDocuments = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.API_URL}/documents`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    return data
}

export const updateDocument = async (id: string, updatedDocument: IDocument) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/documents/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedDocument)
    })
}

export const removeDocument = async (id: string) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/documents/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}