import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DataService from "@/lib/DataService";
import { LockOutlined } from "@ant-design/icons";
import { hide, show } from "@/state/loading/loadingSlice";
import { AUTH_PATH } from "../../constant/urls";
import {
    App,
    Button,
    Form,
    Grid,
    Input,
    theme,
    Typography,
} from "antd";
import { useDispatch } from "react-redux";
import { generateMessages } from "../../lib/helper";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function ResetPassword() {
    const [seachParams, setSeachParams] = useSearchParams();
    const email = seachParams.get("email");
    const decode = decodeURIComponent(seachParams.get("token"));
    const { token } = useToken();
    const dispatch = useDispatch()
    const { message } = App.useApp();
    const navigate = useNavigate()

    const screens = useBreakpoint();
    const styles = {
        container: {
            margin: "0 auto",
            padding: screens.md
                ? `${token.paddingXL}px`
                : `${token.sizeXXL}px ${token.padding}px`,
            width: "380px",
        },
        footer: {
            marginTop: token.marginLG,
            textAlign: "center",
            width: "100%",
        },
        forgotPassword: {
            float: "right",
        },
        header: {
            marginBottom: token.marginXL,
        },
        section: {
            alignItems: "center",
            backgroundColor: token.colorBgContainer,
            display: "flex",
            height: "auto",
            padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
        },
        text: {
            color: token.colorTextSecondary,
        },
        title: {
            fontSize: screens.md
                ? token.fontSizeHeading2
                : token.fontSizeHeading3,
        },
    };

    const onFinish = (values) => {
        dispatch(show())
        DataService.post(AUTH_PATH.resetPassword, {
            token: decode,
            email: email,
            password: values.password,
        }).then((res) => {
            message.open({
                type: res.data.isSucceed ? "success" : "error",
                content: generateMessages(res.data.messages),
                duration: 5
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
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            x="0.464294"
                            width="24"
                            height="24"
                            rx="4.8"
                            fill="#1890FF"
                        />
                        <path
                            d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z"
                            fill="white"
                        />
                        <path
                            d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z"
                            fill="white"
                        />
                        <path
                            d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z"
                            fill="white"
                        />
                    </svg>

                    <Title style={styles.title}>Sign in</Title>
                    <Text style={styles.text}>Reset your password now.</Text>
                </div>
                <Form
                    name="normal_login"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="password"
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

                    <Form.Item style={{ marginBottom: "0px" }}>
                        <Button block="true" type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <div style={styles.footer}>
                            <Text style={styles.text}>
                                Don't have an account?
                            </Text>{" "}
                            <Link onClick={() => navigate("/login")}>
                                Log in now
                            </Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}
