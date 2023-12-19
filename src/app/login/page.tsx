'use client'
import React, { useState } from 'react'
import { Input } from '@/app/components/ui/Input'
import { Button } from '@/app/components/ui/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import './page.css'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const rentACarIcon = require('../../../public/rent_a_car.png')
    const { push } = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        console.log(username, password)
        push('/dashboard/information')
    }
    return (
        <div className='login-form'>
            <Image src={rentACarIcon} alt="rent a car" />
            <Input name='username' type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)} required />
            <Input name='password' type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} required />
            <Button onClick={handleClick}>Entrar</Button>
        </div>
    )
}

export default Login