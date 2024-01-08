'use client'
import React, { useEffect, useState } from 'react'
import Dashboard from '../page'
import { ListTable } from '@/app/components/ui/ListTable'
import { Button } from '@/app/components/ui/Button'
import { Drawer } from '@/app/components/ui/Drawer'
import { Form } from './form/form'
import Image from 'next/image'
import { ActionEnum, IDropdownOption, IUser, RoleEnum } from './interfaces/user.interface'
import './page.css'
import { addUser, getUsers, removeUser, updateUser } from './actions/actions'
import { ActionMeta } from 'react-select'

const Clients = <T extends object>() => {
    const [data, setData] = useState<IUser[]>()
    const [isOpen, setOpen] = useState(false)
    const [id, setId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [dropRole, setDropRole] = useState<any | null>(null)
    const [password, setPassword] = useState<string>('')
    const [action, setAction] = useState<ActionEnum>(ActionEnum.ADD)
    const editIcon = require('../../../../public/edit.png')
    const removeIcon = require('../../../../public/remove.png')

    const columns = [{
        header: () => 'Id',
        cell: (cell: any) => cell.renderValue(),
        accessorKey: '_id'
    },
    {
        header: () => 'Nombre',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'name'
    },
    {
        header: () => 'Email',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'email'
    },
    {
        header: () => 'Teléfono',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'phone'
    },
    {
        header: () => 'Dirección',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'address'
    },
    {
        header: () => 'Role',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'role'
    },
    {
        header: () => 'Fecha',
        cell: (cell: any) => <p>{cell.renderValue()}</p>,
        accessorKey: 'timestamp'
    },
    {
        id: 'Action',
        header: () => 'Acción',
        cell: (cell: any) => <div className='flex justify-between'>
            <Button onClick={(e) => rowUpdateDrawer(cell.row.index, cell.row.original._id)}>
                <Image src={editIcon} width={25} height={25} alt="rent a car" />
            </Button>
            <Button onClick={(e) => deleteUser(cell.row.original._id)}>
                <Image src={removeIcon} width={25} height={25} alt="rent a car" />
            </Button>
        </div>,
    },
    ]

    const rowUpdateDrawer = (index: number, id: string) => {
        setAction(ActionEnum.UPDATE)
        if (data) {
            const { name, email, phone, address, role } = data[index]
            const roleOption = { value: role, label: role }
            setId(id)
            setName(name)
            setEmail(email)
            setPhone(phone)
            setAddress(address)
            setDropRole(roleOption)
        }
        setOpen(true)
    }

    const rowAddDrawer = () => {
        setAction(ActionEnum.ADD)
        setName('')
        setEmail('')
        setPhone('')
        setAddress('')
        setDropRole(null)
        setPassword('')
        setOpen(true)
    }

    const registerUser = async (user: IUser) => {
        await addUser(user)
        await loadUsers()
    }

    const loadUsers = async () => {
        const data = await getUsers()
        setData(data)
    }

    const editUser = async (id: string, updatedUser: IUser) => {
        await updateUser(id, updatedUser)
        await loadUsers()
    }

    const deleteUser = async (id: string) => {
        await removeUser(id)
        await loadUsers()
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const RoleOnChange = (newValue: any, actionMeta: ActionMeta<T>) => {
        setDropRole(newValue)
    }

    const handleAction = () => {
        const user = {
            name,
            email,
            phone,
            address,
            role: dropRole.value,
            password
        }
        if (action === ActionEnum.ADD) {
            registerUser(user)
            setName('')
            setEmail('')
            setPhone('')
            setAddress('')
            setDropRole(null)
            setPassword('')
        } else {
            editUser(id, user)
        }
    }

    return (
        <Dashboard>
            {data && <ListTable data={data} columns={columns} rowAddDrawer={rowAddDrawer} />}
            <Drawer isOpen={isOpen} setOpen={setOpen} title={action === ActionEnum.ADD ? 'Agregar Usuario' : 'Actualizar Usuario'} >
                <Form
                    setOpen={setOpen}
                    name={name}
                    email={email}
                    phone={phone}
                    address={address}
                    dropRole={dropRole}
                    password={password}
                    setName={setName}
                    setEmail={setEmail}
                    setPhone={setPhone}
                    setAddress={setAddress}
                    setPassword={setPassword}
                    action={action}
                    handleAction={handleAction}
                    RoleOnChange={RoleOnChange}
                />
            </Drawer>
        </Dashboard >
    )
}

export default Clients