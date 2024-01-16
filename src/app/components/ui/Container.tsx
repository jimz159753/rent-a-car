import React from 'react'
import { Navbar } from './Navbar'
import Image from 'next/image'
import { Footer } from './Footer'

interface ContainerProps {
    children: React.ReactElement
}

export const Container = ({ children }: ContainerProps) => {
    const cityBackground = require('../../../../public/city_background.png')
    return (
        <div>
            <Navbar />
            <Image src={cityBackground} className='h-5/6 mx-0 bg-cover mb-32 w-full' alt="rent a car" />
            {children}
            <Footer />
        </div>
    )
}
