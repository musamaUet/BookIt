import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';

import {
	isAuthenticatedUser,
	isAuthorizeRoles,
} from '../../../../middlewares/auth';
import onError from '../../../../middlewares/errors';
import { allAdminUsers } from '../../../../controllers/authControllers';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, isAuthorizeRoles('admin')).get(allAdminUsers);

export default handler;
