import React, { Component } from 'react'
import { Layout, Breadcrumb } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';


const { Content } = Layout;

const titleCase = (str) => {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
}

class ContentLayout extends Component {
    render() {
        // console.log(this.props)
        const { pathname } = this.props.location
        // const menuTitle = titleCase(pathname.replace('/', ''))
        const menuPath = '/' + pathname.split('/')[1]
        const menuTitle = titleCase(pathname.split('/')[1])
        const movie_title = pathname.split('/')[3]
        // const subMenuTitle = titleCase(pathname.split('/').join('')))
        return (
            <>
                {/* <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}> */}
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, marginLeft: "200px" }}>
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