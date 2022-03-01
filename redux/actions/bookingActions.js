import axios from 'axios';
import {
	CHECK_BOOKING_REQUEST,
	CHECK_BOOKING_SUCCESS,
	CHECK_BOOKING_FAIL,
	CLEAR_ERRORS,
	BOOKED_DATES_SUCCESS,
	BOOKED_DATES_FAIL,
	MY_BOOKINGS_FAIL,
	MY_BOOKINGS_SUCCESS,
	BOOKING_DETAILS_FAIL,
	BOOKING_DETAILS_SUCCESS,
} from '../constants/bookingConstants';
import absoluteUrl from 'next-absolute-url';

export const checkBooking = (params) => async (dispatch) => {
	try {
		dispatch({ type: CHECK_BOOKING_REQUEST });

		const { roomId, checkInDate, checkOutDate } = params;
		const url = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;
		const { data } = await axios.get(url);

		dispatch({
			type: CHECK_BOOKING_SUCCESS,
			payload: data.isAvailability,
		});
	} catch (error) {
		dispatch({
			type: CHECK_BOOKING_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const bookedDates = (roomId) => async (dispatch) => {
	try {
		const url = `/api/bookings/check_booked_dates/?roomId=${roomId}`;
		const { data } = await axios.get(url);

		console.log('dates', data);
		dispatch({
			type: BOOKED_DATES_SUCCESS,
			payload: data.bookedDates,
		});
	} catch (error) {
		dispatch({ type: BOOKED_DATES_FAIL, payload: error.response.data.message });
	}
};

export const myBookings = (authCookie, req) => async (dispatch) => {
	try {
		const { origin } = absoluteUrl(req);
		const config = {
			headers: {
				cookie: authCookie,
			},
		};
		const url = `${origin}/api/bookings/me`;
		const { data } = await axios.get(url, config);

		dispatch({
			type: MY_BOOKINGS_SUCCESS,
			payload: data.bookings,
		});
	} catch (error) {
		dispatch({
			type: MY_BOOKINGS_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const getBookingDetails = (authCookie, req, id) => async (dispatch) => {
	const config = {
		headers: {
			cookie: authCookie,
		},
	};
	try {
		const { origin } = absoluteUrl(req);
		const url = `${origin}/api/bookings/${id}`;
		const { data } = await axios.get(url, config);
		dispatch({ type: BOOKING_DETAILS_SUCCESS, payload: data.booking });
	} catch (error) {
		dispatch({
			type: BOOKING_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
