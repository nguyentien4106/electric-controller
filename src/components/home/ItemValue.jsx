import { Flex, Space, Typography } from "antd";
import React from "react";

export default function ItemValue({
    text,
    valueColor,
    value,
    symbol,
    symbolColor,
}) {
    return (
        <Flex vertical>
            <h3 className="item--text">{text}</h3>

            <Space>
                <Typography.Title
                    style={{ color: valueColor, fontSize: 30, height: 40 }}
                    className="item--value"
                >
                    {value?.toFixed(2)}
                </Typography.Title>
                <Typography.Title
                    style={{
                        color: symbolColor,
                        fontSize: 20,
                        height: 40,
                        textAlign: "top",
                    }}
                >
                    {symbol}
                </Typography.Title>
            </Space>
        </Flex>
    );
}
