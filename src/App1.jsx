
import React, {useState} from 'react';
import {
    AppstoreOutlined, CoffeeOutlined,
    LaptopOutlined,
    MailOutlined,
    NotificationOutlined,
    SettingOutlined,
    UserOutlined
} from '@ant-design/icons';
import {Layout, Menu, Switch, theme} from 'antd';
import MyHeader from "./components/MyHeader.jsx";
import {Outlet} from "react-router-dom";



const {Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('welcome', 'sub1', <CoffeeOutlined />, [
        getItem('Option 1', '1'),
        getItem('Option 2', '2'),
        getItem('Option 3', '3'),
        getItem('Option 4', '4'),
    ]),
    getItem('Manage passengers', 'sub2', <UserOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
];


const App1 = () => {

    const [theme, setTheme] = useState('dark');
    const [current, setCurrent] = useState('1');
    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
    };
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <Layout>
            <MyHeader/>
            <Content
                style={{
                    padding: '0 50px',
                }}
            >

                <Layout
                    style={{
                        padding: '24px 0',
                    }}
                >
                    <Sider
                        width={260}
                    >
                        <Switch
                            checked={theme === 'dark'}
                            onChange={changeTheme}
                            checkedChildren="Dark"
                            unCheckedChildren="Light"
                        />
                        <br />
                        <br />
                        <Menu
                            theme={theme}
                            onClick={onClick}
                            style={{
                                width: 256,
                            }}
                            defaultOpenKeys={['sub1']}
                            selectedKeys={[current]}
                            mode="inline"
                            items={items}
                        />
                    </Sider>
                    <Content
                        style={{
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Outlet/>
                    </Content>
                </Layout>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©2023 Created by Ant UED
            </Footer>
        </Layout>
    );
};
export default App1;