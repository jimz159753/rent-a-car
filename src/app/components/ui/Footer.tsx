import React from 'react'
import Image from 'next/image'
import './Footer.css'

export const Footer = () => {
    const instagramIcon = require('../../../../public/instagram.png')
    const facebookIcon = require('../../../../public/facebook.png')
    const twitterIcon = require('../../../../public/twitter.png')

    const visaIcon = require('../../../../public/visa.png')
    const mastercardIcon = require('../../../../public/mastercard.png')
    const americanIcon = require('../../../../public/american.png')
    return (
        <div className='footer'>
            <div className='info'>
                <div className='social-media'>
                    <Image src={instagramIcon} className='icon' alt="rent a car" />
                    <Image src={facebookIcon} className='icon' alt="rent a car" />
                    <Image src={twitterIcon} className='icon' alt="rent a car" />
                </div>
                <div className='separate' />
                <div className='contact'>
                    <div className='data'>
                        <h1>Información Legal</h1>
                        <p>Políticas y requisitos de renta</p>
                        <p>Formas de pago</p>
                        <p>Aviso de privacidad</p>
                        <p>Preguntas frecuentes</p>
                    </div>
                    <div className='data'>
                        <h1>Contáctanos</h1>
                        <p>Reservaciones:</p>
                        <p>333 171 2021 ó 333 945 4500</p>
                        <p>SAN JUAN BOSCO #4783, LOMAS DE GUADALUPE</p>
                    </div>
                </div>
                <div className='separate' />
                <div className='payment-icons'>
                    <Image src={visaIcon} alt="rent a car" />
                    <Image src={mastercardIcon} alt="rent a car" />
                    <Image src={americanIcon} alt="rent a car" />
                </div>
            </div>
        </div>
    )
}
