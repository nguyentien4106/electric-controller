import { configureStore } from "@reduxjs/toolkit";

import loadingReducer from './loading/loadingSlice'
import userSlice from "./user/userSlice";

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        user: userSlice,
    },

})

export const getState = () => store.getState()

export const dispatch = () => store.dispatch()