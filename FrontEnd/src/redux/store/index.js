import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../reducers";
import authReducer from "../reducers/authReducer";
import annunciReducer from "../reducers/annunciReducer";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    annunci: annunciReducer,
  },
});

export default store;
