import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'posts',
    initialState: [],
    reducers: {
        set_posts: (state, action) => {
            return action.payload;
        },
    }
})

export const { set_posts } = postSlice.actions;
export default postSlice.reducer