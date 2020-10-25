import React from 'react'
import { AuthContext } from '../AuthContext'
import { Menu, Switch, Divider, Layout } from 'antd';
import {
    VideoCameraOutlined,
    FileAddOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const { SubMenu } = Menu;
const { Sider } = Layout;

class SidebarLayout extends React.Component {
    // read context in Class Component
    static contextType = AuthContext
    state = {
        mode: 'inline',
        theme: 'light',
        collapsed: false,
        auth: null,
    };

    componentDidUpdate() {
        const [auth,] = this.context
        if (this.state.auth === null) {
            this.setState({ auth })
        }
    }

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
        const { collapsed, auth } = this.state;
        // console.log('AuthContext', this.state)
        return (
            <>
                {
                    (auth !== null && auth.hasOwnProperty('token')) && (
                        <>
                            {/* <Layout style={{ minHeight: '100vh' }}> */}
                            <Sider collapsed={collapsed} onCollapse={this.onCollapse} style={{
                                overflow: 'auto',
                                height: '100vh',
                                position: 'fixed',
                                left: 0,
                                marginTop: "60px",
                            }}>
                                <Menu theme="dark" defaultSelectedKeys={['authMenu']} defaultOpenKeys={['authMenu']} mode="inline">
                                    <SubMenu key="authMenu" icon={<UserOutlined />} title={`Hi, ${auth.user.name}`}>
                                        <Menu.Item key="userInfoName">
                                            <NavLink to="/profile">
                                                Change Password
                                            </NavLink>
                                        </Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="manageMovie" icon={<FileAddOutlined />} title="Movie Manager">
                                        <Menu.Item key="listMovie">
                                            <NavLink to="/manage-movie">
                                                Movie List
                                        </NavLink>
                                        </Menu.Item>
                                        <Menu.Item key="addMovie">
                                            <NavLink to="/manage-movie/add">
                                                Add New
                                        </NavLink>
                                        </Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="manageGame" icon={<FileAddOutlined />} title="Game Manager">
                                        <Menu.Item key="listGame">
                                            <NavLink to="/manage-game">
                                                Game List
                                        </NavLink>
                                        </Menu.Item>
                                        <Menu.Item key="addGame">
                                            <NavLink to="/manage-game/add">
                                                Add New
                                        </NavLink>
                                        </Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            {/* </Layout> */}
                        </>
                    )
                }
            </>
        );
    }
}
export default SidebarLayout