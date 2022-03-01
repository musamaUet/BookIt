import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MDBTable } from 'mdbreact';

const MyBookings = () => {
	const data = {
		columns: [
			{
				label: 'Booking ID',
				field: 'id',
				sort: 'asc',
			},
			{
				label: 'CheckIn',
				field: 'checkIn',
				sort: 'asc',
			},
			{
				label: 'CheckOut',
				field: 'checkOut',
				sort: 'asc',
			},
			{
				label: 'Amount Paid',
				field: 'amount',
				sort: 'asc',
			},
			{
				label: 'Actions',
				field: 'actions',
				sort: 'asc',
			},
		],
		rows: [],
	};
	return <div>This is My Bookings Component.</div>;
};

export default MyBookings;
