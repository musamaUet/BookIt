import nc from 'next-connect';
import { allRooms, newRoom } from '../../../controllers/roomControllers';
import dbConnect from '../../../config/dbConnect';

const handler = nc();
dbConnect();

handler.get(allRooms);
handler.post(newRoom);

export default handler;
