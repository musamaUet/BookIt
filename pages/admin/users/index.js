import React from 'react';
import { getSession } from 'next-auth/react';
import Layout from '../../../components/layout/Layout';
import AllUsers from '../../../components/admin/AllUsers';

export default function AllUsersPage() {
	return (
		<Layout>
			<AllUsers title='All Users' />
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
