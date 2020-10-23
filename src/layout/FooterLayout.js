import React, { Component } from 'react'
import { Layout } from 'antd'


const { Footer } = Layout
class FooterLayout extends Component {
    render() {
        return (
            <>
                <Footer>
                    <h5>copyright &copy; 2020 by Suryo Prasetyo W</h5>
                </Footer>
            </>
        )
    }
}

export default FooterLayout