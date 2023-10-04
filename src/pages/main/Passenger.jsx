import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal, notification, Popconfirm, Select, Space, Table} from 'antd';
import axios from "axios";
const Passenger = () => {

    // const PASSENGER_TYPE_ARRAY = window.PASSENGER_TYPE_ARRAY

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'ID',
            dataIndex: 'idCard',
            key: 'idCard',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Action',
            key: 'action',
            // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引 function(text, record, index) {}
            render(text, record){
                return (
                    <Space size="middle">
                        {/*<a onClick={onEdit}>{record.name}</a>*/}
                        <a onClick={() => {
                            setIsModalOpen(true)
                            console.log("编辑：" + record.id)
                            setPassenger({id: record.id, name: record.name, idCard: record.name, type: record.type})
                            myForm.setFieldsValue(record);
                        }}>edit</a>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => {
                                axios.delete('http://localhost:8000/member/passenger/delete/' + record.id).then((response) => {
                                    const data = response.data
                                    if (data.success) {
                                        notification.success({description: "Deleted!"})
                                        handleQuery({
                                            page: pagination.current,
                                            size: pagination.pageSize
                                        })
                                    } else {
                                        notification.error({description: data.message})
                                    }
                                })
                                console.log("删除" + record)
                            }}
                            onCancel={cancelDelete}
                            okText="Yes"
                            cancelText="No"
                        >
                            <a>Delete</a>
                        </Popconfirm>
                    </Space>
                )
            }
        },
    ];

    // dataSource of list
    const [passengers,setPassengers] = useState([{
        id: undefined,
        memberId: undefined,
        name: undefined,
        idCard: undefined,
        type: undefined,
        createTime: undefined,
        updateTime: undefined,
    },])

    // for modal
    const [passenger, setPassenger] = useState({
        id: undefined,
        memberId: undefined,
        name: undefined,
        idCard: undefined,
        type: undefined,
        createTime: undefined,
        updateTime: undefined,
    })

    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [myForm] = Form.useForm();

    const [pagination, setPagination] = useState({total:0, current: 1, pageSize: 3})

    // const [loading, setLoading] = useState(false);



    const onAdd = () => {
        // setPassenger({})
        setIsModalOpen(true)
    }

    const cancelDelete = (e) => {
        console.log(e);
        // message.error('Click on No');
    };


    const onTypeChange = (value) => {
        switch (value) {
            case 'student':
                // form.setFieldsValue({
                //     note: 'Hi, man!',
                // });
                setPassenger({...passenger, type: '3'})
                break;
            case 'child':
                setPassenger({...passenger, type: '2'})
                break;
            case 'adult':
                setPassenger({...passenger, type: '1'})
                break;
            default:
        }
    };

    // 点击分页按钮
    const handleTableChange = (data) => {
        console.log("看看自带的分页参数都有啥：" + data.current);
        // handleQuery({
        //     page: data.current,
        //     size: data.pageSize
        // })
        setPagination({...pagination, current:data.current })
    }

    // 发送后端请求带分页参数
    const handleQuery = (param) => {
        // setLoading(true)
        axios.get('http://localhost:8000/member/passenger/query-list', {
            params: {
                page: param.page,
                size: param.size
            }
        }).then((response) => {
            // setLoading(false)
            let data = response.data
            if (data.success) {
                setPassengers(data.content.list)
                setPagination({...pagination, current: param.page})
                setPagination({...pagination,total: data.content.total})
            } else {
                notification.error({description: data.message})
            }
        })

    }

    // const memoPassengers = useMemo(() => {handleQuery({page:1, size:2})}, [])
    //
    // useEffect(() => {
    //     handleQuery({page:1, size: pagination.pageSize })
    // },[])

    useEffect(() => {
        handleQuery({page:pagination.current, size: pagination.pageSize })
    },[pagination.current])

    useEffect(() => {
        if (!isModalOpen) {
            setPassenger({})
        }
    }, [isModalOpen])



    return (
        <>
            <p>
                <Button type="primary" onClick={onAdd}>
                    Create
                </Button>
            </p>

            <Table
                columns={columns} dataSource={passengers} rowKey={(record) => record.idCard }
                pagination={pagination} onChange={handleTableChange}
            />
            {/*<Pagination defaultCurrent={pagination.current} pageSize={pagination.pageSize} total={pagination.total} />;*/}
            <Modal title="Passenger" open={isModalOpen}
                   onOk={() => {
                       console.log('modal ok 按钮')
                        myForm.submit();
                   }}
                   maskClosable={false}
                   destroyOnClose
                   onCancel={() => {
                       setIsModalOpen(false)
                   }}>
                <Form
                    // 表单配合modal一起使用的时候，需要设置这个属性，要不然关了窗口之后不会清空数据
                    preserve={false}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={ async (record) => {
                        // record是几个输入框中的值
                        console.log("表单" + record.name)
                        console.log("表单ID" + record.id)
                        console.log("数据源id" + passenger.id)
                        record.id = passenger.id
                            axios.post('http://localhost:8000/member/passenger/save', record).then(response => {
                                let data = response.data
                                if (data.success) {
                                    notification.success({description: 'Successfully saved'})
                                    setIsModalOpen(false);
                                    handleQuery({
                                        page: pagination.current,
                                        size: pagination.pageSize
                                    })
                                } else {
                                    notification.error({description: data.message})
                                }
                            })
                        setIsModalOpen(false)
                    }}
                    autoComplete="off"
                    form={myForm}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="idCard"
                        name="idCard"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your idCard!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label="Type"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={onTypeChange}
                            allowClear
                        >
                            <Select.Option value="3">student</Select.Option>
                            <Select.Option  value="2">child</Select.Option>
                            <Select.Option  value="1">adult</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default Passenger;
