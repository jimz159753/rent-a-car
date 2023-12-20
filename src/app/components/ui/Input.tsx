import React from 'react'

interface InputProps {
    onChange: React.ChangeEventHandler<HTMLInputElement>
    type: string
    name: string
    required: boolean
    placeholder: string
    value: string,
    className?: string
}

export const Input: React.FunctionComponent<InputProps> = ({ onChange, type, required = true, name, placeholder, value, className }) => {
    return (
        <input name={name} className={className} value={value} placeholder={placeholder} onChange={onChange} type={type} required={required} />
    )
}
