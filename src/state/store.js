import { configureStore } from "@reduxjs/toolkit";

import loadingReducer from './loading/loadingSlice'
import userSlice from "./user/userSlice";
import mqttSlice from "./mqtt/mqttSlice";

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        user: userSlice,
        mqtt: mqttSlice
    },

})

export const getState = () => store.getState()

export const dispatch = () => store.dispatch()