import mqtt from "mqtt";
import { defaultLoginOptions } from "../constant/options";

export default class MQTT{
    static connectAsync(opts){
        return mqtt.connectAsync({...defaultLoginOptions, opts})
    }
}