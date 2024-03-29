import { FieldType } from "../interfaces/document.interface"

export const addDocument = async (newDocument: FieldType) => {
    const token = localStorage.getItem('token')
    const formData = new FormData()

    const { rent } = newDocument
    const newObj = JSON.stringify({ rent })

    formData.append('data', newObj)
    formData.append('document', newDocument.document)

    await fetch(`${process.env.API_URL}/documents`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    })
}

export const getDocuments = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.API_URL}/documents`, {
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

export const updateDocument = async (id: string, updatedDocument: FieldType) => {
    const token = localStorage.getItem('token')
    await fetch(`${process.env.API_URL}/documents/${id}`, {
        method: 'PATCH',
        credentials: 'include',
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
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`
        }
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