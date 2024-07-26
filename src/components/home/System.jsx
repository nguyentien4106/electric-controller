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
import jsf from "json-schema-faker";
export default function System() {
    const { devices } = useSelector((state) => state.devices);
    const { deviceSystem } = useSelector((state) => state.system);
    const { client } = useSelector((state) => state.mqtt);
    const defaultDevice = devices.at(0) ?? {};
    const dispatch = useDispatch();

    const [systemData, setSystemData] = useState({});
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [testNumber, setTestNumber] = useState(0)
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

    const handleTest = () => {
        if(testNumber){
            clearInterval(testNumber)
            setTestNumber(0)
            return
        }
        const schema = {
            type: "object",
            properties: {
                vPV: { type: "number", minimum: 1, maximum: 300},
                iPV: { type: "number", minimum: 1, maximum: 400},
                wPV: { type: "number", minimum: 1, maximum: 300},
                vBat: { type: "number", minimum: 1, maximum: 123},
                iBat: { type: "number", minimum: 1, maximum: 331},
                wBat: { type: "number", minimum: 1, maximum: 314},
                h: { type: "number", minimum: 1, maximum: 312},
                tempDev: { type: "number", minimum: 1, maximum: 311},
                tempBat: { type: "number", minimum: 1, maximum: 311},
                sp: { type: "number", minimum: 1, maximum: 331},
                tdkWh: { type: "number", minimum: 1, maximum: 387},
                sumkWh: { type: "number", minimum: 1, maximum: 354},
                typeBat: { type: "number", minimum: 1, maximum: 312},
                status: { type: "number", minimum: 1, maximum: 332},
            },
            required: ["vPV", "iPV", "wPV", "vBat", "iBat", "wBat", "h", "tempDev", "tempBat", "sp", "tdkWh", "sumkWh", "typeBat", "status"],
        };


        const intervalId = window.setInterval(function(){
            // call your function here
            const fakeData = jsf.generate(schema);
            setSystemData(fakeData)
        }, 1500);

        setTestNumber(intervalId)
    };

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
                <Button onClick={handleTest}>{testNumber ? "Stop Test" : "Start Test"}</Button>

            </Space>
            <Flex className="gauge-container">
                <SettingModal
                    settingsKey={"ePower.gauge-setting-today"}
                    value={systemData.vPV}
                    title={t("vPV")}
                />
                <SettingModal
                    settingsKey={"ePower.gauge-setting-month"}
                    value={systemData.iPV}
                    title={t("iPV")}
                />
            </Flex>
            <Divider />

            <Spin
                tip={<p>{t("waiting")}</p>}
                style={{ fontSize: 128, width: "100%" }}
                size="large"
                spinning={loading}
            >
                <Flex gap={40} justify="center" style={{ width: "100%" }}>
                    <ItemValue
                        color={"red"}
                        value={systemData.tdkWh}
                        valueColor={"red"}
                        symbolColor={"red"}
                        text={
                            <Typography.Text>{t("totalToday")}</Typography.Text>
                        }
                        symbol={"kWh"}
                    />
                    <ItemValue
                        color={"red"}
                        value={systemData.sumkWh}
                        valueColor={"blue"}
                        symbolColor={"blue"}
                        text={
                            <Typography.Text>{t("totalMonth")}</Typography.Text>
                        }
                        symbol={"kWh"}
                    />
                </Flex>
                <Divider />
                <Flex gap={40}>
                    <ItemValue
                        color={"red"}
                        value={systemData.tempDev}
                        valueColor={"red"}
                        symbolColor={"blue"}
                        text={
                            <Typography.Text>{t("totalToday")}</Typography.Text>
                        }
                        symbol={"kWh"}
                    />
                    <ItemValue
                        color={"red"}
                        value={systemData.tempBat}
                        valueColor={"red"}
                        symbolColor={"blue"}
                        text={
                            <Typography.Text>{t("totalMonth")}</Typography.Text>
                        }
                        symbol={"kWh"}
                    />
                    <ItemValue
                        color={"red"}
                        value={systemData.sp}
                        valueColor={"red"}
                        symbolColor={"blue"}
                        text={
                            <Typography.Text>{t("totalToday")}</Typography.Text>
                        }
                        symbol={"kWh"}
                    />
                    <ItemValue
                        color={"red"}
                        value={systemData.wPV}
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
