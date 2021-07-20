import { createCustomerByEmail } from '../../api/customer';
import { SET_ME } from './types';

// async function
export const createCustomer = ({ fullName, phone, email, vCode }) => {
    return async dispatch => {
        const { data } = await createCustomerByEmail({ fullName, phone, email, vCode });
        dispatch({
            type: SET_ME,
            payload: data,
        });
    };
};
