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
        },
        follow_user: (state, action) => {
            state.userInfo.following.push(action.payload)
        },
        unfollow_user: (state, action) => {
            state.userInfo.following = state.userInfo.following.filter(id => id !== action.payload)
        },
        update_blocked_users: (state, action) => {
            const userId = action.payload;
            
            const isBlocked = state.userInfo.blockedUsers.includes(userId)
            if (!isBlocked) {
                state.userInfo.blockedUsers.push(userId)
            } else {
                state.userInfo.blockedUsers = state.userInfo.blockedUsers.filter(id => id !== userId);
            }
        }
    }
})

export const { set_credentials, clear_credetials, follow_user, unfollow_user, update_blocked_users } = authSlice.actions;

export default authSlice.reducer;