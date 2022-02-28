module.exports = {
	env: {
		DB_LOCAL_URI: 'mongodb://localhost:27017/bookit',
		PUBLIC_BUCKET_URL: 'https://a0.muscache.com',
		CLOUDINARY_CLOUD_NAME: 'usamarabbani',
		CLOUDINARY_API_KEY: '691575793151816',
		CLOUDINARY_API_SECRET: '2Ek-zNRt1FPzmLhDdiuRoeV08zU',

		SMTP_HOST: 'smtp.mailtrap.io',
		SMTP_PORT: '2525',
		SMTP_USER: '71e0dc01f54d31',
		SMTP_PASSWORD: 'e6fd7258103ecd',
		SMTP_FROM_NAME: 'Muhammad Usama Rabani',
		SMTP_FROM_EMAIL: 'usama.rabbani@invozone.com',
	},
	images: {
		domains: ['res.cloudinary.com'],
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback.fs = false;
		}
		return config;
	},
};
