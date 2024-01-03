import React from 'react'
import './Input.css'

interface InputProps {
    onChange: React.ChangeEventHandler<HTMLInputElement>
    type: string
    name: string
    required: boolean
    placeholder: string
    value: string | number,
    className?: string
    label?: string
}

export const Input: React.FunctionComponent<InputProps> = ({ onChange, type, required = true, name, placeholder, value, className, label }) => {
    return (
        <div className={`${className} input--Container`}>
            {label && <label className='input--Label' htmlFor={name}>{label}</label>}
            <input name={name} className={`input--Input`} value={value} placeholder={placeholder} onChange={onChange} type={type} required={required} />
        </div>
    )
}
