import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menu.slice";
import headerReducer from "./header.slice";
import movieReducer from "./movie.slice";
import featuresReducer from "./features.slice";
import userReducer from "./user.slice";

export let myStore = configureStore({
  reducer: {
    menuReducer,
    headerReducer,
    movieReducer,
    featuresReducer,
    userReducer,
  },
});
