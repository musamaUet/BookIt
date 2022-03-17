import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';

import {
	isAuthenticatedUser,
	isAuthorizeRoles,
} from '../../../../middlewares/auth';
import onError from '../../../../middlewares/errors';
import { deleteBooking } from '../../../../controllers/bookingControllers';

const handler = nc({ onError });

dbConnect();

handler
	.use(isAuthenticatedUser, isAuthorizeRoles('admin'))
	.delete(deleteBooking);

export default handler;
