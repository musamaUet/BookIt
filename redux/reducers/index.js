import { combineReducers } from 'redux';
import {
	allRoomsReducer,
	roomDetailsReducer,
	newReviewReducer,
	checkReviewReducer,
	newRoomReducer,
	roomReducer,
} from './roomReducers';
import {
	authReducer,
	loadedUserReducer,
	userReducer,
	forgotPasswordReducer,
} from './userReducers';
import {
	checkBookingReducer,
	bookedDatesReducer,
	bookingsReducer,
	bookingDetailsReducer,
	bookingReducer,
} from './bookingReducers';

const reducer = combineReducers({
	allRooms: allRoomsReducer,
	newRoom: newRoomReducer,
	room: roomReducer,
	roomDetails: roomDetailsReducer,
	auth: authReducer,
	loadedUser: loadedUserReducer,
	user: userReducer,
	forgotPassword: forgotPasswordReducer,
	checkBooking: checkBookingReducer,
	bookedDates: bookedDatesReducer,
	bookings: bookingsReducer,
	booking: bookingReducer,
	bookingDetails: bookingDetailsReducer,
	newReview: newReviewReducer,
	checkReview: checkReviewReducer,
});
export default reducer;
