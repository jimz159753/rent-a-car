import React from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select';
import './Dropdown.css'

interface DropdownProps<T extends object> {
    id: string;
    label: string;
    options: T[];
    onChange?: (newValue: SingleValue<T>, actionMeta: ActionMeta<T>) => void
    name: string;
    value: T;
    placeholder: string;
    defaultValue?: T | null;
}

export const Dropdown = <T extends object>({
    options,
    placeholder,
    value,
    onChange,
    label,
    name,
    defaultValue,
    id

}: DropdownProps<T>) => {
    return (
        <div className=' dropdown--Container'>
            <label className='dropdown--Label' htmlFor="dropdown">{label}</label>
            <Select
                instanceId={id}
                name={name}
                className='dropdown-Input'
                classNamePrefix="react-select"
                options={options}
                value={value}
                onChange={onChange}
                defaultValue={defaultValue}
                placeholder={placeholder} />
        </div>
    )
}
