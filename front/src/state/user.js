import { createAction, createReducer } from "@reduxjs/toolkit"

export const setUser = createAction("SET_USER")
const initialState = {}

const reducer = createReducer(initialState, {
    [setUser]: (state, action) => state = action.payload
})

export default reducer