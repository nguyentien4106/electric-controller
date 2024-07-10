import mqtt from "mqtt";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cookie } from "../../lib/cookies";
import { defaultLoginOptions } from "../../constant/options";
import { App, Button, Divider, message } from "antd";
import AuthorizeView from '@/components/auth/AuthorizeView'
import { dispatch } from "../../state/store";
import Devices from "../../components/home/Devices";
import OverallParams from "../../components/home/OverallParams";

import gridPowerImg from "@/assets/gridPower.png"
import pvPowerImg from "@/assets/pvPower.png"
import outPowerImg from "@/assets/outPower.png"
import consumptionPowerImg from "@/assets/consumptionPower.png"

const topic = "test-topic"

const height = "50%"
const defaultValueParams = {
    pvPower: {
        today: 1000,
        total: 1234,
        icon: <img src={pvPowerImg} height={height}></img>
    },
    outPower: {
        today: 100,
        total: 200,
        icon: <img src={outPowerImg} height={height}></img>
    },
    gridPower: {
        today: 300,
        total: 1300,
        icon: <img src={gridPowerImg} height={height}></img>

    },
    consumptionPower: {
        today: 400,
        total: 1400,
        icon: <img src={consumptionPowerImg} height={height}></img>

    }
}

export default function Home() {
    const [client, setClient] = useState(null)
    const [messages, setMessages] = useState([])
    const [testClient, setTestClient] = useState(null)
    const [isTest, setIsTest] = useState(false)

    const { message } = App.useApp();
    const connectToMQTT = () => {
        const userInfo = Cookie.getUserInfo()
        mqtt.connectAsync({
            ...defaultLoginOptions,
            username: userInfo.username,
            password: userInfo.password,
            clientId: userInfo.clientId
        }).then(result => {
            dispatch(setClient(result))
            setClient(result)
        }).catch(err => {
        })
    }
    useEffect(() => {
        if(!client){
            connectToMQTT()
        }

        if(!testClient){
            mqtt.connectAsync({
                ...defaultLoginOptions,
                username: "test",
                password: "test",
                clientId: "test_clientId"
            }).then(result => {
                setTestClient(result)
            }).catch(err => {
            })
        }
    }, [])

    useEffect(() => {
        if(client){
            client.on("message", (topic, message) => {
                setMessages(prev => [...prev, `received message: ${message} from topic: ${topic}`])
            });
        }
    }, [client])

    const delay = millis => new Promise((resolve, reject) => {
        setTimeout(_ => resolve(), millis)
    });

    const subcribe = () => {
        if(client){
            client.subscribeAsync(topic).then(res => {
                if(res.length){
                    message.success(`Subcribe to topic "${res[0].topic}" successfully.`, )
                }
            })
        }
        else{
            alert("error")
        }
    }

    const unsubcribe = () => {
        if(client){
            client.unsubscribeAsync(topic).then(res => {
                message.success(`Unsubcribe to topic successfully.`, )
            })
        }
        else{
            alert("error")
        }
    }
    const handleTest = () => {
        if(!isTest){
            message.info("Đã bắt đầu test")
            setIsTest(true)
            
        }
        else {
            setIsTest(false)

            message.info("Đã dừng test")
        }
    }

    useEffect(() =>{
        if(isTest){
            const a = async () => {
                while(isTest){
                    setValueParams(prev => {
                        const random = Math.random() * 10;
                        const result = {...prev}
                        for (const [key] of Object.entries(prev)) {
                            result[`${key}`].today += random
                            result[`${key}`].total += random
                        }
                        return result
                    })

                    await delay(3000)
                }
            }

            a()
        }
        return () => {
            setIsTest(false)
        }
    }, [isTest])

    const [valueParams, setValueParams] = useState(defaultValueParams)

    return (
        <AuthorizeView >
            <Button onClick={subcribe}>Subcribe to "test-topic"</Button>
            <Button onClick={unsubcribe}>Unsubcribe</Button>
            <Button onClick={handleTest}>{isTest ? "Stop test" : "Start test"}</Button>
            <Divider />
            <Devices />
            <Divider />
            <OverallParams values={valueParams} />
        </AuthorizeView>
    );
}
