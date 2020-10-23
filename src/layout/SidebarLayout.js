import React from 'react'

import { Menu, Switch, Divider, Layout } from 'antd';
import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider } = Layout;

class SidebarLayout extends React.Component {
    state = {
        mode: 'inline',
        theme: 'light',
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    changeMode = value => {
        this.setState({
            mode: value ? 'vertical' : 'inline',
        });
    };

    changeTheme = value => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    };

    render() {
        const { collapsed } = this.state;
        return (
            <>
                {/* <Layout style={{ minHeight: '100vh' }}> */}
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    marginTop: "60px",
                }}>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<UserOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<UserOutlined />}>
                            Files
                        </Menu.Item>
                    </Menu>
                </Sider>
                {/* </Layout> */}
            </>
        );
    }
}
export default SidebarLayout