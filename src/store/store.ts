import { configureStore } from "@reduxjs/toolkit";
import dataUserReducer from './dataUserSlice'
import roleReducer from './roleSlice'
import loadingReducer from './loadingSlice'

const store = configureStore({
    reducer: {
        dataUser: dataUserReducer,
        role: roleReducer,
        loading: loadingReducer
    }
})

export default store;
export type rootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch