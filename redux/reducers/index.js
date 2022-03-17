import { combineReducers } from 'redux';
import {
	allRoomsReducer,
	roomDetailsReducer,
	newReviewReducer,
	checkReviewReducer,
	reviewReducer,
	newRoomReducer,
	roomReducer,
	roomReviewsReducer,
} from './roomReducers';
import {
	authReducer,
	loadedUserReducer,
	userReducer,
	forgotPasswordReducer,
	allUsersReducer,
	userDetailsReducer,
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
	allUsers: allUsersReducer,
	userDetails: userDetailsReducer,
	forgotPassword: forgotPasswordReducer,
	checkBooking: checkBookingReducer,
	bookedDates: bookedDatesReducer,
	bookings: bookingsReducer,
	booking: bookingReducer,
	bookingDetails: bookingDetailsReducer,
	newReview: newReviewReducer,
	roomReviews: roomReviewsReducer,
	review: reviewReducer,
	checkReview: checkReviewReducer,
});
export default reducer;
