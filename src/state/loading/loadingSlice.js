import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false
}

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        show: (state, action) => {
            state.isLoading = true
        },
        hide: (state, action) => {
            state.isLoading = false
        }
    }
})

export const { show, hide } = loadingSlice.actions;

export default loadingSlice.reducer;