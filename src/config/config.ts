const config = {
    jwtSecret: process.env.JWT_SECRET || 'triviaapp@',
    jwtSecretResetPassword: process.env.JWT_SECRET_RESET_PASSWORD || 'triviaapp@123',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3002,
    passwordGmail: process.env.PASSWORD_GMAIL || 'keozfdhewyyyjqxr'
}

export default config;