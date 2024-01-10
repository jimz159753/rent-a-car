'use client'
import React, { useContext } from 'react'
import Dashboard from '../page'
import { Context } from '@/app/layout'

const Information = () => {
    const [user, setUser] = useContext(Context)
    console.log(user)
    return (
        <Dashboard>
            <div>Information</div>
        </Dashboard>
    )
}

export default Information