import React from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select';
import './Dropdown.css'

interface DropdownProps<T extends object> {
    label: string;
    options: T[];
    onChange?: (newValue: SingleValue<T>, actionMeta: ActionMeta<T>) => void
    name: string;
    value?: T | null;
    placeholder: string;
    defaultValue?: T;
}

export const Dropdown = <T extends object>({
    options,
    placeholder,
    value,
    onChange,
    label,
    name,
    defaultValue

}: DropdownProps<T>) => {
    return (
        <div className=' dropdown--Container'>
            <label className='dropdown--Label' htmlFor="dropdown">{label}</label>
            <Select
                name={name}
                className='dropdown-Input'
                options={options}
                value={value}
                onChange={onChange}
                defaultValue={defaultValue}
                placeholder={placeholder} />
        </div>
    )
}
