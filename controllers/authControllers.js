import User from '../models/User';
import ErrorHandler from '../utils/erorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import APIFeatures from '../utils/apiFeatures';
import cloudinary from 'cloudinary';

// setting up cloudinary config
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @method          GET
// @path            /api/auth/register
// @description     Register new user
const registerUser = catchAsyncErrors(async (req, res) => {
	console.log('inside register User');

	const { name, email, password, avatar } = req.body;
	const imgResult = await cloudinary.v2.uploader.upload(avatar, {
		folder: 'bookIt/avatars',
		width: '150',
		crop: 'scale',
	});
	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: imgResult.public_id,
			url: imgResult.secure_url,
		},
	});

	res
		.status(200)
		.json({ success: true, message: 'Account registered successfully.' });
});

// @method          POST
// @path            /api/me
// @description     Get current user profile
const currentUserProfile = catchAsyncErrors(async (req, res) => {
	const user = await User.findById(req.user._id);
	res.status(200).json({
		success: true,
		user,
	});
});

export { registerUser, currentUserProfile };
