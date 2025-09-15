import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../reducers";

const store = configureStore({
  reducer: cartReducer,
});

export default store;
