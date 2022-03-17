import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';

import {
	isAuthenticatedUser,
	isAuthorizeRoles,
} from '../../../../middlewares/auth';
import onError from '../../../../middlewares/errors';
import { allAdminBookings } from '../../../../controllers/bookingControllers';

const handler = nc({ onError });

dbConnect();

handler
	.use(isAuthenticatedUser, isAuthorizeRoles('admin'))
	.get(allAdminBookings);

export default handler;
