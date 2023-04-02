const config = {
    init: {
        host: process.env.HOST,
        host_client: process.env.HOST_CLIENT,
        port: process.env.PORT,
    },
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dataBaseName: process.env.DB_NAME,
    },
    jwt: {
        jwtSecret: process.env.JWT_SECRET || 'secret',
        jwtSecretResetPassword: process.env.JWT_SECRET_RESET_PASSWORD || 'secretResetPassword',
    },
    mail: {
        passwordGmail: process.env.PASSWORD_GMAIL
    },
}

export default config