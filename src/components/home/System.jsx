import { Flex, Select, Space } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSystem } from "../../state/system/systemSlice";
import GaugeComponent from "react-gauge-component";

export default function System() {
  const { devices } = useSelector((state) => state.devices);
  const defaultDevice = devices.at(0) ?? {};
  const dispatch = useDispatch();

  return (
    <Flex className="system" justify="start" vertical>
      <Space size={40}>
        <label>Device: </label>
        <Select
          defaultActiveFirstOption
          defaultValue={defaultDevice.label}
          style={{ width: 180 }}
          onChange={(value) => dispatch(setSystem(value))}
          options={devices}
        />
      </Space>
      <GaugeComponent
        arc={{
          subArcs: [
            {
              limit: 20,
              color: "#EA4228",
              showTick: true,
            },
            {
              limit: 40,
              color: "#F58B19",
              showTick: true,
            },
            {
              limit: 60,
              color: "#F5CD19",
              showTick: true,
            },
            {
              limit: 100,
              color: "#5BE12C",
              showTick: true,
            },
          ],
        }}
        value={50}
      />
    </Flex>
  );
}
