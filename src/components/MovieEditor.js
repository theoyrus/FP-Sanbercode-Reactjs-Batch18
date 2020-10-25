import React, { useContext, useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { AuthContext } from '../AuthContext'
import { API_URL } from '../Config'
import axios from 'axios'
import { Form, Input, InputNumber, Select, Button, Rate, notification } from 'antd'
import {
    FileOutlined,
} from '@ant-design/icons'

const { Option } = Select;

const MovieEditor = () => {
    const recordKosong = {
        description: 'desc', //string
        duration: 120, //integer
        genre: [], //string
        image_url: '', //string
        rating: '', //integer
        review: '', //string
        title: '', //string
        year: '', //integer
    }
    const [modulNama, modulPath] = ['Movie', 'data-movie']
    const [respon, setRespon] = useState(null);
    const [record, setRecord] = useState(null)
    const history = useHistory()
    const [userData,] = useContext(AuthContext)
    const { id } = useParams()
    const [form] = Form.useForm();

    useEffect(() => {
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
                    history.push('/manage-movie')
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
                    history.push('/manage-movie')
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
                                name="title"
                                label="Movie Title"
                                rules={[{
                                    required: true,
                                }]}
                            >
                                <Input prefix={<FileOutlined className="site-form-item-icon" />} placeholder="" />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Movie Description/Synopsis"
                                rules={[{
                                    required: true,
                                }]}
                            >
                                <Input.TextArea prefix={<FileOutlined className="site-form-item-icon" />} placeholder="" />
                            </Form.Item>
                            <Form.Item
                                name="year"
                                label="Release Year"
                                rules={[{
                                    required: true,
                                    type: "number",
                                    max: 2999,
                                    min: 1980
                                }]}
                            >
                                <InputNumber prefix={<FileOutlined className="site-form-item-icon" />} placeholder="" />
                            </Form.Item>
                            <Form.Item
                                name="duration"
                                label="Movie Duration"
                                rules={[{
                                    required: true,
                                    type: "number",
                                }]}
                            >
                                <InputNumber prefix={<FileOutlined className="site-form-item-icon" />} placeholder="in minutes" />
                            </Form.Item>
                            {/* <Form.Item
                                name="genre"
                                label="Genre"
                                rules={[{ required: true, message: 'Please select movie genre', type: 'array' }]}
                            >
                                <Select mode="multiple" placeholder="Please select movie genre">
                                    <Option value="RPG">RPG</Option>
                                    <Option value="Action">Action</Option>
                                    <Option value="Adventure">Adventure</Option>
                                    <Option value="Animation">Animation</Option>
                                    <Option value="Comedy">Comedy</Option>
                                    <Option value="Crime">Crime</Option>
                                    <Option value="Documentary">Documentary</Option>
                                    <Option value="Drama">Drama</Option>
                                    <Option value="Family">Family</Option>
                                </Select>
                            </Form.Item> */}
                            <Form.Item
                                name="genre"
                                label="Movie Genre"
                                rules={[{
                                    required: true,
                                }]}
                            >
                                <Input prefix={<FileOutlined className="site-form-item-icon" />} placeholder="" />
                            </Form.Item>
                            <Form.Item
                                name="rating"
                                label="Rating"
                                rules={[{ required: true, message: 'Please select rating' }]}
                            >
                                <Rate
                                    // defaultValue={1}
                                    count={10}
                                    character={({ index }) => {
                                        return index + 1;
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="review"
                                label="Movie Review"
                                rules={[{
                                    required: true,
                                }]}
                            >
                                <Input.TextArea prefix={<FileOutlined className="site-form-item-icon" />} placeholder="" />
                            </Form.Item>

                            <Form.Item
                                name="image_url"
                                label="Movie Image Cover"
                                rules={[{
                                    required: true,
                                }]}
                            >
                                <Input prefix={<FileOutlined className="site-form-item-icon" />} placeholder="" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="buttonSave">Save</Button>
                                <Button type="default" htmlType="button" className="buttonBack">
                                    <Link to="/manage-movie">Back</Link>
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )
            }

        </>
    )
}

export default MovieEditor