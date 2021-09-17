import axios from 'axios'

export const getSearch = (value) => {
    return axios.get(process.env.VUE_APP_APIURL + `/contents?search=title=${value}`)
}

export const getDetails = (mode, id) => {
    return axios.get(
        process.env.VUE_APP_APIURL + `/details/${mode}/${id}`)
}