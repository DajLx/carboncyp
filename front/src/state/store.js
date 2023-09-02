import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user";
import colorReducer from "./color";
import favoritesReducer from "./favorites"

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    color: colorReducer,
    favorites: favoritesReducer
  },
});

export default store;
