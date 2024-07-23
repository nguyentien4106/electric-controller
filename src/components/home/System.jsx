import {
    Button,
    Divider,
    Flex,
    Form,
    Input,
    Modal,
    Select,
    Space,
    Spin,
    Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSystem } from "../../state/system/systemSlice";
import MQTT from "../../lib/MQTT";
import { getSubscription, getUserName } from "../../lib/helper";
import ItemValue from "./ItemValue";
import { useTranslation } from "react-i18next";
import GaugeComponent from "react-gauge-component";
import SettingModal from "../common/SettingModal";

export default function System() {
    const { devices } = useSelector((state) => state.devices);
    const { deviceSystem } = useSelector((state) => state.system);
    const { client } = useSelector((state) => state.mqtt);
    const defaultDevice = devices.at(0) ?? {};
    const dispatch = useDispatch();

    const [systemData, setSystemData] = useState({});
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const { t } = useTranslation();

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
            <Flex className="gauge-container">
                <SettingModal settingsKey={"ePower.gauge-setting1"} />
                <SettingModal settingsKey={"ePower.gauge-setting2"} />
            </Flex>
            <Divider />
            <Spin
                tip={<p>{t("waiting")}</p>}
                style={{ fontSize: 128, width: "100%" }}
                size="large"
                spinning={loading}
            >
                <Flex gap={40}>
                    <ItemValue
                        color={"red"}
                        value={1200}
                        valueColor={"red"}
                        symbolColor={"blue"}
                        text={
                            <Typography.Text>{t("totalToday")}</Typography.Text>
                        }
                        symbol={"kWh"}
                    />
                    <ItemValue
                        color={"red"}
                        value={2400}
                        valueColor={"red"}
                        symbolColor={"blue"}
                        text={
                            <Typography.Text>{t("totalMonth")}</Typography.Text>
                        }
                        symbol={"kWh"}
                    />
                </Flex>
            </Spin>
        </Flex>
    );
}
