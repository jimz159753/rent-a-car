import { CategoryEnum } from "../interface/vehicle.interface"

export const getVehiclesByCategory = async (category: CategoryEnum) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.API_URL}/vehicles/category/${category}`, {
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