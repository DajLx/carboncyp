import { createAction, createReducer } from "@reduxjs/toolkit";

export const setStyle = createAction("SET_STYLE");

const initialState = "prism";

const reducer = createReducer(initialState, {
  [setStyle]: (state, action) => action.paylodad,
});

export default reducer;
