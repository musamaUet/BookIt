import axios from 'axios';
import {
	CHECK_BOOKING_REQUEST,
	CHECK_BOOKING_SUCCESS,
	CHECK_BOOKING_RESET,
	CHECK_BOOKING_FAIL,
	CLEAR_ERRORS,
} from '../constants/bookingConstants';

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
		dispatch({ type: CHECK_BOOKING_FAIL, error: error.response.data.message });
	}
};

// Clear Errors

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
