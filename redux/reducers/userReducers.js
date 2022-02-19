import {
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	REGISTER_USER_REQUEST,
	CLEAR_ERRORS,
} from '../constants/userConstants';

// auth reducer

export const authReducer = (state = { user: null }, action) => {
	switch (action.type) {
		case REGISTER_USER_REQUEST:
			return { loading: true };
		case REGISTER_USER_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case REGISTER_USER_FAIL:
			return {
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return { ...state, error: null };
		default:
			return state;
	}
};
