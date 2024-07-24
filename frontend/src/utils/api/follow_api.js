import followInstance from "../../axios_instaces/followInstance";

export const fetchSuggestionsApi = async () => {
    try {
       const response = await followInstance.get('/fetch-suggestions');
       console.log(response.data);
       return response.data
    } catch (error) {
        console.log('error fetching notification page:', error);
    }
}