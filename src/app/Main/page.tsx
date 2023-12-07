import React from 'react'
import { Navbar } from '../components/ui/Navbar'
import Image from 'next/image'
import './page.css'
import { Categories } from '../components/ui/Categories'
import { Footer } from '../components/ui/Footer'


export const Main = () => {
    const cityBackground = require('../../../public/city_background.png')
    const aboutUsImg = require('../../../public/about_us.png')
    const freeWorriesImg = require('../../../public/free_worries.png')
    const aboutUs = `
    Líder en la industria de alquiler de vehículos, comprometida a proporcionar a nuestros clientes una experiencia de conducción excepcional. Con una flota diversa de automóviles de alta calidad, nos esforzamos por satisfacer las necesidades y expectativas de cada cliente.`
    const freeWorries = `
    Asistencia personalizada 24/7 sin costo adicional a tu renta en caso de emergencias de salud o contratiempos de viaje
    `
    return (
        <div>
            <Navbar />
            <Image src={cityBackground} className='city-background' alt="rent a car" />
            <div id='about' className='main-container'>

                <div className='about-us'>
                    <div className='about-us-text'>
                        <h1>Nosotros</h1>
                        <p>{aboutUs}</p>
                    </div>
                    <Image src={aboutUsImg} className='about-us-img' alt="rent a car" />
                </div>
                <div className='free-worries'>
                    <Image src={freeWorriesImg} className='free-worries-img' alt="rent a car" />
                    <div className='free-worries-text'>
                        <h1>Viaja libre de preocupaciones</h1>
                        <p>{freeWorries}</p>
                    </div>
                </div>
                <h1 className='text-center font-quando text-[24px] opacity-60'>Tipo de vehículos</h1>
                <Categories />
            </div>
            <Footer />
        </div>
    )
}
