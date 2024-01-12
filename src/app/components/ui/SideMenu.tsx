'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { Menu, type MenuProps, } from 'antd';
import { IUser, RoleEnum } from '@/app/dashboard/administration/interfaces/user.interface';

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

export const SideMenu = () => {
    const [userStringObj, setUserStringObj] = useState('')
    const user: IUser = userStringObj && JSON.parse(userStringObj)
    const links = ['information', 'administration', 'clients', 'documents', 'vehicles', 'rents']
    const items: MenuItem[] = ['Información', 'Administración', 'Clientes', 'Documentos', 'Vehículos', 'Alquileres'].map(
        (title, index) => (user && title !== 'Administración' && user.role === RoleEnum.EMPLOYEE ?
            getItem(<Link key={title} href={`/dashboard/${links[index]}`}>
                <p>{title}</p>
            </Link>, index)
            : user && user.role === RoleEnum.ADMIN ?
                getItem(<Link key={index} href={`/dashboard/${links[index]}`}>
                    <p>{title}</p>
                </Link>, index)
                :
                null),
    );

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user)
            setUserStringObj(user)
    }, [])
    return (
        <div>{user && <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} items={items} />}</div>
    )
}
