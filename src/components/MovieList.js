import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../Config'

import { Table, Input, Button, Space } from 'antd';
// import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../AuthContext';


const MovieList = () => {
    const [userData,] = useContext(AuthContext)
    const recordKosong = {
        description: '', //string
        duration: '', //integer
        genre: '', //string
        image_url: '', //string
        rating: '', //integer
        review: '', //string
        title: '', //string
        year: '', //integer
    }
    const [modulNama, modulPath] = ['Movie', 'data-movie']
    const [model, setModel] = useState(null)
    const [kataCari, setKataCari] = useState(null)
    const [kolomCari, setKolomCari] = useState(null)
    const [record, setRecord] = useState(recordKosong)
    const history = useHistory()

    useEffect(() => {
        if (model === null) {
            loadModel()
        }
    })

    const loadModel = () => {
        axios.get(`${API_URL}/${modulPath}`)
            .then(res => {
                let model
                let dataModel = []
                res.data.map((item, idx) => {
                    model = { key: idx, ...item } // add unique key handle expandable
                    return dataModel.push(model)
                })
                setModel(dataModel)
                console.log('executed load Model')
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const handleEdit = (props) => {
        // console.log(ev)
        let { id } = props
        history.push(`/manage-movie/edit/${id}`)
    }

    const handleDelete = (props) => {
        console.log(props)
        let id = props.id
        let movieNama = model.filter(el => el.id == id)[0]?.title
        console.log(movieNama)
        let isHapus = window.confirm(`Apakah yakin akan menghapus movie ${movieNama}?`)
        if (isHapus) {
            setRecord(recordKosong)
            axios.delete(`${API_URL}/${modulPath}/${id}`, { headers: { "Authorization": `Bearer ${userData.token}` } })
                .then(res => {
                    setModel(null)
                })
                .catch(err => {
                })
        }
    }

    let searchInput = ''

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
              </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
              </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setKataCari(selectedKeys[0])
        setKolomCari(dataIndex)
    };

    const handleReset = clearFilters => {
        clearFilters();
        setKataCari('')
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '30%',
            sorter: (a, b) => a.title.length - b.title.length,
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('title'),
        },
        // {
        //     title: 'Description',
        //     dataIndex: 'description',
        //     key: 'description',
        //     sorter: (a, b) => a.description.length - b.description.length,
        //     sortDirections: ['descend', 'ascend'],
        //     ...getColumnSearchProps('description'),
        // },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            sorter: (a, b) => a.duration - b.duration,
            sortDirections: ['descend', 'ascend'],
            render(text, record) {
                return {
                    props: {
                        style: {}
                    },
                    children: <span>{text} minutes</span>
                };
            },
            ...getColumnSearchProps('duration'),
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
            ...getColumnSearchProps('genre'),
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('rating'),
        },
        {
            title: 'Review',
            dataIndex: 'review',
            key: 'review',
            ...getColumnSearchProps('review'),
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            sorter: (a, b) => a.year - b.year,
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('year'),
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (idData, record) => (
                <>
                    <ButtonAction onClick={handleEdit} record={record} text="Edit" size={"small"} />
                    <ButtonAction onClick={handleDelete} record={record} text="Delete" danger size={"small"} />
                </>
            ),
        },
    ];
    return (
        <>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                    rowExpandable: record => record.name !== 'Not Expandable',
                }}
                dataSource={model} />
        </>
    )
}

const ButtonAction = ({ text, record, onClick, ...rest }) => {
    const handleClick = () => {
        // console.log(record)
        // send to parameter
        onClick(record);
    }
    return (
        <>
            <Button {...rest} onClick={handleClick}>{text}</Button>
        </>
    )
}


export default MovieList