import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';

import { isAuthenticatedUser } from '../../../middlewares/auth';
import { checkBookedDatesOfRoom } from '../../../controllers/bookingControllers';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(checkBookedDatesOfRoom);

export default handler;
