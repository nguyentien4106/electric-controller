import { Divider, Flex, Select, Space, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSystem } from "../../state/system/systemSlice";
import MQTT from "../../lib/MQTT";
import { getSubscription, getUserName } from "../../lib/helper";
import ItemValue from "./ItemValue";
import { useTranslation } from "react-i18next";
import GaugeComponent from "react-gauge-component";

export default function System() {
    const { devices } = useSelector((state) => state.devices);
    const { deviceSystem } = useSelector((state) => state.system);
    const { client } = useSelector((state) => state.mqtt);
    const defaultDevice = devices.at(0) ?? {};
    const dispatch = useDispatch();

    const [systemData, setSystemData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let topic = "";
        if (!deviceSystem && defaultDevice.value) {
            topic = `${getUserName()}/${defaultDevice.value}`;
        } else {
            topic = `${getUserName()}/${deviceSystem}`;
        }

        MQTT.subscribe(client, getSubscription(topic));

        client?.on("message", (tp, msg) => {
            if (tp === topic) {
                const data = JSON.parse(msg);
                const {
                    vPV,
                    iPV,
                    wPV,
                    vBat,
                    iBat,
                    wBat,
                    h,
                    tempDev,
                    tempBat,
                    sp,
                    tdkWh,
                    sumkWh,
                    typeBat,
                    status,
                } = data;
                setSystemData(data);
            }
        });

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => {
            MQTT.removeAllListeners(client);
            MQTT.unsubscribe(client, getSubscription(topic));
        };
    }, [deviceSystem]);
    
    const { t } = useTranslation();
    const kbitsToMbits = (value) => {
        if (value >= 1000) {
            value = value / 1000;
            if (Number.isInteger(value)) {
                return value.toFixed(0) + " kWh";
            } else {
                return value.toFixed(1) + " kWh";
            }
        } else {
            return value.toFixed(0) + " kWh";
        }
    };

    const [settings, setSettings] = useState({});

    return (
        <Flex className="system" justify="center" vertical align="center">
            <Space size={40}>
                <label>{t("device")}: </label>
                <Select
                    defaultActiveFirstOption
                    defaultValue={defaultDevice.label}
                    style={{ width: 180 }}
                    onChange={(value) => dispatch(setSystem(value))}
                    options={devices}
                />
            </Space>

            <div onClick={() => console.log('error')} style={{width: "100%"}}>
                <GaugeComponent
                    style={{
                        width: "50%",
                    }}
                    className="gauge"
                    arc={{
                        nbSubArcs: 1500,
                        colorArray: ["#5BE12C", "#F5CD19", "#EA4228"],
                        width: 0.3,
                        padding: 0.003,
                    }}
                    labels={{
                        valueLabel: {
                            fontSize: 40,
                            formatTextValue: kbitsToMbits,
                        },
                        tickLabels: {
                            type: "outer",
                            valueConfig: {
                                formatTextValue: kbitsToMbits,
                            },
                        },
                    }}
                    value={900}
                    maxValue={3000}
                />
            </div>
            <Divider />
            <Spin
                tip={<p>{t("waiting")}</p>}
                // spinning={loading}
                style={{ fontSize: 128 }}
                size="large"
            >
                <Flex gap={40}>
                    <ItemValue
                        color={"red"}
                        value={1200}
                        valueColor={"red"}
                        symbolColor={"blue"}
                        text={<Typography.Title></Typography.Title>}
                        symbol={"kWh"}
                    />
                    <ItemValue
                        color={"red"}
                        value={2400}
                        valueColor={"red"}
                        symbolColor={"blue"}
                        text={"Tổng"}
                        symbol={"kWh"}
                    />
                </Flex>
            </Spin>
        </Flex>
    );
}
