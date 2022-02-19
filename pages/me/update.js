import React from 'react';
import { getSession } from 'next-auth/react';

export default function UpdateProfile(props) {
	return (
		<div>
			<h4>This is update profile page</h4>
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });
	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}
	return {
		props: { session },
	};
}
