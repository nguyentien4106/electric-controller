import { createSlice } from "@reduxjs/toolkit"
import { getLocal, setLocal } from "../../lib/helper"
import { LOCAL_KEY_DEVICES } from "../../constant/settings"

const initialState = {
    devices: getLocal(LOCAL_KEY_DEVICES, [])
}

const devicesSlice = createSlice({
    name: "devices",
    initialState,
    reducers: {
        add: (state, action) => {
            state.devices.push(action.payload)
            setLocal(LOCAL_KEY_DEVICES, state.devices)
        },
        remove: (state, action) => {
            state.devices = state.devices.filter(item => item.id !== action.payload.id)
            setLocal(LOCAL_KEY_DEVICES, state.devices)
        },
        update: (state, action) => {
            state.devices = state.devices.map(item => item.id === action.payload.id ? action.payload : item)
            setLocal(LOCAL_KEY_DEVICES, state.devices)
        }
    }
})

export const { add, remove, update } = devicesSlice.actions;

export default devicesSlice.reducer;