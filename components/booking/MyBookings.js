import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import Link from 'next/link';

const MyBookings = () => {
	const dispatch = useDispatch();

	const { bookings, error } = useSelector((state) => state.bookings);
	const setBookings = () => {
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
		bookings.forEach((booking) => {
			data.rows.push({
				id: booking._id,
				checkIn: new Date(booking.checkInDate).toLocaleString('en-US'),
				checkOut: new Date(booking.checkOutDate).toLocaleString('en-US'),
				amount: `$${booking.amountPaid}`,
				actions: (
					<Fragment>
						<Link href={`/bookings/${booking._id}`}>
							<a className='btn btn-primary'>
								<i className='fa fa-eye'></i>
							</a>
						</Link>

						<button
							className='btn btn-success mx-2'
							onClick={() => downloadInvoice(booking)}
						>
							<i className='fa fa-download'></i>
						</button>
					</Fragment>
				),
			});
		});
		return data;
	};

	return (
		<div className='container container-fluid'>
			<h1 className='my-5'>My Bookings</h1>
			<MDBDataTable
				data={setBookings()}
				className='px-3'
				bordered
				striped
				hover
			/>
		</div>
	);
};

export default MyBookings;
