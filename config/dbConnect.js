import mongoose from 'mongoose';

const dbConnect = () => {
	if (mongoose.connection.readyState === 1) return;
	mongoose
		.connect(process.env.DB_LOCAL_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((res) => console.log('DB Connected'))
		.catch((error) => console.log('DB Connection failed', error));
};

export default dbConnect;
