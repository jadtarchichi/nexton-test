import axios from 'axios'

export const getSearch = (searchText) => {
    return axios.get(process.env.VUE_APP_APIURL + `/contents?search=title=${searchText}`);
}

export const getDetails = (mode, id) => {
    return axios.get(
        process.env.VUE_APP_APIURL + `/details/${mode}/${id}`);
}