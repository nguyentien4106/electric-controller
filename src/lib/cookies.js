import Cookies from "js-cookie";

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

export const Cookie = {
    setUser,
    getUser,
    removeUser
}