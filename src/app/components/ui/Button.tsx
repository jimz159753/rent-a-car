import React from 'react'

interface ButtonProps {
    children: React.ReactNode;
    handleClick: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FunctionComponent<ButtonProps> = ({ children, handleClick }) => {
    return (
        <button onClick={handleClick} >{children}</button>
    )
}
