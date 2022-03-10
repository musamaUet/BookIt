import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { clearErrors } from '../../redux/actions/roomActions';
import { Carousel } from 'react-bootstrap';
import Image from 'next/image';
import RoomFeatures from './RoomFeatures';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { useRouter } from 'next/router';
import { checkBooking, bookedDates } from '../../redux/actions/bookingActions';
import { CHECK_BOOKING_RESET } from '../../redux/constants/bookingConstants';
import getStripe from '../../utils/getStripe';

import 'react-datepicker/dist/react-datepicker.css';

const RoomDetails = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { id: roomId } = router.query;
	const { room, error } = useSelector((state) => state.roomDetails);
	const { available, loading: bookingLoading } = useSelector(
		(state) => state.checkBooking
	);
	const { user } = useSelector((state) => state.loadedUser);
	const { dates } = useSelector((state) => state.bookedDates);

	let excludedDates = [];
	dates.forEach((date) => {
		excludedDates.push(new Date(date));
	});

	const [checkInDate, setCheckInDate] = useState();
	const [checkOutDate, setCheckOutDate] = useState();
	const [daysOfStay, setDaysOfStay] = useState(0);
	const [paymentLoading, setPaymentLoading] = useState(false);

	useEffect(() => {
		dispatch(bookedDates(roomId));
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		return () => dispatch({ type: CHECK_BOOKING_RESET });
	}, [dispatch, roomId, error]);

	const onDateChange = (dates) => {
		const [checkInDate, checkOutDate] = dates;
		setCheckInDate(checkInDate);
		setCheckOutDate(checkOutDate);
		if (checkInDate && checkOutDate) {
			const days = Math.floor(
				(new Date(checkOutDate) - new Date(checkInDate)) / 84600000 + 1
			);
			const params = {
				roomId,
				checkInDate: checkInDate.toISOString(),
				checkOutDate: checkOutDate.toISOString(),
			};
			dispatch(checkBooking(params));
			setDaysOfStay(days);
		}
	};

	const newBookingHandler = async () => {
		const bookingData = {
			room: router.query.id,
			checkInDate,
			checkOutDate,
			daysOfStay,
			amountPaid: 90,
			paymentInfo: {
				id: 'STRIPE_PAYMENT_ID',
				status: 'STRIPE_PAYMENT_STATUS',
			},
		};
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const { data } = await axios.post('/api/bookings', bookingData, config);
			console.log('apiData', data);
		} catch (error) {
			console.log('bookAvailability error', error);
			toast.error(error);
		}
	};

	const bookMe = async (id, pricePerNight) => {
		try {
			setPaymentLoading(true);

			const amount = pricePerNight * daysOfStay;
			const url = `/api/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkoutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`;
			const { data } = await axios.get(url, { params: { amount } });
			const stripe = await getStripe();
			stripe.redirectToCheckout({ sessionId: data.id });
			setPaymentLoading(false);
		} catch (error) {
			setPaymentLoading(false);
			console.log('error', error);
			toast.error(error);
		}
	};
	return room ? (
		<React.Fragment>
			<Head>
				<title>{room?.name} - BookIt</title>
			</Head>
			<div className='container container-fluid'>
				<h2 className='mt-5'>{room?.name}</h2>
				<p>{room.address}</p>
				<div className='ratings mt-auto mb-3'>
					<div className='rating-outer'>
						<div
							className='rating-inner'
							style={{ width: (room?.review / 5) * 100 }}
						/>
					</div>
					<span id='no_of_reviews'>({room.numOfReviews} Reviews)</span>
				</div>

				<Carousel hover='pause'>
					{room.images &&
						room.images.map((image) => (
							<Carousel.Item key={image.public_id}>
								<div style={{ width: '100%', height: '440px' }}>
									<Image src={image.url} alt={image.name} layout='fill' />
								</div>
							</Carousel.Item>
						))}
				</Carousel>

				<div className='row my-5'>
					<div className='col-12 col-md-6 col-lg-8'>
						<h3>Description</h3>
						<p>{room.description}</p>
					</div>
					<div className='col-12 col-md-6 col-lg-4'>
						<div className='booking-card shadow-lg p-4'>
							<p className='price-per-night'>
								<b>${room.pricePerNight}</b> / night
							</p>
							<div className='mt-5 mb-3'>
								<p>Pick CheckIn & Checkout Date</p>
								<hr />
								<DatePicker
									className='w-100'
									selected={checkInDate}
									startDate={checkInDate}
									endDate={checkOutDate}
									onChange={onDateChange}
									minDate={Date.now()}
									excludeDates={excludedDates}
									selectsRange
									inline
								/>
								{available === true && (
									<div className='alert alert-success my-3 font-weight-bold'>
										Room is available. Book now.
									</div>
								)}

								{available === false && (
									<div className='alert alert-danger my-3 font-weight-bold'>
										Room not available. Try different dates.
									</div>
								)}

								{available && !user && (
									<div className='alert alert-danger my-3 font-weight-bold'>
										Login to book room.
									</div>
								)}

								{available && user && (
									<button
										className='btn btn-block py-3 booking-btn'
										onClick={() => {
											bookMe(room._id, room.pricePerNight);
										}}
										disabled={bookingLoading || paymentLoading ? true : false}
									>
										Pay - ${daysOfStay * room.pricePerNight}
									</button>
								)}
							</div>
						</div>
					</div>
					<RoomFeatures room={room} />
				</div>

				<div className='reviews w-75'>
					<h3>Reviews:</h3>
					<hr />
					<div className='review-card my-3'>
						<div className='rating-outer'>
							<div className='rating-inner'></div>
						</div>
						<p className='review_user'>by John</p>
						<p className='review_comment'>Good Quality</p>

						<hr />
					</div>

					<div className='review-card my-3'>
						<div className='rating-outer'>
							<div className='rating-inner'></div>
						</div>
						<p className='review_user'>by John</p>
						<p className='review_comment'>Good Quality</p>

						<hr />
					</div>
				</div>
			</div>
		</React.Fragment>
	) : null;
};
export default RoomDetails;
