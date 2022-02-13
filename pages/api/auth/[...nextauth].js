import NextAuth from 'next-auth/next';
import Providers from 'next-auth/providers/credentials';
import User from '../../../models/User';
import dbConnect from '../../../config/dbConnect';

export default NextAuth({
	session: { jwt: true },
	providers: [
		Providers({
			async authorize(credentials) {
				dbConnect();
				const { email, password } = credentials;
				if (!email || !password) throw new Error('Invalid email or password');
				let user = await User.findOne({ email }).select('+password');
				if (!user) throw new Error('User does not exists');
				const isPasswordMatched = await user.comparePassword(
					password,
					user.password
				);
				if (!isPasswordMatched) throw new Error('Password not matched');

				return Promise.resolve(user);
			},
		}),
	],
	// callbacks are async functions you can use when a specific action performed.
	callbacks: {
		jwt: async (token, user) => {
			user && (token.user = user);
			return Promise.resolve(user);
		},
		session: async (session, user) => {
			console.log('session & user inside jwt callback', session, user);
			session.user = user.user;
			return Promise.resolve(session);
		},
	},
});
