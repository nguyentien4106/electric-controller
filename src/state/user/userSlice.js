import { createSlice } from "@reduxjs/toolkit"
import { getUser } from "../../lib/helper"

const initialState = {
    user: getUser()
}

const userSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = Object.assign(state.user ?? {}, action.payload)
        },
        removeUser: state => {
            state.user = null
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;