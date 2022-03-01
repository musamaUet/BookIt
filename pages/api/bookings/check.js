import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';

import { isAuthenticatedUser } from '../../../middlewares/auth';
import { checkRoomBookingsAvailability } from '../../../controllers/bookingControllers';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(checkRoomBookingsAvailability);

export default handler;
