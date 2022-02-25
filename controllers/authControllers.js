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

// @method          POST
// @path            /api/me/update
// @description     Update current user profile
const updateUserProfile = catchAsyncErrors(async (req, res) => {
	const { name, email, password, avatar } = req.body;

	const user = await User.findById(req.user._id);
	if (!user) return res.status(400).json({ msg: 'no user found with this id' });
	user.name = name ? name : user.name;
	user.email = email ? email : user.email;
	user.password = password ? password : user.password;

	if (avatar) {
		await cloudinary.v2.uploader.destroy(user.avatar.public_id);
		const imgResult = await cloudinary.v2.uploader.upload(avatar, {
			folder: 'bookIt/avatars',
			width: '150',
			crop: 'scale',
		});
		user.avatar = {
			public_id: imgResult.public_id,
			url: imgResult.secure_url,
		};
	}

	await user.save();
	res.status(200).json({
		success: true,
		user,
	});
});

export { registerUser, currentUserProfile, updateUserProfile };
