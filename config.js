const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    email: process.env.EMAIL,
    pass: process.env.PASSWORD,
    port: process.env.PORT,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    mongoURL: process.env.MONGO_URL
};