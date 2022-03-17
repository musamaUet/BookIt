import React from 'react';
import { getSession } from 'next-auth/react';
import Layout from '../../../components/layout/Layout';
import UpdateUser from '../../../components/admin/UpdateUser';

export default function UpdateUsersPage() {
	return (
		<Layout>
			<UpdateUser title='Update Users' />
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
