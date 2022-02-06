import nc from 'next-connect';
import {
	deleteRoom,
	getSingleRoom,
	updateRoom,
} from '../../../controllers/roomControllers';
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });
dbConnect();

handler.get(getSingleRoom);
handler.put(updateRoom);
handler.delete(deleteRoom);

export default handler;
