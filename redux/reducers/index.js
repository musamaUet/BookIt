import { combineReducers } from 'redux';
import {
	allRoomsReducer,
	roomDetailsReducer,
	newReviewReducer,
	checkReviewReducer,
	newRoomReducer,
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
	myBookingsReducer,
	bookingDetailsReducer,
} from './bookingReducers';

const reducer = combineReducers({
	allRooms: allRoomsReducer,
	newRoom: newRoomReducer,
	roomDetails: roomDetailsReducer,
	auth: authReducer,
	loadedUser: loadedUserReducer,
	user: userReducer,
	forgotPassword: forgotPasswordReducer,
	checkBooking: checkBookingReducer,
	bookedDates: bookedDatesReducer,
	bookings: myBookingsReducer,
	bookingDetails: bookingDetailsReducer,
	newReview: newReviewReducer,
	checkReview: checkReviewReducer,
});
export default reducer;
