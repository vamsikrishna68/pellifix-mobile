
import axios from "axios";

axios.defaults.baseURL = 'https://api.pellifix.com/v1'

export const login = (email, password) => {
    return axios.post("/customer/login", {
        "email_id": email,
        "password": password,
    });
}


export const register = (payload) => {
    return axios.post("/customer/register", payload);
}

export const submitOtp = (payload) => {
    return axios.post("/customer/otp/verify", payload);
}
