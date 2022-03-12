import {
	ALL_ROOMS_FAIL,
	ALL_ROOMS_SUCCESS,
	CLEAR_ERRORS,
	NEW_REVIEW_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_RESET,
	NEW_REVIEW_SUCCESS,
	REVIEW_AVAILABILITY_FAIL,
	REVIEW_AVAILABILITY_REQUEST,
	REVIEW_AVAILABILITY_SUCCESS,
	ROOM_DETAILS_FAIL,
	ROOM_DETAILS_SUCCESS,
} from '../constants/roomConstants';

// All rooms reducer

export const allRoomsReducer = (state = { room: [] }, action) => {
	switch (action.type) {
		case ALL_ROOMS_SUCCESS:
			return {
				roomsCount: action.payload.roomsCount,
				resPerPage: action.payload.resPerPage,
				filteredRoomCount: action.payload.filteredRoomsCount,
				rooms: action.payload.rooms,
			};
		case ALL_ROOMS_FAIL:
			return {
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return { ...state, error: null };
		default:
			return state;
	}
};

// room details reducer

export const roomDetailsReducer = (state = { room: {} }, action) => {
	switch (action.type) {
		case ROOM_DETAILS_SUCCESS:
			return { room: action.payload };
		case ROOM_DETAILS_FAIL:
			return {
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return { ...state, error: null };
		default:
			return state;
	}
};

// new review reducer

export const newReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case NEW_REVIEW_REQUEST:
			return { loading: true };
		case NEW_REVIEW_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			};
		case NEW_REVIEW_RESET:
			return {
				success: false,
			};
		case NEW_REVIEW_FAIL:
			return { loading: false, error: action.payload };
		case CLEAR_ERRORS:
			return { ...state, error: null };
		default:
			return state;
	}
};

// new review reducer

export const checkReviewReducer = (
	state = { reviewAvailable: null },
	action
) => {
	switch (action.type) {
		case REVIEW_AVAILABILITY_REQUEST:
			return { loading: true };
		case REVIEW_AVAILABILITY_SUCCESS:
			return {
				loading: false,
				reviewAvailable: action.payload,
			};
		case REVIEW_AVAILABILITY_FAIL:
			return { loading: false, error: action.payload };
		case CLEAR_ERRORS:
			return { ...state, error: null };
		default:
			return state;
	}
};
