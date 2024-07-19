import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        set_credentials: (state, action) => {
            state.userInfo = action.payload;
        },
        clear_credetials: (state, action) => {
            state.userInfo = null
        }
    }
})

export const { set_credentials, clear_credetials } = authSlice.actions;

export default authSlice.reducer;