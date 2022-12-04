import axios from 'axios';
import {apiService} from '.';

axios.defaults.baseURL = 'https://api.pellifix.com/v1';

export const login = (email, password) => {
  return axios.post('/customer/login', {
    email_id: email,
    password: password,
  });
};

export const register = payload => {
  return axios.post('/customer/register', payload);
};

export const forgotPasswordRequest = payload => {
  return axios.post('/customer/password/reset', payload);
};

export const submitOtp = payload => {
  return axios.post('/customer/otp/verify', payload);
};

export const getDropdownValues = () => {
  return apiService({
    url: '/reference/drop-down',
    method: 'GET',
  });
};

export const getEditPreference = () => {
  return apiService({
    url: '/profile/preferences',
    method: 'GET',
  });
};

export const patchEditPreference = () => {
  return apiService({
    url: '/profile/preferences',
    method: 'PATCH',
  });
};
