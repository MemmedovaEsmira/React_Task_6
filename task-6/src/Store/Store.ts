import { configureStore } from "@reduxjs/toolkit";
import FeedBacksSliceReducer from "./FeedBacksSlice";


export const Store= configureStore({
    reducer: {
        FeedBacksSliceReducer
    }
})


export type RootState = ReturnType<typeof Store.getState>