import React from 'react';
import Layout from '../../components/layout/Layout';
import { getSession } from 'next-auth/react';
import MyBookings from '../../components/booking/MyBookings';
import { wrapper } from '../../redux/store';
import { myBookings } from '../../redux/actions/bookingActions';

const MyBookingsPage = () => {
	return (
		<Layout title='Bookings'>
			<MyBookings />
		</Layout>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ req }) => {
			const session = await getSession({ req });

			if (!session) {
				return {
					redirect: {
						destination: '/login',
						permanent: false,
					},
				};
			}
			await store.dispatch(myBookings(req.headers.cookie, req));
		}
);

export default MyBookingsPage;
