import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';

import {
	isAuthenticatedUser,
	isAuthorizeRoles,
} from '../../../../middlewares/auth';
import onError from '../../../../middlewares/errors';
import {
	getUserDetails,
	updateUser,
	deleteUser,
} from '../../../../controllers/authControllers';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, isAuthorizeRoles('admin')).get(getUserDetails);
handler.use(isAuthenticatedUser, isAuthorizeRoles('admin')).put(updateUser);
handler.use(isAuthenticatedUser, isAuthorizeRoles('admin')).delete(deleteUser);

export default handler;
