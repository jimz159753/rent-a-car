import React from 'react'
import './Drawer.css'

export interface DrawerProps {
    title: string;
    isOpen: boolean;
    setOpen: (e: boolean) => void;
    children?: React.ReactNode;
}

export const Drawer = ({ isOpen, children, setOpen, title }: DrawerProps) => {
    return (
        <div className={`drawer-container ${isOpen && 'drawer-open'}`}>
            <h1 className='font-semibold text-2xl'>{title}</h1>
            {children}
        </div>
    )
}
