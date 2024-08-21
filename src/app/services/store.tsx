"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";

export const store = configureStore({
  reducer: {
    cartItem: cartReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
