import { Flex, Space, Typography } from 'antd'
import React from 'react'

export default function ItemValue({ text, valueColor, value, symbol, symbolColor }) {
    return (
        <Flex vertical>
            <Typography.Text className='item--text'>{text}</Typography.Text>

            <Space>
                <Typography.Title style={{ color: valueColor, fontSize: 30, height: 40 }} className='item--value'>{value}</Typography.Title>
                <Typography.Title style={{ color: symbolColor, fontSize: 20, height: 40, textAlign: "top" }}>{symbol}</Typography.Title>
            </Space>

        </Flex>
    )
}
