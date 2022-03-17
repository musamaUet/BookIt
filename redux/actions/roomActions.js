import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import {
	ALL_ROOMS_FAIL,
	ALL_ROOMS_SUCCESS,
	CLEAR_ERRORS,
	NEW_REVIEW_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_SUCCESS,
	REVIEW_AVAILABILITY_REQUEST,
	REVIEW_AVAILABILITY_SUCCESS,
	REVIEW_AVAILABILITY_FAIL,
	ROOM_DETAILS_FAIL,
	ROOM_DETAILS_SUCCESS,
	ADMIN_ROOMS_REQUEST,
	ADMIN_ROOMS_SUCCESS,
	ADMIN_ROOMS_FAIL,
	NEW_ROOM_REQUEST,
	NEW_ROOM_SUCCESS,
	NEW_ROOM_FAIL,
	UPDATE_ROOM_REQUEST,
	UPDATE_ROOM_SUCCESS,
	UPDATE_ROOM_FAIL,
	DELETE_ROOM_REQUEST,
	DELETE_ROOM_SUCCESS,
	DELETE_ROOM_FAIL,
	DELETE_REVIEW_REQUEST,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_FAIL,
	GET_REVIEWS_REQUEST,
	GET_REVIEWS_SUCCESS,
	GET_REVIEWS_FAIL,
} from '../constants/roomConstants';

// Get all rooms
export const getRooms =
	(req, currentPage = 1, location = '', guests, category) =>
	async (dispatch) => {
		try {
			const { origin } = absoluteUrl(req);
			let link = `${origin}/api/rooms?page=${currentPage}&location=${location}`;

			if (guests) link.concat(`&guestCapacity=${guests}`);
			if (category) link.concat(`&category=${category}`);

			const { data } = await axios.get(link);

			dispatch({ type: ALL_ROOMS_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: ALL_ROOMS_FAIL,
				payload: error.response?.data?.message,
			});
		}
	};

// Get roomDetails
export const getRoomDetails = (req, id) => async (dispatch) => {
	try {
		let url;
		if (req) {
			const { origin } = absoluteUrl(req);
			url = `${origin}/api/rooms/${id}`;
		} else {
			url = `/api/rooms/${id}`;
		}

		const { data } = await axios.get(url);
		dispatch({ type: ROOM_DETAILS_SUCCESS, payload: data.room });
	} catch (error) {
		dispatch({
			type: ROOM_DETAILS_FAIL,
			payload: error.response?.data?.message,
		});
	}
};

// Create New Review
export const newReview = (reviewData) => async (dispatch) => {
	try {
		dispatch({
			type: NEW_REVIEW_REQUEST,
		});
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.put('/api/reviews/', reviewData, config);
		dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: NEW_REVIEW_FAIL,
			payload: error.response?.data?.message,
		});
	}
};

// Check Review Availability
export const checkReviewAvailability = (roomId) => async (dispatch) => {
	try {
		dispatch({
			type: REVIEW_AVAILABILITY_REQUEST,
		});
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.get(
			`/api/reviews/check_review_availability/?roomId=${roomId}`,
			config
		);
		dispatch({
			type: REVIEW_AVAILABILITY_SUCCESS,
			payload: data.isReviewAvailable,
		});
	} catch (error) {
		dispatch({
			type: REVIEW_AVAILABILITY_FAIL,
			payload: error.response?.data?.message,
		});
	}
};

// Get all rooms - ADMIN
export const getAdminRooms = () => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_ROOMS_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.get(`/api/admin/rooms`, config);
		dispatch({
			type: ADMIN_ROOMS_SUCCESS,
			payload: data.rooms,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_ROOMS_FAIL,
			payload: error.response?.data?.message,
		});
	}
};

// Create New Room - ADMIN
export const newRoom = (roomData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_ROOM_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.post(`/api/rooms`, roomData, config);
		dispatch({
			type: NEW_ROOM_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: NEW_ROOM_FAIL,
			payload: error.response?.data?.message,
		});
	}
};

// Update Room - ADMIN
export const updateRoom = (roomId, roomData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_ROOM_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.put(`/api/rooms/${roomId}`, roomData, config);
		dispatch({
			type: UPDATE_ROOM_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_ROOM_FAIL,
			payload: error.response?.data?.message,
		});
	}
};

// Delete Room - ADMIN
export const deleteRoom = (roomId) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_ROOM_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.delete(`/api/rooms/${roomId}`, config);
		dispatch({
			type: DELETE_ROOM_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: DELETE_ROOM_FAIL,
			payload: error.response?.data?.message,
		});
	}
};

export const getRoomReviews = (id) => async (dispatch) => {
	try {
		dispatch({ type: GET_REVIEWS_REQUEST });

		const { data } = await axios.get(`/api/reviews/?id=${id}`);

		dispatch({
			type: GET_REVIEWS_SUCCESS,
			payload: data.reviews,
		});
	} catch (error) {
		dispatch({
			type: GET_REVIEWS_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const deleteReview = (id, roomId) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_REVIEW_REQUEST });

		const { data } = await axios.delete(
			`/api/reviews/?id=${id}&roomId=${roomId}`
		);

		dispatch({
			type: DELETE_REVIEW_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: DELETE_REVIEW_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Clear Errors

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
