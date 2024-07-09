import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hide, show } from "@/state/loading/loadingSlice";
import { generateMessages, setLocal } from "@/lib/helper";
import {
    App,
    Button,
    Form,
    Input,
} from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import DataService from "@/lib/DataService";
import { AUTH_PATH } from "../../constant/urls";
import "./changePassword.css"

function ChangePassword() {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.user)

    const { message } = App.useApp();

    const onFinish = (values) => {
        dispatch(show());
        DataService.post(AUTH_PATH.changePassword, {
            userId: user?.id,
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
        })
            .then((res) => {
                const isSucceed = res.data.isSucceed;
                message.open({
                    type: isSucceed ? "success" : "error",
                    content: isSucceed
                        ? "Cập nhật mật khẩu thành công"
                        : generateMessages(res.data.messages),
                    duration: 5,
                });
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(hide());
            });
    };

    return (
        <Form
            initialValues={{
                remember: true,
                email: user?.userName,
            }}
            onFinish={onFinish}
            layout="vertical"
            style={{ width: "30%" }}
            name="change-password"
        >
            <Form.Item name="email" label="Tên đăng nhập">
                <Input prefix={<MailOutlined />} placeholder="Email" disabled />
            </Form.Item>
            <Form.Item
                name="currentPassword"
                rules={[
                    {
                        required: true,
                        message: "Please input your Password!",
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Mật khẩu hiện tại"
                />
            </Form.Item>
            <Form.Item
                name="newPassword"
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
                    placeholder="Mật khẩu mới"
                />
            </Form.Item>
            <Form.Item
                name="confirmNewPassword"
                dependencies={["newPassword"]}
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
                                getFieldValue("newPassword") === value
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
                    placeholder="Nhập lại mật khẩu mới"
                    prefix={<LockOutlined />}
                />
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
                <Button block="true" type="primary" htmlType="submit">
                    Cập nhật
                </Button>
            </Form.Item>
        </Form>
    );
}

export default ChangePassword;
