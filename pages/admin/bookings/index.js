import React from 'react';
import { getSession } from 'next-auth/react';
import Layout from '../../../components/layout/Layout';
import AllBookings from '../../../components/admin/AllBookings';

export default function AllBookingsPage() {
	return (
		<Layout>
			<AllBookings title='All Bookings' />
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });
	if (!session || session.user.role !== 'admin') {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
}
