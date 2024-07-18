import postInstance from "../../axios_instaces/postInstance";
import { toast } from "react-toastify";

export const createPost = async (data, contentType) => {
    try {
        const response = await postInstance.post('/create',
            { contentType, ...data }
        )
        if (response) {
            toast.success('Post created Successfully')
        }
    } catch (error) {
        toast.error(error.response.data.error)
        console.log(error);
    }
}

export const getPosts = async () => {
    try {
        const response = await postInstance.get('/get-posts')
        console.log('posts:', response.data.posts);
        return response.data.posts
    } catch (error) {
        console.log(error.response.data);
    }
}

export const deletePost = async () => {
    try {
        const response = await postInstance.delete(`/delete-post/:${id}` )
    } catch (error) {
        console.log(error.response)
    }
}