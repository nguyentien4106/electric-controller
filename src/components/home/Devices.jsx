import {
    App,
    Button,
    Flex,
    Form,
    Input,
    List,
    Modal,
    Popconfirm,
    Select,
    Space,
    Table,
    Typography,
} from "antd";
import React, { useId, useRef, useState } from "react";
import { getLocal, setLocal } from "../../lib/helper";
import { LOCAL_KEY_DEVICES } from "../../constant/settings";
import addBtn from "@/assets/add.png";
import deleteBtn from "@/assets/delete.png";
import { useDispatch, useSelector } from "react-redux";
import { add, remove, update } from "../../state/devices/devicesSlice";

const defaultItem = {
    id: "",
    label: "",
    value: "",
};
export default function Devices() {
    const { devices } = useSelector((state) => state.devices);
    const [selected, setSelected] = useState(defaultItem);
    const [open, setOpen] = useState(false);
    const addDeviceRef = useRef();
    const { message } = App.useApp();
    const dispatch = useDispatch();

    const onFinish = (device) => {
        if (devices.some((dv) => dv.id === device.id)) {
            if (devices.some((dv) => dv.id !== device.id && dv.value === device.value)) {
                message.error("Device's ID is existed");
                return;
            }
    
            if (devices.some((dv) => dv.id !== device.id && dv.label === device.label)) {
                message.error("Device's name is existed");
                return;
            }
            dispatch(update(device));
            setOpen(false);
            return;
        }

        if (devices.some((dv) => dv.value === device.value)) {
            message.error("Device's ID is existed");
            return;
        }

        if (devices.some((dv) => dv.label === device.label)) {
            message.error("Device's name is existed");
            return;
        }

        const lastDevice = devices.at(-1);
        dispatch(add({ ...device, id: lastDevice ? lastDevice.id + 1 : 1}));
        setOpen(false);
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
                    title="Device' s Name"
                    dataIndex={"label"}
                ></Table.Column>
                <Table.Column
                    key={"value"}
                    title="Device' s ID"
                    dataIndex={"value"}
                ></Table.Column>
                <Table.Column
                    key={"action"}
                    title="Action"
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
                                        title="Delete ?"
                                        description="Are you sure to delete this device ?"
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
                    onCancel={() => setOpen(false)}
                    onOk={() => addDeviceRef.current.click()}
                >
                    <h3>New Device's Info</h3>
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
                            id: selected.id
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item name="id" hidden>
                            <Input value={selected.id} />
                        </Form.Item>
                        <Form.Item
                            label="Device's Name"
                            name="label"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input your device's name !",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Device ID"
                            name="value"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your device's ID !",
                                },
                            ]}
                        >
                            <Input />
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
