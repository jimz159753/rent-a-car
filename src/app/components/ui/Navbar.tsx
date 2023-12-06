import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './Navbar.css'

export const Navbar = () => {
    const mainIcon = require('../../../../public/rent_a_car.png')
    return (
        <div className='navbar'>
            <Image src={mainIcon} width={100} height={100} alt="rent a car" />
            <ul className='list'>
                <li><Link href={''}>Nosotros</Link></li>
                <li><Link href={''}>Autos</Link></li>
                <li><Link href={''}>Oficinas</Link></li>
                <li><Link href={''}>Contacto</Link></li>
            </ul>
        </div>
    )
}
