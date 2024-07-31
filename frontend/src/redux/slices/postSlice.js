import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'posts',
    initialState: [],
    reducers: {
        set_posts: (state, action) => {
            return action.payload;
        },
        delete_post: (state, action) => {
            return state.filter(post => post._id !== action.payload)
        }
    }
})

export const { set_posts, delete_post } = postSlice.actions;
export default postSlice.reducer