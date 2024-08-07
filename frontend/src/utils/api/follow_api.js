import followInstance from "../../axios_instaces/followInstance";

export const fetchSuggestionsApi = async () => {
    try {
       const response = await followInstance.get('/fetch-suggestions');
    //    console.log('res api:', response.data);
       return response.data
    } catch (error) {
        console.log('error fetching notification page:', error);
    }
}

export const followUserApi = async (id) => {
    try {
        const response = await followInstance.post(`/follow-user/${id}`)
        console.log('reapi:', response.data);
        return response.data.id;
    } catch (error) {
        console.log('error following the user:', error);
    }
}

export const unoFllowUserApi = async (id) => {
    try {
        const response = await followInstance.post(`/unfollow-user/${id}`)
        console.log('res,,,,, api:', response.data.id);
        return response.data.id;
    } catch (error) {
        console.log('error following the user:', error);
    }
}

export const fetchFollowers = async (id) => {
    try {
        const response = await followInstance.get(`/fetch-followers/${id}`);
        return response.data;
    } catch (error) {
        console.log('error fetching followers', error);
    }
}

export const fetchFollowing = async (id) => {
    try {
        const response = await followInstance.get(`/fetch-following/${id}`);
        return response.data;
    } catch (error) {
        console.log('error fetching followers', error);
    }
}