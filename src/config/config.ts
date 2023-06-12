const config = {
	init: {
		host: process.env.HOST,
		host_client: process.env.NODE_ENV !== 'production' ? 'http://localhost:5173' : process.env.HOST_CLIENT_PRODUCTION,
		port: process.env.NODE_ENV !== 'production' ? 3002 : process.env.PORT,
	},
	database: {
		host: process.env.NODE_ENV !== 'production' ? 'localhost' : process.env.DB_HOST,
		port: process.env.NODE_ENV !== 'production' ? '3306' : process.env.DB_PORT,
		user: process.env.NODE_ENV !== 'production' ? 'root' : process.env.DB_USER,
		password: process.env.NODE_ENV !== 'production' ? 'root' : process.env.DB_PASSWORD,
		dataBaseName: process.env.NODE_ENV !== 'production' ? 'trivia' : process.env.DB_NAME,
	},
	jwt: {
		jwtSecret: process.env.NODE_ENV !== 'production' ? 'secret' : process.env.JWT_SECRET || '',
		jwtSecretResetPassword: process.env.NODE_ENV !== 'production' ? 'secretResetPassword' : process.env.JWT_SECRET_RESET_PASSWORD,
	},
	mail: {
		passwordGmail: process.env.PASSWORD_GMAIL,
	},
};

export default config;
