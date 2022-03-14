import React from 'react';
import { getSession } from 'next-auth/react';
import Layout from '../../../components/layout/Layout';
import UpdateRoom from '../../../components/admin/UpdateRoom';

export default function AllRoomsPage() {
	return (
		<Layout>
			<UpdateRoom title='Update Admin Rooms' />
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
