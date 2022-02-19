import catchAsyncErrors from './catchAsyncErrors';
import { ErrorHandler } from '../utils/erorHandler';
import { getSession } from 'next-auth/react';

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
	const session = getSession({ req });
	if (!session) {
		return next('Login first to access this resource', 401);
	}
	req.user = session.user;
	next();
});

export { isAuthenticatedUser };
