type ConfigType = {
  apiVersion: string | undefined;
  port: string | undefined;
  url: string | undefined;
  accessTokenSecret?: string;
  accessTokenExp?: string;
  refreshTokenSecret?: string;
  refreshTokenExp?: string;
  refreshCookieExp?: string;
  fbApiKey?: string;
  fbAuthDomain?: string;
  fbProjectId?: string;
  fbStorageBucket?: string;
  fbMessagingSenderId?: string;
  fbAppId?: string;
  fbMeasurementId?: string;
  stripeApiKey?: string;
  stripeWebhookSecret?: string;
  stripeAccountLinkRefreshUrl?: string;
  stripeAccountLinkReturnUrl?: string;
  emailHost?: string;
  emailPort?: string;
  email?: string;
  emailPassword?: string;
  emailSenderName?: string;
  otpExpirationMinutes?: string;
};

const dev: ConfigType = {
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
  stripeWebhookSecret: process.env.DEV_STRIPE_WEBHOOK_SECRET,
  stripeAccountLinkRefreshUrl: process.env.DEV_STRIPE_ACCOUNT_LINK_REFRESH_URL,
  stripeAccountLinkReturnUrl: process.env.DEV_STRIPE_ACCOUNT_LINK_RETURN_URL,
  emailHost: process.env.DEV_EMAIL_HOST,
  emailPort: process.env.DEV_EMAIL_PORT,
  email: process.env.DEV_EMAIL,
  emailPassword: process.env.DEV_EMAIL_PASSWORD,
  emailSenderName: process.env.DEV_EMAIL_SENDER_NAME,
  otpExpirationMinutes: process.env.DEV_OTP_EXPIRATION_MINUTES,
};

const prod: ConfigType = {
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

let config: ConfigType;
if (process.env.NODE_ENV === "dev") {
  config = dev;
} else {
  config = prod;
}

export default config;
