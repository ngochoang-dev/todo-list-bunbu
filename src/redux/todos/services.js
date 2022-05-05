import axiosInstance from '../../axios';
const axios = axiosInstance();


export const handleCreateTodo = async (payload) => {
    return await axios.post(`/todo`, payload);
}

export const handleGetTodo = async (payload) => {
    return await axios.get(`/todo?page=${payload}`);
}

export const handleDeleteTodo = async (payload) => {
    return await axios.delete(`/todo/${payload}`)
}

export const handleUpdateTodo = async (payload) => {
    return await axios.patch(`/todo`, payload)
}