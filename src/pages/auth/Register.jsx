import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { generateMessages } from '@/lib/helper';
import { useDispatch, useSelector } from 'react-redux';
import { hide, show } from '@/state/loading/loadingSlice';
import { App, Button, Form, Grid, Input, theme, Typography } from "antd";

import { LockOutlined, MailOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import DataService from '@/lib/DataService';
import { AUTH_PATH } from '@/constant/urls';

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;


const Register = () => {
    const { message } = App.useApp()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useToken();
    const screens = useBreakpoint();
    const { user } = useSelector(store => store.user)

    const styles = {
        container: {
            margin: "0 auto",
            padding: screens.md ? `${token.paddingXL}px` : `${token.paddingXL}px ${token.padding}px`,
            width: "380px"
        },
        forgotPassword: {
            float: "right"
        },
        header: {
            marginBottom: token.marginXL,
            textAlign: "center"
        },
        section: {
            alignItems: "center",
            backgroundColor: token.colorBgContainer,
            display: "flex",
            height: "auto",
            padding: screens.md ? `${token.sizeXXL}px 0px` : "0px"
        },
        signup: {
            marginTop: token.marginLG,
            textAlign: "center",
            width: "100%"
        },
        text: {
            color: token.colorTextSecondary
        },
        title: {
            fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
        }
    };

    if(user){
        navigate("/")
    }

    const onFinish = values => {
        dispatch(show())
        DataService.post(AUTH_PATH.register, values).then(res => {
            const { data } = res

            message.open({
                type: data.isSucceed ? "success" : "error",
                content: generateMessages(data.messages),
                duration: 10
            })

        }).finally(() => {
            dispatch(hide())
        })
    };

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <svg
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect x="0.125" width="32" height="32" rx="6.4" fill="#1890FF" />
                        <path
                            d="M19.3251 4.80005H27.3251V12.8H19.3251V4.80005Z"
                            fill="white"
                        />
                        <path d="M12.925 12.8H19.3251V19.2H12.925V12.8Z" fill="white" />
                        <path d="M4.92505 17.6H14.525V27.2001H4.92505V17.6Z" fill="white" />
                    </svg>

                    <Title style={styles.title}>Đăng ký</Title>
                    <Text style={styles.text}>
                        Tham gia ngay! Tạo một tài khoản để tiếp tục.
                    </Text>
                </div>
                <Form
                    name="normal_signup"
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="firstName"
                        label="Họ"
                        rules={[
                            {
                                required: true,
                                message: "Please input your name!",
                            },
                        ]}
                    >
                        <Input placeholder="Nguyễn" />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label="Tên"
                        rules={[
                            {
                                required: true,
                                message: "Please input your name!",
                            },
                        ]}
                    >
                        <Input placeholder="Văn Anh" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: "email",
                                required: true,
                                message: "Please input your Email!",
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        extra="Password cần tối thiểu 8 ký tự."
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input.Password
                            minLength={8}
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "The new password that you entered do not match!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password 
                            placeholder="Confirm password"
                            prefix={<LockOutlined />}
                        />
                    </Form.Item>
                    <Form.Item
                        name="phonenumber"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Phone Number!",
                                // min: 8
                            },
                        ]}
                    >
                        <Input
                            prefix={<PhoneOutlined />}
                            placeholder="Phone Number"
                        />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: "0px" }}>
                        <Button block type="primary" htmlType="submit">
                            Đăng ký
                        </Button>
                        <div style={styles.signup}>
                            <Text style={styles.text}>Đã có tài khoản?</Text>{" "}
                            <Link onClick={() => navigate("/login")}>Đăng nhập</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
};

export default Register;