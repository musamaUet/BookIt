import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';

import { isAuthenticatedUser } from '../../../middlewares/auth';
import {
	createRoomReview,
	deleteReview,
	getRoomReviews,
} from '../../../controllers/roomControllers';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(createRoomReview);
handler.use(isAuthenticatedUser).get(getRoomReviews);
handler.use(isAuthenticatedUser).delete(deleteReview);

export default handler;
