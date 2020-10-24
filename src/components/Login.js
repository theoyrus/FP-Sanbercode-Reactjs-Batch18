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
    const history = useHistory()
    const [isLogin, setAuth] = useContext(AuthContext)
    const [authData, setAuthData] = useState({ uname: '', passwd: '' })

    const handleSubmit = (ev) => {
        ev.preventDefault()
        if (authData.uname !== '' && authData.passwd !== '') {
            setAuth(authData)
            // simpan state ke localstorage agar tidak hilang walau react diload ulang
            localStorage.setItem('authData', JSON.stringify(authData))
            history.push('/')
        }
    }

    const [form] = Form.useForm();

    const handleChange = (ev) => {
        let { name, value } = ev.target
        setAuthData({ ...authData, [name]: value })
    }

    const handleReset = () => {
        setAuthData({ uname: '', passwd: '' })
    }

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

const onFinish = values => {
    console.log('Received values of form: ', values);
};

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
    return (
        <>
            <Form
                name="login-form"
                className="login-form"
                layout="vertical"
                initialValues={{ key: true }}
                onFinish={onFinish}
                style={{
                    margin: "0 auto",
                    width: "50%",
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name="username"
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