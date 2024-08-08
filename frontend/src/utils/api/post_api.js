import postInstance from "../../axios_instaces/postInstance";
import { toast } from "react-toastify";

export const createPost = async (data) => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
    };

    try {
        const formData = new FormData(); 

        // Append text data
        if (data.caption) formData.append('caption', data.caption);
        if (data.blogContent) formData.append('blogContent', data.blogContent);
        if (data.contentType) formData.append('contentType', data.contentType);

        // Append files
        if (data.files && data.files.length > 0) {
            for (let i = 0; i < data.files.length; i++) {
                formData.append('image', data.files[i]);
            }
        }

        const response = await postInstance.post('/create', formData, config);

        if (response) {
            toast.success('Post created Successfully');
        }
    } catch (error) {
        toast.error(error.response?.data?.error || 'An error occurred'); // Added fallback for error message
        console.log(error);
    }
};

export const getPosts = async () => {
    try {
        const response = await postInstance.get('/get-posts')
        // console.log('posts:', response.data);
        return response.data
    } catch (error) {
        console.log(error.response.data);
    }
}

export const deletePost = async (id) => {
    try {
        const response = await postInstance.delete(`/delete-post/${id}`)
        console.log('Post deleted successfully:', response.data);
        toast.success(response.data.message)
    } catch (error) {
        console.log(error.response)
    }
}

export const fetchPostByIdApi = async (id) => {
    try {
        const response = await postInstance.get(`/fetch-post-data/${id}`)
        console.log('Post fetched by id successfully:', response.data);
        return response.data;
    } catch (error) {
        console.log(error.response)
    }
}

export const updatePostApi = async (id, postData) => {
    try {
        const response = await postInstance.put(`/update-post/${id}`, postData)
        console.log('Post updated successfully:', response.data);
        toast.success(response.data.message);
    } catch (error) {
        console.log(error.response)
    }
}

export const archivePostApi = async (id) => {
    try {
        const response = await postInstance.post(`/archive-post/${id}`)
        toast.success(response.data.message);
    } catch (error) {
        console.log(error.response);
    }
}

export const fetchArchivedPostsApi = async (id) => {
    try {
        const response = await postInstance.get('/fetch-archived-posts')
        return response.data.archivePosts;
    } catch (error) {
        console.log(error.response);
    }
}

export const likeOrUnlikePostApi = async (postId) => {
    try {
        const response = await postInstance.post(`/like/${postId}`)
        return response.data
    } catch (error) {
        console.error('Failed to like post:', error);
        throw error;
    }
}

export const addCommentApi = async (data) => {
    try {
        const response = await postInstance.post('/add-comment', data);
        return response.data
    } catch (error) {
        console.error('Failed to add comment:', error);
        throw error;
    }
}

export const fetchCommentsApi = async (id) => {
    try {
        const response = await postInstance.get(`/fetch-comments/${id}`);
        console.log('fetching comment:', response.data.comments);
        return response.data.comments[0]
    } catch (error) {
        console.error('Failed to fetch comments:', error);
        throw error;
    }
}