import mqtt from "mqtt";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cookie } from "../../lib/cookies";
import { defaultLoginOptions } from "../../constant/options";
import { App, Button, message } from "antd";
import AuthorizeView from '@/components/auth/AuthorizeView'
import { dispatch } from "../../state/store";
import MQTT from "../../lib/MQTT";

const topic = "test-topic"

export default function Home() {
    const [client, setClient] = useState(useSelector((state) => state.mqtt).client)
    const [messages, setMessages] = useState([])
    const [testClient, setTestClient] = useState(null)
    const [isTest, setIsTest] = useState(false)

    const { message } = App.useApp();

    useEffect(() => {

    }, [])
    useEffect(() => {
        if(!client){
            const userInfo = Cookie.getUserInfo()
            mqtt.connectAsync(userInfo).then(result => {
                dispatch(setClient(result))
                setClient(result)
            })
        }
        else {
            console.log(client)
            client.on("message", (topic, message) => {
                setMessages(prev => [...prev, `received message: ${message} from topic: ${topic}`])
            });
        }
    }, [client])

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

    const publish = () => {
        if(testClient && testClient.connected){
            let i = 0;
            while(isTest){
                testClient.publishAsync(topic,`Test message id: ${Math.random().toString(16)} ${i++}`)
            }
        }
    }

    return (
        <AuthorizeView >
            <h1>Home</h1>
            <Button onClick={subcribe}>Subcribe to "test-topic"</Button>
            <Button onClick={unsubcribe}>Unsubcribe</Button>
            <Button onClick={() => setIsTest(prev => !prev)}>{isTest ? "Start test" : "Stop test"}</Button>
            {
                messages && messages.map(item => <h3 key={item}>{item}</h3>)
            }
        </AuthorizeView>
    );
}
