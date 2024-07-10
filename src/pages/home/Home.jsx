import mqtt from "mqtt";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cookie } from "../../lib/cookies";
import { defaultLoginOptions } from "../../constant/options";
import { App, Button, message } from "antd";

export default function Home() {
    const [client, setClient] = useState(useSelector((state) => state.mqtt).client)
    const [messages, setMessages] = useState([])
    const { message } = App.useApp();
    
    useEffect(() => {
        if(!client){
            const userInfo = Cookie.getUserInfo()
            console.log(userInfo)
            mqtt.connectAsync({
                ...defaultLoginOptions,
                ...userInfo
            }).then(result => {
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
            client.subscribeAsync("test-topic").then(res => {
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
            client.unsubscribeAsync("test-topic").then(res => {
                message.success(`Unsubcribe to topic successfully.`, )
            })
        }
        else{
            alert("error")
        }
    }
    return (
        <div>
            <h1>Home</h1>
            <Button onClick={subcribe}>Subcribe to "test-topic"</Button>
            <Button onClick={unsubcribe}>Unsubcribe</Button>
            {
                messages && messages.map(item => <h3 key={item}>{item}</h3>)
            }
        </div>
    );
}
