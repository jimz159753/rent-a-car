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
                <li><Link href={'#about'}>Nosotros</Link></li>
                <li><Link href={'#cars'}>Autos</Link></li>
                <li><Link href={'#contact'}>Oficinas</Link></li>
                <li><Link href={'#contact'}>Contacto</Link></li>
            </ul>
        </div>
    )
}
