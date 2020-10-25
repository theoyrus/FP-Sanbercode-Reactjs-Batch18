import React, { useContext, useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { AuthContext } from '../AuthContext'
import { API_URL } from '../Config'
import axios from 'axios'
import { Form, Input, InputNumber, Checkbox, Button, Rate, notification } from 'antd'
import {
    FileOutlined,
} from '@ant-design/icons'


const GameEditor = () => {
    const recordKosong = {
        id: null,
        genre: '', //string
        image_url: '', //string
        singlePlayer: 0, // boolean (true or false) / (1 or 0)
        multiplayer: 0, //boolean (true or false) / (1 or 0)
        name: '', //string
        platform: '', //string
        release: '', //string
    }
    const [modulNama, modulPath] = ['Game', 'data-game']
    const [respon, setRespon] = useState(null);
    const [record, setRecord] = useState(null)
    const history = useHistory()
    const [userData,] = useContext(AuthContext)
    const { id } = useParams()
    const [form] = Form.useForm();

    useEffect(() => {
        if (id === undefined && record === null) {
            console.log('add new')
            getRecord(0)
        }
        if (record === null) {
            getRecord(id)
        }
    })

    const getRecord = (id) => {
        console.log('get record ', id)
        axios.get(`${API_URL}/${modulPath}/${id}`)
            .then(res => {
                let recordSet = res.data
                recordSet = { ...recordSet }
                setRecord(res.data)
                form.setFieldsValue(recordSet)
                // fillForm();
                console.log(record)
                console.log('executed load Model', form.getFieldsValue())
            })
            .catch(err => {
                console.log(err.message)
                setRecord(recordKosong)
            })
    }

    const handleSubmit = (values) => {
        let recordData = values
        if (record.id === null) {
            // tambah
            axios.post(`${API_URL}/${modulPath}`, recordData, { headers: { "Authorization": `Bearer ${userData.token}` } })
                .then(res => {
                    openNotificationWithIcon('success', 'Success', 'Data success added')
                    setRecord(recordKosong)
                    // redirect
                    history.push('/manage-game')
                })
                .catch(err => {
                })
        } else {
            // update
            axios.put(`${API_URL}/${modulPath}/${record.id}`, recordData, { headers: { "Authorization": `Bearer ${userData.token}` } })
                .then(res => {
                    openNotificationWithIcon('success', 'Success', 'Data success updated')
                    setRecord(recordKosong)
                    // redirect
                    history.push('/manage-game')
                })
                .catch(err => {
                })
        }
    }

    const openNotificationWithIcon = (type, title, message) => {
        notification[type]({
            message: title,
            description:
                message,
        });
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

    return (
        <>
            {
                record !== null && (
                    <>
                        <Form
                            form={form}
                            name="login-form"
                            className="login-form"
                            layout="vertical"
                            initialValues={recordKosong}
                            // fields={record}
                            onFinish={handleSubmit}
                            style={{
                                margin: "0 auto",
                                width: "50%",
                            }}
                            validateMessages={validateMessages}
                        >
                            <Form.Item
                                name="name"
                                label="Game Name"
                                rules={[{
                                    required: true,
                                }]}
                            >
                                <Input prefix={<FileOutlined className="site-form-item-icon" />} placeholder="" />
                            </Form.Item>
                            <Form.Item
                                name="platform"
                                label="Game Platform"
                                rules={[{
                                    required: true,
                                }]}
                            >
                                <Input.TextArea prefix={<FileOutlined className="site-form-item-icon" />} placeholder="" />
                            </Form.Item>
                            <Form.Item
                                name="release"
                                label="Release Year"
                                rules={[{
                                    required: true,
                                }]}
                            >
                                <InputNumber prefix={<FileOutlined className="site-form-item-icon" />} placeholder="" />
                            </Form.Item>
                            <Form.Item name="singlePlayer" label="Single Player?" valuePropName="checked">
                                <Checkbox
                                    value="1"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                    checked={form.getFieldValue('singlePlayer') == 1}
                                >Yes</Checkbox>
                            </Form.Item>
                            <Form.Item name="multiplayer" label="Multi Player?" valuePropName='checked'>
                                <Checkbox
                                    value="1"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                    checked={form.getFieldValue('multiplayer') == 1}
                                >Yes</Checkbox>
                            </Form.Item>
                            <Form.Item
                                name="genre"
                                label="Game Genre"
                                rules={[{
                                    required: true,
                                }]}
                            >
                                <Input prefix={<FileOutlined className="site-form-item-icon" />} placeholder="" />
                            </Form.Item>

                            <Form.Item
                                name="image_url"
                                label="Game Image Cover"
                                rules={[{
                                    required: true,
                                }]}
                            >
                                <Input prefix={<FileOutlined className="site-form-item-icon" />} placeholder="" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="buttonSave">Save</Button>
                                <Button type="default" htmlType="button" className="buttonBack">
                                    <Link to="/manage-game">Back</Link>
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )
            }

        </>
    )
}

export default GameEditor