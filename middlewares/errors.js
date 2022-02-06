import ErrorHandler from '../utils/erorHandler';

const onError = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;

	let error = { ...err };

	error.message = err.message;
	// Handling mongoose ObjectId error
	if (err.name === 'CastError') {
		const message = `Resource not found. Invalid ${err.path}`;
		error = new ErrorHandler(message, 400);
	}
	// Handling mongoose validation error
	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map((value) => value.message);
		error = new ErrorHandler(message, 400);
	}
	return res.status(err.statusCode).json({
		success: false,
		error: error,
		message: error.message,
		stack: error.stack,
	});
};

export default onError;
