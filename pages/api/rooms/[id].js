import nc from 'next-connect';
import {
	deleteRoom,
	getSingleRoom,
	updateRoom,
} from '../../../controllers/roomControllers';
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middlewares/errors';
import {
	isAuthenticatedUser,
	isAuthorizeRoles,
} from '../../../middlewares/auth';

const handler = nc({ onError });
dbConnect();

handler.get(getSingleRoom);
handler.use(isAuthenticatedUser, isAuthorizeRoles('admin')).put(updateRoom);
handler.use(isAuthenticatedUser, isAuthorizeRoles('admin')).delete(deleteRoom);

export default handler;
