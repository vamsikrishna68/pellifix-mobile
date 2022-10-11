
import axios from "axios";

axios.defaults.baseURL = 'https://api.pellifix.com/v1'

export const login = (email, password) => {
    return axios.get("/customer/login", {
        headers: {
            "x-email-id": email,
            password: password,
            "Content-Type": "application/json",
        },
    });
}

