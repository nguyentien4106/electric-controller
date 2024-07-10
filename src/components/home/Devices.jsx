import { Flex, Select, Space, Typography } from 'antd'
import React, { useState } from 'react'

const defaultDevices = [
    {
        value: "device test 1",
        label: "device test 1",
    },
    {
        value: "device test 2",
        label: "device test 3",
    }
]
export default function Devices() {
    const [devices, setDevices] = useState(defaultDevices)     

    return (
        <Flex justify='center' align='center'>
             <Space size={40}>
            <Typography.Text style={{
                fontSize: 20
            }}>Thiết bị:</Typography.Text>
            <Select
                defaultValue={devices[0]}
                style={{ width: 120 }}
                onChange={() => console.log("change")}
                options={devices}
                />
        </Space>
        </Flex>
    )
}
