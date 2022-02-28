import User from '../models/User';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import cloudinary from 'cloudinary';
import absoluteUrl from 'next-absolute-url';
import ErrorHandler from '../utils/erorHandler';
import sendEmail from '../utils/sendEmail';
import crypto from 'crypto';

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

// @method          POST
// @path            /api/password/forgot
// @description     Update current user profile
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user)
		return next(new ErrorHandler('User not found with this email', 404));
	const resetToken = await user.getResetPasswordToken();
	await user.save({ validateBeforeSave: false });

	const { origin } = absoluteUrl(req);
	const resetUrl = `${origin}/password/reset/${resetToken}`;
	const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n\ If you have not requested this email, then ignore it.`;
	try {
		await sendEmail({ email, subject: 'BookIT Password Recovery', message });
		res.status(200).json({
			success: true,
			message: `Email sent to: ${email}`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });
		return next(new ErrorHandler(error.message, 500));
	}
});

// @method          POST
// @path            /api/password/rest/:token
// @description     Update current user profile

const resetPassword = catchAsyncErrors(async (req, res, next) => {
	const { token } = req.query;
	const { password, confirmPassword } = req.body;

	//hashed encrypt token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(token)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken: resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new ErrorHandler('Password reset token in invalid or has been expired')
		);
	}

	if (password !== confirmPassword) {
		return next(new ErrorHandler('Password did not match'));
	}
	user.password = password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	return res
		.status(200)
		.json({ success: true, message: 'Password updated successfully' });
});

export {
	registerUser,
	currentUserProfile,
	updateUserProfile,
	forgotPassword,
	resetPassword,
};
