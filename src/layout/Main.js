import React, { Component } from 'react'

import { Layout } from 'antd'

import HeaderLayout from './HeaderLayout'
import FooterLayout from './FooterLayout'
import ContentLayout from './ContentLayout'
import SidebarLayout from './SidebarLayout'

const styleLayout = { marginLeft: 200 }
class Main extends Component {
    render() {
        return (
            <>
                {/* <Layout>
                    <Layout>
                        <HeaderLayout />
                        <SidebarLayout />
                        <ContentLayout>
                            {this.props.children}
                        </ContentLayout>
                    </Layout>
                    <FooterLayout />
                </Layout> */}
                <Layout style={{ minHeight: '100vh' }}>
                    <SidebarLayout />
                    <Layout className="site-layout">
                        <HeaderLayout />
                        <ContentLayout>
                            <div className="site-layout-background" style={{ padding: 24 }}>
                                {this.props.children}
                            </div>
                        </ContentLayout>
                        <FooterLayout />
                    </Layout>
                </Layout>
            </>
        )
    }
}

export default Main