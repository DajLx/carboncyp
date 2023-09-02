import { createAction, createReducer } from "@reduxjs/toolkit";

export const setFavorite = createAction("SET_FAVORITE");
export const addFavorite = createAction("ADD_FAVORITE");

const initialState = [];

const reducer = createReducer(initialState, {
  [setFavorite]: (state, action) => action.payload,
  [addFavorite]: (state, action) => {
    console.log(state);
    return state.concat(action.payload);
  },
});

export default reducer;
