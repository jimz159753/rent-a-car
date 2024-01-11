'use client'
import React from 'react'
import { Layout, theme } from 'antd';
import './layout.css'
import { SideMenu } from '../components/ui/SideMenu';

interface DashboardProps {
    children: React.ReactNode
}

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = (props: DashboardProps) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className='dashboard' hasSider>
            <Sider
            >
                <SideMenu />
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