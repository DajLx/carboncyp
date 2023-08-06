import { createAction, createReducer } from "@reduxjs/toolkit";

export const setColor = createAction("SET_COLOR");

const initialState = "#FFB800";

const reducer = createReducer(initialState, {
  [setColor]: (state, action) => action.payload,
});
export default reducer;
