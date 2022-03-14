import nc from 'next-connect';
import { allRooms, newRoom } from '../../../controllers/roomControllers';
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middlewares/errors';
import {
	isAuthenticatedUser,
	isAuthorizeRoles,
} from '../../../middlewares/auth';

const handler = nc({ onError });
dbConnect();

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '50mb',
		},
	},
};

handler.get(allRooms);
handler.use(isAuthenticatedUser, isAuthorizeRoles('admin')).post(newRoom);

export default handler;
