import { configureStore } from "@reduxjs/toolkit";
import settings from "./settings";

let store = configureStore({
  reducer: {
    settings,
  },
});
export default store;
