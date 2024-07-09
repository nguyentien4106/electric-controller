import axios from "axios";
import { getLocal, setLocal } from "./helper";
import { Cookie } from "./cookies";
import { AUTH_PATH } from "../constant/urls";

const BASE_URL = import.meta.env.VITE_BASE_URL

const service = axios.create()
service.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
service.defaults.headers.common["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
service.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
service.defaults.headers.common["Access-Control-Allow-Credentials"] = true

const AUTH_REQUEST = "Auth/"

const beforeRequest = request => {
    const controller = new AbortController();

    if(request.url.includes("noaction.com")){
        controller.abort()

        return {
            ...request,
            signal: controller.signal
        }
    }

    if(request.url.includes(AUTH_REQUEST)){
        return request
    }

    const refreshToken = Cookie.get("refreshToken")
    if(!refreshToken){
        return request
    }

    const accessToken = Cookie.get("accessToken")
    if(!accessToken){
        axios.post(BASE_URL + AUTH_PATH.refreshToken, {
            AccessToken: getLocal("accessToken"),
            refreshToken: refreshToken,
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            }
        }).then(res => {
            const { data } = res.data
            
            Cookie.setAccessToken(data.accessToken)
            Cookie.setRefreshToken(data.refreshToken)
        })
    }

    return request
}

service.interceptors.request.use(beforeRequest, function (error) {
    return Promise.reject(error);
})

service.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error);
})

export default class DataService{
    static post(url, data, options){
        return service.post(BASE_URL + url, data, {
            headers: {
                Authorization: `Bearer ${Cookie.getAccessToken()}`
            }
        })
    }

    static get(url){
        return service.get(BASE_URL + url, {
            headers: {
                Authorization: `Bearer ${Cookie.getAccessToken()}`
            }
        })
    }
}