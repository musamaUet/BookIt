import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';

import {
	isAuthenticatedUser,
	isAuthorizeRoles,
} from '../../../../middlewares/auth';
import { allAdminRooms } from '../../../../controllers/roomControllers';
import onError from '../../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, isAuthorizeRoles('admin')).get(allAdminRooms);

export default handler;
