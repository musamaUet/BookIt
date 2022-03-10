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

		STRIPE_API_KEY:
			'pk_test_51HtVA1LrrJMhG10eAJdGQbn41DeqEKtXgq4vD9FfwrVDIXUIiTyue9sqOA2zq8Q64PuqxWnJa9KCNyZx7iEQIATl00fMoPhz7h',
		STRIPE_SECRET_KEY:
			'sk_test_51HtVA1LrrJMhG10eqRlBAmsbrDedqV6YaVl12sbpRehhJxY6818QpKtPPl0BMZuTt75irp4PFawuIJ2LiKOVzT0a00t8jlpdW0',
		STRIPE_WEBHOOK_SECRET: 'acct_1HtVA1LrrJMhG10e',
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
