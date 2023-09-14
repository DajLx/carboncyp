import { createAction, createReducer } from "@reduxjs/toolkit";

export const setTheme = createAction("CREATE_ACTION");

const initialState = false;
const reducer = createReducer(initialState, {
  [setTheme]: (state, action) => action.payload,
});

export default reducer;
