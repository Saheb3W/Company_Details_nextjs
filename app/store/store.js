"use client";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react"; // Make sure to import from the correct path
import { companyApi } from "../services/companyApi";

export const store = configureStore({
  reducer: {
    [companyApi.reducerPath]: companyApi.reducer,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([companyApi.middleware]),
});

setupListeners(store.dispatch);

export default store;
