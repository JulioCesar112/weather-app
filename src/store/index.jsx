import { configureStore } from "@reduxjs/toolkit";
import apiKey from "./slices/apiKey";

export default configureStore({
  reducer: {
    apiKey
  }
})