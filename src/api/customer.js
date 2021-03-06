import axios from './api.request';

/**
 * get verification code by email
 * */
export const getVerificationCodeByEmail = email => {
    return axios.request({
        url: '/api/getVerificationCodeByEmail',
        data: { email },
        method: 'post',
    });
};

export const createCustomerByEmail = ({ fullName, phone, email, vCode }) => {
    return axios.request({
        url: '/api/createCustomerByEmail',
        data: { fullName, phone, email, vCode },
        method: 'post',
    });
};
