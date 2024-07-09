import React, { useEffect, useState } from "react";
import { App, Button, Flex, Form, Input, Typography } from "antd";
import "./index.css";
import { getUser, getUserName } from "../../lib/helper";
import DataService from "../../lib/DataService";
import { Cookie } from "../../lib/cookies";
import { useDispatch } from "react-redux";
import { show, hide } from "@/state/loading/loadingSlice";

const isChange = (values, user) => {
    const fields = ["phoneNumber", "firstName", "lastName"];
    for (let field of fields) {
        if (values[`${field}`] !== user[`${field}`]) {
            return true;
        }
    }
    return false;
};

export default function Account() {
    const user = getUser();
    const { message } = App.useApp();
    const dispatch = useDispatch()

    const onFinish = (values) => {
        if (isChange(values, user)) {
            dispatch(show())
            DataService.post("Accounts/" + user.id, values).then((res) => {
                if (res.data.isSucceed) {
                    const { data } = res.data;
                    Cookie.setAccessToken(data.accessToken);
                    Cookie.setRefreshToken(data.refreshToken);
                    message.success("Đổi thông tin thành công");
                }
            }).catch((e) => message.error("Đã có lỗi xảy ra xin thử lại sau!"))
            .finally(() => {
                dispatch(hide())

            });
        } else {
            message.success("Đổi thông tin thành công");
        }
    };

    return (
        <>
            <h1>Account</h1>
            <Form
                initialValues={{
                    email: user?.userName,
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    phoneNumber: user?.phoneNumber,
                }}
                onFinish={onFinish}
            >
                <Flex wrap gap={10} className="account">
                    <div style={{ width: "30%" }}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="Email" disabled />
                        </Form.Item>
                        <Form.Item name="userName" label="User Name">
                            <Input
                                placeholder={getUserName(user?.userName)}
                                value={getUserName(user?.userName)}
                                disabled
                            />
                        </Form.Item>
                    </div>
                    <div style={{ width: "30%" }}>
                        <Form.Item
                            name="firstName"
                            label="Họ"
                            rules={[
                                {
                                    required: true,
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
                                },
                            ]}
                        >
                            <Input placeholder="Văn A" />
                        </Form.Item>

                        <Form.Item
                            name="phoneNumber"
                            label="SĐT"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="0123456789" />
                        </Form.Item>
                    </div>
                </Flex>
                <Form.Item
                    style={{
                        marginBottom: "0px",
                        width: "100px",
                        justifySelf: "center",
                    }}
                >
                    <Button block="true" type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
