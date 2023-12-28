import React from 'react'

export interface ButtonProps {
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>
    className?: string
}

export const Button: React.FunctionComponent<ButtonProps> = ({ children, onClick, className }) => {
    return (
        <button onClick={onClick} className={className} >{children}</button>
    )
}
