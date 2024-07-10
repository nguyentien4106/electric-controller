import React from 'react'
import PanelValue from './PanelValue';
import { Flex } from 'antd';

const panels = [
    {
      key: "pvPower",
      label: "Năng lượng PV",
    },
    {
      key: "outPower",
      label: "Năng lượng xả",
    },
    {
      key: "gridPower",
      label: "Năng lượng đẩy lưới",
    },
    {
      key: "consumptionPower",
      label: "Năng lượng tiêu thụ",
    },
];

export default function OverallParams({ values }) {
    return (
        <Flex wrap gap={50} justify='center'>
            {
                panels.map(item => <PanelValue value={({ ...values[item.key], label: item.label})} key={item.key}/>)
            }
        </Flex>
    )
}
