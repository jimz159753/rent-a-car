'use client'
import React, { useState } from 'react'
import { Input } from '@/app/components/ui/Input'
import { Button } from '@/app/components/ui/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import './page.css'

const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const rentACarIcon = require('../../../public/rent_a_car.png')
    const { push } = useRouter();

    const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
        console.log(email, password)
        const response = await fetch(`${process.env.API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json()
        localStorage.setItem('token', data.token)
        push('/dashboard/information')
    }
    return (
        <div className='login-form'>
            <Image src={rentACarIcon} alt="rent a car" />
            <Input name='email' type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input name='password' type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button onClick={handleClick}>Entrar</Button>
        </div>
    )
}

export default Login