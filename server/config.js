require('dotenv').config();

const dev = {
  apiVersion: process.env.DEV_API_VERSION,
  port: process.env.DEV_PORT,
  url: process.env.DEV_URL,
  accessTokenSecret: process.env.DEV_ACCESS_TOKEN_SECRET,
  accessTokenExp: process.env.DEV_ACCESS_TOKEN_EXP,
  refreshTokenSecret: process.env.DEV_REFRESH_TOKEN_SECRET,
  refreshTokenExp: process.env.DEV_REFRESH_TOKEN_EXP,
  refreshCookieExp: process.env.DEV_REFRESH_COOKIE_EXP,
  fbApiKey: process.env.DEV_FB_API_KEY,
  fbAuthDomain: process.env.DEV_FB_AUTH_DOMAIN,
  fbProjectId: process.env.DEV_FB_PROJECT_ID,
  fbStorageBucket: process.env.DEV_FB_STORAGE_BUCKET,
  fbMessagingSenderId: process.env.DEV_FB_MESSAGING_SENDER_ID,
  fbAppId: process.env.DEV_FB_APP_ID,
  fbMeasurementId: process.env.DEV_FB_MEASUREMENT_ID,
  stripeApiKey: process.env.DEV_STRIPE_API_KEY,
};

const prod = {
  apiVersion: process.env.PROD_API_VERSION,
  port: process.env.PROD_PORT,
  url: process.env.PROD_URL,
  accessTokenExp: process.env.PROD_ACCESSTOKENEXP,
  refreshTokenExp: process.env.PROD_REFRESHTOKENEXP,
  refreshCookieExp: process.env.PROD_REFRESH_COOKIE_EXP,
  fbApiKey: process.env.PROD_FB_API_KEY,
  fbAuthDomain: process.env.PROD_FB_AUTH_DOMAIN,
  fbProjectId: process.env.PROD_FB_PROJECT_ID,
  fbStorageBucket: process.env.PROD_FB_STORAGE_BUCKET,
  fbMessagingSenderId: process.env.PROD_FB_MESSAGING_SENDER_ID,
  fbAppId: process.env.PROD_FB_APP_ID,
  fbMeasurementId: process.env.PROD_FB_MEASUREMENT_ID,
  stripeApiKey: process.env.PROD_STRIPE_API_KEY,
};

let config;
if (process.env.NODE_ENV === 'dev') {
  config = dev;
} else {
  config = prod;
}

module.exports = config;
