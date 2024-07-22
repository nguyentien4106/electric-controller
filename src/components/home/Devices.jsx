import {
    App,
    Button,
    Flex,
    Form,
    Input,
    Modal,
    Popconfirm,
    Space,
    Table,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { getSubscription,  getUserName } from "../../lib/helper";
import addBtn from "@/assets/add.png";
import deleteBtn from "@/assets/delete.png";
import { useDispatch, useSelector } from "react-redux";
import { add, remove, update } from "../../state/devices/devicesSlice";
import MQTT from "../../lib/MQTT";
import { PING_TOPIC } from "../../constant/settings";
import { useTranslation } from "react-i18next";

const defaultItem = {
    id: "",
    label: "",
    value: "",
};

export default function Devices() {
    const { client } = useSelector((state) => state.mqtt);
    const { devices } = useSelector((state) => state.devices);
    const [selected, setSelected] = useState(defaultItem);
    const [open, setOpen] = useState(false);
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);
    const addDeviceRef = useRef();
    const dispatch = useDispatch();
    const { t } = useTranslation()

    useEffect(() => {
        if (client) {
            client?.on("message", (topic, msg) => {
                if (topic === PING_TOPIC) {
                    const response = JSON.parse(msg);
                    if (response.verified) {
                        dispatch(add({ ...response.device, verified: true }));
                        message.success(t("addNewSucceed"));
                        setOpen(false);
                        setLoading(false);
                    } else if (
                        response.verified !== undefined &&
                        !response.verified
                    ) {
                        message.error(t("addNewFailure"), 15000);
                        setOpen(false);
                        setLoading(false);
                    }
                }
            });
        }

    }, [client]);

    const onFinish = (device) => {
        if (devices.some((dv) => dv.id === device.id)) {
            if (
                devices.some(
                    (dv) => dv.id !== device.id && dv.value === device.value
                )
            ) {
                message.error(t("deviceIdExisted"));
                return;
            }

            if (
                devices.some(
                    (dv) => dv.id !== device.id && dv.label === device.label
                )
            ) {
                message.error(t("deviceNameExisted"));
                return;
            }
            dispatch(update({ ...device }));
            message.success(t("updateSucceed"));
            setOpen(false);
            return;
        }

        if (devices.some((dv) => dv.value === device.value)) {
            message.error(t("deviceIdExisted"));
            return;
        }

        if (devices.some((dv) => dv.label === device.label)) {
            message.error(t("deviceNameExisted"));
            return;
        }

        const lastDevice = devices.at(-1);
        const newDevice = {
            ...device,
            id: lastDevice ? lastDevice.id + 1 : 1,
            verified: false,
        };
        const body = {
            topic: `${getUserName()}/${device.value}`,
            device: newDevice,
        }
        setLoading(true);
        MQTT.subscribe(client, { topic: PING_TOPIC, qos: 2 });
        MQTT.publish(client, getSubscription(PING_TOPIC, 2, body));
    };

    return (
        <div className="devices">
            <Flex justify="end">
                <div
                    onClick={() => {
                        setOpen(true);
                        setSelected(defaultItem);
                    }}
                >
                    <img src={addBtn} height={48} />
                </div>
            </Flex>
            <Table dataSource={devices} rowKey={"id"}>
                <Table.Column
                    key={"label"}
                    title={t("deviceName")}
                    dataIndex={"label"}
                ></Table.Column>
                <Table.Column
                    key={"value"}
                    title={t("deviceId")}
                    dataIndex={"value"}
                ></Table.Column>
                <Table.Column
                    width={"20%"}
                    key={"status"}
                    title={t("status")}
                    render={(item) => {
                        return (
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                            >
                                <path
                                    d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm5.707 8.707-7 7a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L10 14.586l6.293-6.293a1 1 0 0 1 1.414 1.414Z"
                                    fill="#66d154"
                                    className="fill-232323"
                                ></path>
                            </svg>
                        );
                    }}
                ></Table.Column>
                <Table.Column
                    key={"action"}
                    title={t("action")}
                    render={(item) => {
                        return (
                            <Space>
                                <div
                                    className="pointer"
                                    onClick={() => {
                                        setOpen(true);
                                        setSelected(item);
                                    }}
                                >
                                    <svg
                                        className="feather feather-edit"
                                        fill="none"
                                        height="24"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                </div>
                                <div className="pointer">
                                    <Popconfirm
                                        title={t("delete")}
                                        description={t("deleteDeviceQ")}
                                        onConfirm={() => dispatch(remove(item))}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <img src={deleteBtn} height={24} />
                                    </Popconfirm>
                                </div>
                            </Space>
                        );
                    }}
                ></Table.Column>
            </Table>
            {open && (
                <Modal
                    open={open}
                    onCancel={() => {
                        setOpen(false), setLoading(false);
                    }}
                    onOk={() => addDeviceRef.current.click()}
                    confirmLoading={loading}
                >
                    <h3>{t("newDeviceInfo")}</h3>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                            padding: 20,
                        }}
                        initialValues={{
                            value: selected.value,
                            label: selected.label,
                            id: selected.id,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item name="id" hidden>
                            <Input value={selected.id} />
                        </Form.Item>
                        <Form.Item
                            label={t("deviceName")}
                            name="label"
                            rules={[
                                {
                                    required: true,
                                    message: t("requiredFieldError"),
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={t("deviceId")}
                            name="value"
                            rules={[
                                {
                                    required: true,
                                    message: t("requiredFieldError"),
                                },
                            ]}
                        >
                            <Input disabled={selected.value ?? false} />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                            hidden
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                ref={addDeviceRef}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>
    );
}
