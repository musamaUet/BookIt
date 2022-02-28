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

import 'react-datepicker/dist/react-datepicker.css';

const RoomDetails = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { room, error } = useSelector((state) => state.roomDetails);

	const [checkInDate, setCheckInDate] = useState();
	const [checkOutDate, setCheckOutDate] = useState();
	const [daysOfStay, setDaysOfStay] = useState(0);

	useEffect(() => {
		toast.error(error);
		dispatch(clearErrors());
	}, [dispatch, error]);

	const onChange = (dates) => {
		console.log('dates ==>', dates);
		const [checkInDate, checkOutDate] = dates;
		setCheckInDate(checkInDate);
		setCheckOutDate(checkOutDate);
		if (checkInDate && checkOutDate) {
			const days = Math.floor(
				(new Date(checkInDate) - new Date(checkOutDate)) / 84600000 + 1
			);
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
		} catch (error) {}
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
									onChange={onChange}
									selectsRange
									inline
								/>
							</div>
							<button
								className='btn btn-block py-3 booking-btn'
								onClick={newBookingHandler}
							>
								Pay
							</button>
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
