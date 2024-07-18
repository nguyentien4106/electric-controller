import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    deviceSystem: null
}

const systemSlice = createSlice({
    name: "system",
    initialState,
    reducers: {
        setSystem: (state, action) => {
            state.deviceSystem = action.payload
        }
    }
})

export const { setSystem } = systemSlice.actions;

export default systemSlice.reducer;