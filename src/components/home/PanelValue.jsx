import { Card, Divider, Flex, Space, Typography } from "antd";
import React from "react";

const Value = ({ today, total }) => {
    return (
        <div>
            <h2>{today.toFixed(2)} kWh</h2>
            <br/>
            <Typography.Text>Sản lượng hôm nay</Typography.Text>
            <Divider style={{ width: "20%"}}/>
            <h2>{total.toFixed(2)} kWh</h2>
            <br/>
            <Typography.Text>Sản lượng tổng</Typography.Text>
        </div>
    )
}

export default function PanelValue({ value }) {
    return (
        <Card title={value.label} bordered={false} style={{ width: "35%" }}>
            <Flex justify="space-between" vertical={false}>
                <Value today={value.today} total={value.total} />
                {
                    value.icon
                }
            </Flex>
        </Card>
    );
}
