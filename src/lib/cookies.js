import Cookies from "js-cookie";
import { KEY_DECODE } from "../constant/settings";
import Password from "antd/es/input/Password";
import dayjs from "dayjs";

const oneDays = 1440 
const ePowerUser = "epower.user"

const set = (key, value, minute) => {
    const expired = new Date(new Date().getTime() + minute * 60 * 1000);

    Cookies.set(key, value, {
        expires: expired
    })
}


const setUser = (username) => {
    set(ePowerUser, username, oneDays)
}

const removeUser = () => {
    Cookies.remove(ePowerUser)
}

const getUser = () => {
    return Cookies.get(ePowerUser)
}

const getUserInfo = () => {
    const info = atob(getUser()).split(KEY_DECODE)

    if(!info || info.length < 2){
        return {}
    }

    return {
        username: info[0],
        password: info[1],
        clientId: info[0] + dayjs().format("DD_MM_YYYY_HH:mm:ssZ")
    }
}
export const Cookie = {
    setUser,
    getUser,
    removeUser,
    getUserInfo
}