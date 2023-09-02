import { createAction, createReducer } from "@reduxjs/toolkit";

export const setColor = createAction("SET_COLOR");

const initialState = { color1: "#FFB800", color2: "#1A1A1A" };

const reducer = createReducer(initialState, {
  [setColor]: (state, action) => action.payload,
});
export default reducer;
