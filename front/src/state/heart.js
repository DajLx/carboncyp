import { createAction, createReducer } from "@reduxjs/toolkit";

export const setHeart = createAction("SET_HEART");

const initialState = false;

const reducer = createReducer(initialState, {
  [setHeart]: (state, action) => action.payload,
});
export default reducer;
