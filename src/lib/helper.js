import { jwtDecode } from "jwt-decode"
import { Cookie } from "./cookies"

export const generateMessages = (messages) => Object.values(messages).join("\n")

export const setLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const getLocal = (key, defaultValue) => {
    const value = localStorage.getItem(key)

    if(!defaultValue){
        return value ?? null
    }

    const data = JSON.parse(value)

    return data ?? defaultValue
}


export const getUserName = email => email ? email.split("@")[0] : ""

export const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

export const getYear = birthDate => birthDate?.substring(0, 4)

export const getUser = () => {
    return Cookie.getUser()
}


export const isObjectEmpty = obj => Object.keys(obj).length === 0


export const showNumber = number => new Intl.NumberFormat().format(number)