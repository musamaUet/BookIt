import React from 'react';
import { getSession } from 'next-auth/react';
import Layout from '../../components/layout/Layout';
import RoomReviews from '../../components/admin/RoomReviews';

export default function RoomReviewsPage() {
	return (
		<Layout>
			<RoomReviews title='Room Reviews' />
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
