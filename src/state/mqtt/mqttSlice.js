import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    client: null
}

const mqttSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        getClient: (state) => {
            return state.client
        },
        setClient: (state, action) => {
            state.client = action.payload
        }
    }
})

export const { setClient, getClient } = mqttSlice.actions;

export default mqttSlice.reducer;