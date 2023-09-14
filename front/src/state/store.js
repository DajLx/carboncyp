import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user";
import colorReducer from "./color";
import favoritesReducer from "./favorites";
import themeReducer from "./theme";
import heartReducer from "./heart"

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    color: colorReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
    heart: heartReducer
  },
});

export default store;
