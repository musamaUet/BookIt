import Room from '../models/Room';
import User from '../models/User';
import Booking from '../models/Booking';

import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import APIFeatures from '../utils/apiFeatures';

import absoluteUrl from 'next-absolute-url';
import getRawBody from 'raw-body';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @method          GET
// @path            /api/checkout_session/:roomId
// @description     Generate stripe checkout session
const stripeCheckoutSession = catchAsyncErrors(async (req, res, mext) => {
	const { roomId, checkInDate, checkOutDate, daysOfStay, amount } = req.query;

	const { origin } = absoluteUrl(req);
	console.log('origin ==>', origin);
	const room = await Room.findById({ _id: roomId });

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		success_url: `${origin}/bookings/me`,
		cancel_url: `${origin}/room/${roomId}`,
		customer_email: req.user.email,
		client_reference_id: req.query.roomId,
		metadata: {
			checkInDate,
			checkOutDate,
			daysOfStay,
		},
		line_items: [
			{
				name: room.name,
				images: [`${room.images[0].url}`],
				amount: amount * 100,
				currency: 'usd',
				quantity: 1,
			},
		],
	});

	res.status(200).json(session);
});

// @method          POST
// @path            /api/webhook
// @description     Stripe webhook to be called after user has paid payment

const webhookCheckout = catchAsyncErrors(async (req, res) => {
	try {
		console.log('hook called!');
		const signature = req.headers['stripe-signature'];
		const rawBody = await getRawBody(req);

		const event = stripe.webhooks.constructEvent(
			rawBody,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET
		);

		if (event.type === 'checkout.session.completed') {
			const session = event.data.object;
			const roomId = session.client_reference_id;
			const user = await User.findOne({ email: session.customer_email }).select(
				'_id'
			);
			const amountPaid = session.amount_total / 100;

			const paymentInfo = {
				id: session.payment_intent,
				status: session.payment_status,
			};

			const { checkInDate, checkOutDate, daysOfStay } = session.metadata;
			const booking = await Booking.create({
				room: roomId,
				user: user._id,
				daysOfStay,
				amountPaid,
				checkInDate,
				checkOutDate,
				paymentInfo,
				paidAt: Date.now(),
			});

			res.status(200).json({ success: true });
		}
	} catch (error) {
		console.log('error in stripe webhook ==>', error);
	}
});

export { stripeCheckoutSession, webhookCheckout };
