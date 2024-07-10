import { configureStore } from "@reduxjs/toolkit";

import loadingReducer from './loading/loadingSlice'
import userSlice from "./user/userSlice";
import mqttSlice from "./mqtt/mqttSlice";
import logger from 'redux-logger'

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        user: userSlice,
        mqtt: mqttSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(logger)

})

export const getState = () => store.getState()

export const dispatch = () => store.dispatch()