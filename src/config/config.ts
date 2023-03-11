const config = {
    init: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3002,
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        dataBaseName: process.env.DB_NAME || 'trivia',
    },
    jwt: {
        jwtSecret: process.env.JWT_SECRET || 'triviaapp@',
        jwtSecretResetPassword: process.env.JWT_SECRET_RESET_PASSWORD || 'triviaapp@123',
    },
    mail: {
        passwordGmail: process.env.PASSWORD_GMAIL || 'keozfdhewyyyjqxr'
    }
}

export default config;