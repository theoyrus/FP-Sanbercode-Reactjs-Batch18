import React, { Component } from 'react'
import { Layout, Breadcrumb } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import { AuthContext } from '../AuthContext'

const { Content } = Layout;

const titleCase = (str) => {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
}

class ContentLayout extends Component {
    state = {
        auth: null,
    }
    static contextType = AuthContext

    componentDidUpdate() {
        const [auth,] = this.context
        if (this.state.auth === null) {
            this.setState({ auth })
            console.log(auth)
        }
    }

    render() {
        // console.log(this.props)
        const { pathname } = this.props.location
        // const menuTitle = titleCase(pathname.replace('/', ''))
        const menuPath = '/' + pathname.split('/')[1]
        let menuTitle = titleCase(pathname.split('/')[1])
        menuTitle = menuTitle.split('-').join(' ')
        let movie_title = pathname.split('/')[3]
        let styleML = 0

        const { auth } = this.state
        styleML = (auth !== null && auth.hasOwnProperty('token')) ? '200px' : 0

        // const subMenuTitle = titleCase(pathname.split('/').join('')))
        return (
            <>
                {/* <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}> */}
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, marginLeft: styleML }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <NavLink to={menuPath}>{menuTitle}</NavLink>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{movie_title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        {this.props.children}
                    </div>
                </Content>
            </>
        )
    }
}

export default withRouter(ContentLayout)