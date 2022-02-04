import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Room name is required'],
		trim: true,
		maxlength: [100, 'Room name cannot exceed 100 characters'],
	},
	price: {
		type: Number,
		required: [true, 'Room price is required'],
		maxlength: [7, 'Price cannot exceed 7 characters'],
		default: 0.0,
	},
	description: {
		type: String,
		required: [true, 'Room description is required'],
	},
	address: {
		type: String,
		required: [true, 'Room address is required'],
	},
	guestCapacity: {
		type: Number,
		required: [true, 'Guest capacity is required'],
	},
	numOfBeds: {
		type: Number,
		required: [true, 'Number of Beds is required'],
	},
	internet: {
		type: Boolean,
		default: false,
	},
	breakfast: {
		type: Boolean,
		default: false,
	},
	airCondition: {
		type: Boolean,
		default: false,
	},
	petsAllowed: {
		type: Boolean,
		default: false,
	},
	roomCleaning: {
		type: Boolean,
		default: false,
	},
	rating: {
		type: Number,
		default: 0,
	},
	numOfReviews: {
		type: Number,
		default: 0,
	},
	images: [
		{
			public_id: { type: String, required: true },
			url: { type: String, required: true },
		},
	],
	category: {
		type: String,
		required: [true, 'Room category is required'],
		enum: {
			values: ['King', 'Single', 'Twins'],
			message: 'Please select correct category',
		},
	},
	reviews: [
		{
			user: {
				type: mongoose.Schema.ObjectId,
				ref: 'User',
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			rating: {
				type: Number,
				required: true,
			},
			comment: {
				type: String,
				required: true,
			},
		},
	],
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.Room || mongoose.model('Room', RoomSchema);
