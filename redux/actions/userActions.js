import axios from 'axios';
import {
	REGISTER_USER_SUCCESS,
	REGISTER_USER_REQUEST,
	REGISTER_USER_FAIL,
} from '../constants/userConstants';

export const registerUser = (userData) => (dispatch) => {
	try {
		dispatch({ type: REGISTER_USER_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'Application/json',
			},
		};
		const { data } = axios.post('/api/auth/register', userData, config);
		dispatch({
			type: REGISTER_USER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({ type: REGISTER_USER_FAIL, error: error.response.data.message });
	}
};

// Clear Errors

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
