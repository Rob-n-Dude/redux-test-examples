import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import counterReducer from "./counterSlice";


export const setupStore = () => configureStore({
  reducer: counterReducer
})

export const store = setupStore()

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch