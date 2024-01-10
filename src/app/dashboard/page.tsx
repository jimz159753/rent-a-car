'use client'
import React, { useContext } from 'react'
import { Layout, Menu, theme } from 'antd';
import './page.css'
import Link from 'next/link';
import { Context } from '../layout';
import { RoleEnum } from './administration/interfaces/user.interface';


interface DashboardProps {
    children: React.ReactNode
}

const { Header, Content, Footer, Sider } = Layout;


const Dashboard = (props: DashboardProps) => {
    const [user, setUser] = useContext(Context)
    const links = ['information', 'administration', 'clients', 'documents', 'vehicles', 'rents']
    const items = ['Informacion', 'Administracion', 'Clientes', 'Documentos', 'Vehiculos', 'Alquileres'].map(
        (title, index) => (title !== 'Administracion' && user.role === RoleEnum.EMPLOYEE ? {
            key: String(index + 1),
            label: <Link href={`/dashboard/${links[index]}`}>
                <p>{title}</p>
            </Link>
            ,
        }
            : user.role === RoleEnum.ADMIN ?
                {
                    key: String(index + 1),
                    label: <Link href={`/dashboard/${links[index]}`}>
                        <p>{title}</p>
                    </Link>
                    ,
                }
                :
                null),
    );

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout className='dashboard'>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
            >
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content>
                    <section className='flex justify-center'>
                        {props.children}
                    </section>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Jimz Designs ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    )
}

export default Dashboard