const config = {
    jwtSecret: process.env.JWT_SECRET || 'triviaapp@',
    jwtSecretResetPassword: process.env.JWT_SECRET_RESET_PASSWORD || 'triviaapp@123'
}

export default config;