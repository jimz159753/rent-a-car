import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './page.css'

interface DashboardProps {
    children: React.ReactNode
}

const Dashboard: React.FunctionComponent<DashboardProps> = ({ children }) => {
    const rentACarIcon = require('../../../public/rent_a_car.png')
    return (
        <div className='dashboard'>
            <section className='sidebar'>
                <Image src={rentACarIcon} alt="rent a car" />
                <ol>
                    <li>
                        <Link href={'/dashboard/information'}>
                            <p>Datos personales</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/dashboard/administration'}>
                            <p>Administración</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/dashboard/clients'}>
                            <p>Clientes</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/dashboard/documents'}>
                            <p>Documentos</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/dashboard/vehicles'}>
                            <p>Vehículos</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/dashboard/rent'}>
                            <p>Alquiler de Vehículos</p>
                        </Link>
                    </li>
                </ol>
            </section>
            <section className='flex items-center justify-center w-screen'>
                {children}
            </section>
        </div>
    )
}

export default Dashboard