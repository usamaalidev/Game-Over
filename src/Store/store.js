import { configureStore } from "@reduxjs/toolkit";

export let store = configureStore({
  reducer: {},
});

console.log(store);
