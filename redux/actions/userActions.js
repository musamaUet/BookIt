import axios from 'axios';
import {
	CLEAR_ERRORS,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_REQUEST,
	REGISTER_USER_FAIL,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAIL,
} from '../constants/userConstants';

export const registerUser = (userData) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_USER_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'Application/json',
			},
		};
		const { data } = await axios.post('/api/auth/register', userData, config);
		dispatch({
			type: REGISTER_USER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({ type: REGISTER_USER_FAIL, error: error.response.data.message });
	}
};

export const loadUser = (userData) => async (dispatch) => {
	try {
		dispatch({ type: LOAD_USER_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'Application/json',
			},
		};
		const { data } = await axios.get('/api/me', userData, config);
		dispatch({
			type: LOAD_USER_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({ type: LOAD_USER_FAIL, error: error.response.data.message });
	}
};

export const updateProfile = (userData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PROFILE_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'Application/json',
			},
		};
		const { data } = await axios.put('/api/me/update', userData, config);
		dispatch({
			type: UPDATE_PROFILE_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_PROFILE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Clear Errors

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
