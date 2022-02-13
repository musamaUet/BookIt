import nc from 'next-connect';
import { registerUser } from '../../../controllers/authControllers';
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });
dbConnect();

handler.post(registerUser);

export default handler;
