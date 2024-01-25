'use client'
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import './page.css'
import { addClient, addRent, successPayment } from './actions/actions'

const Success = () => {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session_id')

    const checkPayment = async () => {
        if (sessionId) {
            const session = await successPayment(sessionId)
            if (session.payment_status === 'paid') {
                const client = JSON.parse(session.metadata.client)
                const vehicle = JSON.parse(session.metadata.vehicle)
                const rent = {
                    ...session.metadata,
                    vehicle,
                    client
                }
                addClient(client)
                addRent(rent)
            }
        }
    }

    useEffect(() => {
        if (sessionId) {
            checkPayment()
        }
    }, [])
    return (
        <div>Success</div>
    )
}

export default Success;