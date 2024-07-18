import { configureStore } from "@reduxjs/toolkit";

import loadingReducer from './loading/loadingSlice'
import userSlice from "./user/userSlice";
import mqttSlice from "./mqtt/mqttSlice";
import devicesSlice from "./devices/devicesSlice";
import systemSlice from "./system/systemSlice";
import logger from 'redux-logger'

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        user: userSlice,
        mqtt: mqttSlice,
        devices: devicesSlice,
        system: systemSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(logger)

})

export const getState = () => store.getState()

export const dispatch = () => store.dispatch()