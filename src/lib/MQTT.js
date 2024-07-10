import mqtt from "mqtt";
import { defaultLoginOptions } from "../constant/options";

export default class MQTT{
    static connectAsync(opts){
        return mqtt.connectAsync({...defaultLoginOptions, opts})
    }

    static disconnect = (client) => {
        if (client.connected) {
          try {
            client.end(false, () => {
              console.log('disconnected successfully')
            })
          } catch (error) {
            console.log('disconnect error:', error)
          }
        }
      }
}