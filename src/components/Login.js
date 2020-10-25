import React, { useContext, useState } from 'react'
import { AuthContext } from '../AuthContext'
import { useHistory } from 'react-router-dom'
import { Tabs, Form, Input, Button, Result } from 'antd'
import {
    UserOutlined,
    MailOutlined,
} from '@ant-design/icons'
import axios from 'axios'
import { API_URL } from '../Config'

const { TabPane } = Tabs;

const Login = () => {
    return (
        <>
            <Tabs defaultActiveKey="login" centered>
                <TabPane tab="Log In" key="login">
                    <LoginForm />
                </TabPane>
                <TabPane tab="Register" key="registration">
                    <RegistrationForm />
                </TabPane>
            </Tabs>
        </>
    )
}

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const LoginForm = (params) => {
    const [respon, setRespon] = useState(null);
    const history = useHistory()
    const [, setAuthData] = useContext(AuthContext)

    const doLogin = values => {
        // console.log('Received values of form login: ', values);
        let userData = values
        // return false
        axios.post(`${API_URL}/user-login`, userData)
            .then(res => {
                let authData = res.data
                setAuthData(authData)
                // simpan state ke localstorage agar tidak hilang walau react diload ulang
                localStorage.setItem('authData', JSON.stringify(authData))
                setRespon('success')
                setTimeout(() => {
                    history.push('/')
                }, 2000)
            })
            .catch(err => {
                setRespon('fail', err)
            })
    }

    return (
        <>
        {
            respon === 'success' && (
                <Result
                    status="success"
                    title="Successfully Login"
                    subTitle="Please wait :)"
                    extra={[
                        <>
                        </>,
                    ]}
                />
            )
        }
        {
            respon === 'fail' && (
                <Result
                    status="warning"
                    title="Please check your login data :("
                    extra={[
                        <>
                        </>,
                    ]}
                />
            )
        }
            <Form
                name="login-form"
                className="login-form"
                layout="vertical"
                initialValues={{ key: true }}
                onFinish={doLogin}
                style={{
                    margin: "0 auto",
                    width: "50%",
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{
                        required: true,
                        type: "email",
                    }]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="email@domain.tld" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                </Form.Item>
            </Form>
        </>
    )
}

const RegistrationForm = (params) => {
    const [result, setResult] = useState(null);
    const doRegister = values => {
        // console.log('Received values of form register: ', values);
        let userData = values
        // return false
        axios.post(`${API_URL}/register`, userData)
            .then(res => {
                setResult('success')
            })
            .catch(err => {
                setResult('fail', err)
            })
    }
    return (
        <>
            {
                result === 'success' && (
                    <Result
                        status="success"
                        title="Successfully Registered"
                        subTitle="You can login now :)"
                        extra={[
                            <>
                            </>,
                        ]}
                    />
                )
            }
            {
                result === 'fail' && (
                    <Result
                        status="warning"
                        title="Please check your registration data :("
                        // subTitle="You can login now :)"
                        extra={[
                            <>
                            </>,
                        ]}
                    />
                )
            }
            {
                (result === null || result === 'fail') && (
                    <Form
                        name="registration-form"
                        className="registration-form"
                        layout="vertical"
                        initialValues={{ key: true }}
                        onFinish={doRegister}
                        style={{
                            margin: "0 auto",
                            width: "50%",
                        }}
                        validateMessages={validateMessages}
                    >
                        <Form.Item
                            name="name"
                            label="Your Name"
                            rules={[{
                                required: true,
                            }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Your Email"
                            rules={[{
                                required: true,
                                type: "email",
                            }]}
                        >
                            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="email@domain.tld" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    min: 6,
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="password-confirm"
                            label="Password"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">Register</Button>
                        </Form.Item>
                    </Form>
                )
            }
        </>
    )
}

export default Login