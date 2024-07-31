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
        },
        like_post: (state, action) => {
            const { postId, userId } = action.payload;
            const post = state.find(post => post._id === post);
            if (post){
                post.likes.push(userId)
            }
        }
    }
})

export const { set_posts, delete_post, like_post } = postSlice.actions;
export default postSlice.reducer