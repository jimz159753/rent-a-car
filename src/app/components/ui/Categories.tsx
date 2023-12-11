import React from 'react'
import Image from 'next/image'
import './Categories.css'

export const Categories = () => {
    const categories = [
        {
            title: 'Sedan',
            image: require('../../../../public/cars.png'),
        },
        {
            title: `SUV`,
            image: require('../../../../public/suvs_geep.png'),
        },
        {
            title: 'MiniVan',
            image: require('../../../../public/minivan.png'),
        },
        {
            title: 'Van',
            image: require('../../../../public/van.png'),
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
