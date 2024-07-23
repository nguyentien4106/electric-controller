import { Button, Form, Input, InputNumber, Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { getLocal, setLocal } from "../../lib/helper";
import { useTranslation } from "react-i18next";
import GaugeComponent from "react-gauge-component";
import { defaultSettingsGaugeChart } from "../../constant/options";

export default function SettingModal({ settingsKey }) {
    const [settings, setSettings] = useState(
        getLocal(settingsKey, defaultSettingsGaugeChart)
    );
    const { t } = useTranslation();
    const submitRef = useRef();
    const [open, setOpen] = useState(false);

    const onFinish = (values) => {
        setSettings((prev) => {
            const newSettings = { ...prev, maxValue: values.maxValue };
            setLocal(settingsKey, newSettings);
            return newSettings;
        });
    };
    useEffect(() => {
        console.log(settings);
    }, [settings]);

    return (
        <>
            <div onClick={() => setOpen(true)} className="pointer gauge-chart">
                <h4 style={{ textAlign: "center" }}>{t(settingsKey)}</h4>
                <GaugeComponent
                    arc={{
                        nbSubArcs: 1500,
                        colorArray: ["#5BE12C", "#F5CD19", "#EA4228"],
                        width: 0.3,
                        padding: 0.003,
                    }}
                    labels={{
                        valueLabel: {
                            fontSize: 40,
                            formatTextValue: (value) =>
                                value.toFixed(2) + " kWh",
                            style: {
                                color: "black",
                                backgroundColor: "aliceblue",
                                fill: "rgb(193 171 239)",
                            },
                        },
                        tickLabels: {
                            type: "outer",
                            valueConfig: {
                                formatTextValue: (value) =>
                                    value.toFixed(2) + " kWh",
                            },
                        },
                    }}
                    value={settings.value}
                    maxValue={settings.maxValue}
                />
            </div>
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                onOk={() => {
                    setOpen(false);
                    submitRef.current.click();
                }}
            >
                <h4>Confiure chart value</h4>
                <Form
                    initialValues={{
                        maxValue: settings.maxValue ?? 120,
                    }}
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="maxValue"
                        label={t("maxValue")}
                        rules={[
                            {
                                required: true,
                                message: "Please input password!",
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: "0px" }} hidden>
                        <Button
                            block="true"
                            type="primary"
                            htmlType="submit"
                            ref={submitRef}
                        ></Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
