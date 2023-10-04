import React, {useState} from 'react';
import {Button, Checkbox, Form, Input, Row, Col, Space, notification} from 'antd';
import {CarOutlined} from "@ant-design/icons";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const Login = () => {

    const [loginForm, setLoginForm] = useState({mobile:'', code: ''})
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const sendCode = () => {
        axios.post("http://localhost:8000/member/member/send-code", {
            mobile: loginForm.mobile
        }).then(response => {
            let data = response.data;
            if (data.success) {
                // 组件库的通知组件
                notification.success({ description: '发送验证码成功！' });
                setLoginForm({...loginForm, code: "8888"});
            } else {
                notification.error({ description: data.message });
            }
        });
    };


    const login = () => {
        axios.post("http://localhost:8000/member/member/login", loginForm).then((response) => {
            let data = response.data;
            console.log(data)
            if (data.success) {
                notification.success({ description: '登录成功！' });
                navigate('/welcome');
                dispatch({type: 'SET', payload: data.content})
            } else {
                notification.error({ description: data.message });
            }
        })
    };

    return (
        <>
            <Row justify={"space-around"} align={"middle"}>
                <Col span={8} className="mt-[120px]">
                    <h1 style={{textAlign: "center"}}><CarOutlined />&nbsp;Travel with Letty</h1>
                    <Form
                        name="basic"
                        // labelCol={{
                        //     span: 8,
                        // }}
                        // wrapperCol={{
                        //     span: 16,
                        // }}
                        // style={{
                        //     maxWidth: 600,
                        // }}
                        initialValues={{
                            remember: true,
                        }}

                        autoComplete="off"
                    >
                        <Form.Item
                            label=""
                            name="mobile"
                            wrapperCol={{
                                offset: 4,
                                span: 14,
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                        >
                            {/*手机号码输入框*/}
                            <Input placeholder="Phone number" value={loginForm.mobile} onChange={
                                e => setLoginForm({...loginForm, mobile: e.target.value})
                            }/>
                        </Form.Item>

                        <Form.Item
                            label=""
                            name="code"
                            wrapperCol={{
                                offset: 4,
                                span: 18,
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your code!',
                                },
                            ]}
                        >
                            <Space direction="horizontal">
                                <Input placeholder="4-digit code" value={loginForm.code}/>
                                <Button type={"primary"} onClick={sendCode}>get code</Button>
                            </Space>


                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" onClick={login}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>

    )
};
export default Login;