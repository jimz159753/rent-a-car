import React from 'react'

interface ButtonProps {
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FunctionComponent<ButtonProps> = ({ children, onClick }) => {
    return (
        <button onClick={onClick} >{children}</button>
    )
}
