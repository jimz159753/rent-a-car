import React from 'react'

interface InputProps {
    onChange: React.ChangeEventHandler<HTMLInputElement>
    type: string
    name: string
    required: boolean
    placeholder: string
}

export const Input: React.FunctionComponent<InputProps> = ({ onChange, type, required = true, name, placeholder }) => {
    return (
        <input name={name} placeholder={placeholder} onChange={onChange} type={type} required={required} />
    )
}
