import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import Link from 'next/link';
import easyinvoice from 'easyinvoice';

const MyBookings = () => {
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

		bookings &&
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

	const downloadInvoice = async (booking) => {
		const data = {
			documentTitle: 'Booking INVOICE', //Defaults to INVOICE
			currency: 'USD',
			taxNotation: 'gst', //or gst
			marginTop: 25,
			marginRight: 25,
			marginLeft: 25,
			marginBottom: 25,
			images: {
				logo: 'https://res.cloudinary.com/usamarabbani/image/upload/v1645781302/bookIt/avatars/lh71xhk1fjhnnmwqc9e5.png',
			},
			sender: {
				company: 'Book IT',
				address: '13th Street. 47 W 13th St',
				zip: '10001',
				city: 'New York',
				country: 'United States',
			},
			client: {
				company: `${booking.user.name}`,
				address: `${booking.user.email}`,
				zip: '',
				city: `Check In: ${new Date(booking.checkInDate).toLocaleString(
					'en-US'
				)}`,
				country: `Check In: ${new Date(booking.checkOutDate).toLocaleString(
					'en-US'
				)}`,
			},
			invoiceNumber: `${booking._id}`,
			invoiceDate: `${new Date(Date.now()).toLocaleString('en-US')}`,

			information: {
				number: `${booking._id}`,
				date: `${new Date(Date.now()).toLocaleString('en-US')}`,
				'due-date': `${new Date(Date.now()).toLocaleString('en-US')}`,
			},
			products: [
				{
					quantity: `${booking.daysOfStay}`,
					description: `${booking.room.name}`,
					'tax-rate': 6,
					price: booking.room.pricePerNight,
				},
			],
			bottomNotice:
				'This is auto generated Invoice of your booking on Book IT.',
		};

		const result = await easyinvoice.createInvoice(data);
		easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf);
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
