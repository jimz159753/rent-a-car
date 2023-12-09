import React from 'react'
import Image from 'next/image'
import './Categories.css'

export const Categories = () => {
    const categories = [
        {
            title: 'Autos',
            image: require('../../../../public/cars.png'),
        },
        {
            title: `SUV's & Geep`,
            image: require('../../../../public/suvs_geep.png'),
        },
        {
            title: 'Vans & Truck',
            image: require('../../../../public/vans_truck.png'),
        },
    ]

    return (
        <div id='cars' className='categories'>
            {
                categories.map(category => <div key={category.title} className='card'>
                    <Image src={category.image} alt="rent a car" />
                    <p>{category.title}</p>
                </div>)
            }
        </div>
    )
}
