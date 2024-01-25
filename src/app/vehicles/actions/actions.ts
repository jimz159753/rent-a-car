export const getVehicles = async (startDate: string, endDate: string) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.API_URL}/vehicles/dates/available?startDate=${startDate}&endDate=${endDate}`, {
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