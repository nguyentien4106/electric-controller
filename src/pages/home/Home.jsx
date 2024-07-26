import mqtt from "mqtt";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cookie } from "../../lib/cookies";
import { defaultLoginOptions } from "../../constant/options";
import { App, Button, Divider, message, Modal, Tabs } from "antd";
import AuthorizeView from "@/components/auth/AuthorizeView";
import Devices from "../../components/home/Devices";
import OverallParams from "../../components/home/OverallParams";

import gridPowerImg from "@/assets/gridPower.png";
import pvPowerImg from "@/assets/pvPower.png";
import outPowerImg from "@/assets/outPower.png";
import consumptionPowerImg from "@/assets/consumptionPower.png";
import { useNavigate } from "react-router-dom";
import MQTT from "../../lib/MQTT";
import { setClient } from "../../state/mqtt/mqttSlice";
import { AndroidOutlined, AppleOutlined, SettingOutlined } from '@ant-design/icons';
import "./index.css"
import System from "../../components/home/System";
import { useTranslation } from "react-i18next";
import Settings from "../../components/home/Settings";
const height = "50%";
const defaultValueParams = {
    pvPower: {
        today: 1000,
        total: 1234,
        icon: <img src={pvPowerImg} height={height}></img>,
    },
    outPower: {
        today: 100,
        total: 200,
        icon: <img src={outPowerImg} height={height}></img>,
    },
    gridPower: {
        today: 300,
        total: 1300,
        icon: <img src={gridPowerImg} height={height}></img>,
    },
    consumptionPower: {
        today: 400,
        total: 1400,
        icon: <img src={consumptionPowerImg} height={height}></img>,
    },
};

export default function Home() {
    const { client } = useSelector((state) => state.mqtt);
    const { devices } = useSelector((state) => state.devices);
    const { message } = App.useApp();
    const userInfo = Cookie.getUserInfo();
    const topic = userInfo.username;
    const dispatch = useDispatch();
    const { t } = useTranslation()

    const connectToMQTT = () => {
        mqtt.connectAsync({
            ...defaultLoginOptions,
            username: userInfo.username,
            password: userInfo.password,
            clientId: userInfo.clientId,
        })
            .then((result) => {
                dispatch(setClient(result));
                setClient(result);
            })
            .catch((err) => {
                message.error(`Some unexpected error occurs, ${err}`);
            });
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
        };

        if (!client) {
            connectToMQTT();
        }

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            MQTT.disconnect(client);
        };
    }, []);

    useEffect(() => {
        // if (client) {
        //     client?.on("message", (tp, message) => {
        //         if (tp === topic) {
        //             setMessages(message);
        //         }
        //     });
        // }
    }, [client]);

    const items = [
        {
            key: "system",
            label: t("system"),
            children: <System />,
            icon: <AppleOutlined />,
        },
        {
            key: "devices",
            label: t("devices"),
            children: <Devices />,
            icon: <AndroidOutlined />,
        },
        {
            key: "settings",
            label: t("settings"),
            children: <Settings />,
            icon: <SettingOutlined />,
        },
    ]
    return (
        <AuthorizeView>
            <Tabs
                defaultActiveKey="system"
                items={items}
                centered
            />
        </AuthorizeView>
    );
}
