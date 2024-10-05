import { configureStore } from "@reduxjs/toolkit";

import trackStateReducer from './track-store';

const store = configureStore({
    reducer: {
        trackState: trackStateReducer,
    }
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;