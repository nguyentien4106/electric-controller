import mqtt from "mqtt";
import { defaultLoginOptions } from "../constant/options";

export default class MQTT {
    static connectAsync(opts) {
        return mqtt.connectAsync({ ...defaultLoginOptions, opts });
    }

    static connect(opts) {
        const client = mqtt.connect({ ...defaultLoginOptions, opts });
        return client
    }

    static removeListener(client, event){
        console.log('client', client)
        if(client){
            client.removeListener(event, () => {
                console.log('remove listener', event)
            })
        }
    }

    static removeAllListeners(client){
        if(client){
            client.removeAllListeners();
            console.log('remove all listener')
        }
    }

    static disconnect = (client) => {
        if (client?.connected) {
            try {
                client?.end(false, () => {
                    console.log("disconnected successfully");
                    console.log(client);
                });
            } catch (error) {
                console.log("disconnect error:", error);
            }
        }
    };

    static subscribe = (client, subscription) => {
        if (client) {
            const { topic, qos } = subscription;
            client.subscribe(topic, { qos }, (error) => {
                if (error) {
                    return { isSucceed: false, error };
                }
                return { isSucceed: true };
            });
        }
    };

    static unsubscribe = (client, subscription) => {
        if (client) {
            const { topic, qos } = subscription;
            client.unsubscribe(topic, { qos }, (error) => {
                if (error) {
                    console.log("Unsubscribe error", error);
                    return;
                }
                console.log(`unsubscribed topic: ${topic}`);
            });
        }
    };

    static publish = (client, context, callback) => {
        if (client) {
            const { topic, qos, payload } = context;
            client.publish(topic, payload, { qos }, (error) => {
                if (error) {
                    return {
                        isSucceed: false,
                        error,
                    };
                } else {
                    if(callback){
                        callback()
                    }
                    return {
                        isSucceed: true,
                    };
                }
            });
        }
    };

    static publishAsync = (client, context) => {
        if (client) {
            const { topic, qos, payload } = context;
            return client.publishAsync(topic, payload, { qos });
        }
    };
}
