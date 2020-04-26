import axios from 'axios';

const axiosInt = axios.create({
    baseURL: process.env.VUE_APP_API,
    withCredentials: false,
    headers: {
        contentType: 'application/json',
    },
});

export const fetchAll = (path) => axiosInt.get(path);
export const updateOne = (path, data) => axiosInt.patch(path, data);
export const deleteOne = (path) => axiosInt.delete(path);
export const createOne = (path, data) => axiosInt.post(path, data);
