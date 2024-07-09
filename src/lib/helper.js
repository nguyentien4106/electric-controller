import { jwtDecode } from "jwt-decode"
import { Cookie } from "./cookies"

export const generateMessages = (messages) => Object.values(messages).join("\n")

export const setLocal = (key, value) => localStorage.setItem(key, value)

export const getLocal = key => localStorage.getItem(key) ?? null

export const getUserName = email => email ? email.split("@")[0] : ""

export const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

export const getYear = birthDate => birthDate?.substring(0, 4)

export const getUser = () => {
    return Cookie.getUser()
}

export const showMoney = (value) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    });
    
    return formatter.format(value ?? 0)
}

export const isObjectEmpty = obj => Object.keys(obj).length === 0


export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const showNumber = number => new Intl.NumberFormat().format(number)