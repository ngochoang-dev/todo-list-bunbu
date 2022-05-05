import axiosInstance from '../../axios';

const axios = axiosInstance();

export const handleSignup = async (payload) => {
    return await axios.post(`/user`, payload);
}

export const handleSignin = async (payload) => {
    return await axios.post(`/user/sign-in`, payload);
}