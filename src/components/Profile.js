import React, { useContext, useState } from 'react'
import { AuthContext } from '../AuthContext'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Result } from 'antd'

import axios from 'axios'
import { API_URL } from '../Config'

const Profile = () => {
    return (
        <>
            <ProfileForm />
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

const ProfileForm = (params) => {
    const history = useHistory()
    const [userAuth,] = useContext(AuthContext)
    const [result, setResult] = useState(null);
    const doChangePass = values => {
        // console.log('Received values of form register: ', values);
        let userData = values
        // return false
        axios.post(`${API_URL}/change-password`, userData, { headers: { "Authorization": `Bearer ${userAuth.token}` } })
            .then(res => {
                setResult('success')
                setTimeout(() => {
                    history.push('/')
                    history.go(0)
                }, 2000)
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
                        title="Password Successfully Updated"
                        subTitle="Dont forget your password :)"
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
                        title="Please check your user data :("
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
                        name="change-pass-form"
                        className="change-pass-form"
                        layout="vertical"
                        initialValues={{ key: true }}
                        onFinish={doChangePass}
                        style={{
                            margin: "0 auto",
                            width: "50%",
                        }}
                        validateMessages={validateMessages}
                    >
                        <Form.Item
                            name="current_password"
                            label="Current Password"
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
                            name="new_password"
                            label="New Password"
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
                            name="new_confirm_password"
                            label="New Password"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your new password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('new_password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The two new passwords that you entered do not match!');
                                    },
                                }),
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">Change Password</Button>
                        </Form.Item>
                    </Form>
                )
            }
        </>
    )
}

export default Profile