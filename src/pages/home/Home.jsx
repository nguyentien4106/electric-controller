import mqtt from "mqtt";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cookie } from "../../lib/cookies";
import { defaultLoginOptions } from "../../constant/options";
import { App, Button, message } from "antd";
import AuthorizeView from '@/components/auth/AuthorizeView'
import { dispatch } from "../../state/store";

const topic = "test-topic"

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
            console.log('listerner',client)
            client.on("message", (topic, message) => {
                setMessages(prev => [...prev, `received message: ${message} from topic: ${topic}`])
            });
        }
    }, [client])

    const delay = millis => new Promise((resolve, reject) => {
        setTimeout(_ => resolve(), millis)
      });

    useEffect(() => {
        const pubtest = async () => {
            if(isTest && testClient){
                let i = 0;
                while(true){
                    console.log(`test ${i}`)
                    testClient.publishAsync(topic, `Test message from test client ${i++}`)
                    await delay(3000)
                }
            }
        }

        pubtest()
        
    }, [isTest])

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

    return (
        <AuthorizeView >
            <h1>Home</h1>
            <Button onClick={subcribe}>Subcribe to "test-topic"</Button>
            <Button onClick={unsubcribe}>Unsubcribe</Button>
            <Button onClick={() => setIsTest(prev => !prev)}>{isTest ? "Stop test" : "Start test"}</Button>
            {
                messages && messages.map(item => <h3 key={item}>{item}</h3>)
            }
        </AuthorizeView>
    );
}
