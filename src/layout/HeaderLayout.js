import React, { useContext } from 'react'
import { Layout, Menu, Image } from 'antd';
import imgLogo from '../img/logo.png'
import { AuthContext } from '../AuthContext'
import { Link, NavLink, useLocation } from 'react-router-dom'

const { Header } = Layout;
const HeaderLayout = () => {
    // const { AppAuthContext } = useState(AppAuthContext)
    const [isLogin, setAuth] = useContext(AuthContext)
    // console.log(isLogin)

    const location = useLocation()
    console.log(location)

    const handleLogout = () => {
        localStorage.removeItem('authData')
        setAuth(false)
    }

    let selectedKeys = location.pathname

    let menuMovieEditor = isLogin !== false ? (<li><Link to="/movie-editor">Movie List Editor</Link></li>) : ''
    let buttonAuth = isLogin ? (<li><Link onClick={handleLogout} to="/">Logout</Link></li>) : (<li><Link to="/login">Login</Link></li>)
    return (
        <>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo">
                    <Image src={imgLogo} width="40%" />
                    <h1 style={{ marginLeft: "5px" }}>MuviPlay!</h1>
                </div>
                <Menu style={{ justifyContent: "flex-end", display: "flex" }} theme="dark" mode="horizontal" color="red" selectedKeys={[selectedKeys]}>
                    <Menu.Item key="/movies">
                        <NavLink to="/movies">Movies</NavLink>
                    </Menu.Item>
                    <Menu.Item key="/games">
                        <NavLink to="/games">Games</NavLink>
                    </Menu.Item>
                    <Menu.Item key="/login">
                        <NavLink to="/login">Login</NavLink>
                    </Menu.Item>
                </Menu>
            </Header>
        </>
    )
}

export default HeaderLayout