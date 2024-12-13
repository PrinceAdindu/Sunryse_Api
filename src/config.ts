type ConfigType = {
  env: string;
  apiVersion: string;
  port: string;
  url: string;

  accessTokenSecret: string;
  accessTokenExp: string;
  refreshTokenSecret: string;
  refreshTokenExp: string;
  refreshCookieExp: string;
  otpExpiration: string;

  fbPrivateKeyId: string;
  fbPrivateKey: string;
  fbClientEmail: string;
  fbClientId: string;
  fbAuthUri: string;
  fbTokenUri: string;
  fbAuthProviderX509CertUrl: string;
  fbClientX509CertUrl: string;
  fbApiKey: string;
  fbAuthDomain: string;
  fbProjectId: string;
  fbStorageBucket: string;
  fbMessagingSenderId: string;
  fbAppId: string;
  fbMeasurementId: string;

  stripeApiKey: string;
  stripeWebhookSecret: string;
  stripeAccountLinkRefreshUrl: string;
  stripeAccountLinkReturnUrl: string;

  emailHost: string;
  emailPort: string;
  email: string;
  emailPassword: string;
  emailSenderName: string;

  awsCwAccessKey: string;
  awsCwSecretAccessKey: string;
  awsCwRegion: string;
  awsCwLogGroup: string;
  awsCwLogStream: string;
};

const dev: ConfigType = {
  env: process.env.NODE_ENV || "",
  apiVersion: process.env.DEV_API_VERSION || "",
  port: process.env.DEV_PORT || "",
  url: process.env.DEV_URL || "",

  accessTokenSecret: process.env.DEV_ACCESS_TOKEN_SECRET || "",
  accessTokenExp: process.env.DEV_ACCESS_TOKEN_EXP || "",
  refreshTokenSecret: process.env.DEV_REFRESH_TOKEN_SECRET || "",
  refreshTokenExp: process.env.DEV_REFRESH_TOKEN_EXP || "",
  refreshCookieExp: process.env.DEV_REFRESH_COOKIE_EXP || "",
  otpExpiration: process.env.DEV_OTP_EXP || "",

  fbPrivateKeyId: process.env.DEV_FB_PRIVATE_KEY_ID || "",
  fbPrivateKey: process.env.DEV_FB_PRIVATE_KEY || "",
  fbClientEmail: process.env.DEV_FB_CLIENT_EMAIL || "",
  fbClientId: process.env.DEV_FB_CLIENT_ID || "",
  fbAuthUri: process.env.DEV_FB_AUTH_URI || "",
  fbTokenUri: process.env.DEV_FB_TOKEN_URI || "",
  fbAuthProviderX509CertUrl:
    process.env.DEV_FB_AUTH_PROVIDER_X509_CERT_URL || "",
  fbClientX509CertUrl: process.env.DEV_FB_CLIENT_X509_CERT_URL || "",
  fbApiKey: process.env.DEV_FB_API_KEY || "",
  fbAuthDomain: process.env.DEV_FB_AUTH_DOMAIN || "",
  fbProjectId: process.env.DEV_FB_PROJECT_ID || "",
  fbStorageBucket: process.env.DEV_FB_STORAGE_BUCKET || "",
  fbMessagingSenderId: process.env.DEV_FB_MESSAGING_SENDER_ID || "",
  fbAppId: process.env.DEV_FB_APP_ID || "",
  fbMeasurementId: process.env.DEV_FB_MEASUREMENT_ID || "",

  stripeApiKey: process.env.DEV_STRIPE_API_KEY || "",
  stripeWebhookSecret: process.env.DEV_STRIPE_WEBHOOK_SECRET || "",
  stripeAccountLinkRefreshUrl:
    process.env.DEV_STRIPE_ACCOUNT_LINK_REFRESH_URL || "",
  stripeAccountLinkReturnUrl:
    process.env.DEV_STRIPE_ACCOUNT_LINK_RETURN_URL || "",

  emailHost: process.env.DEV_EMAIL_HOST || "",
  emailPort: process.env.DEV_EMAIL_PORT || "",
  email: process.env.DEV_EMAIL || "",
  emailPassword: process.env.DEV_EMAIL_PASSWORD || "",
  emailSenderName: process.env.DEV_EMAIL_SENDER_NAME || "",

  awsCwAccessKey: process.env.DEV_AWS_CW_ACCESS_KEY || "",
  awsCwSecretAccessKey: process.env.DEV_AWS_CW_SECRET_ACCESS_KEY || "",
  awsCwRegion: process.env.DEV_AWS_CW_REGION || "",
  awsCwLogGroup: process.env.DEV_AWS_CW_LOG_GROUP || "",
  awsCwLogStream: process.env.DEV_AWS_CW_LOG_STREAM || "",
};

const prod: ConfigType = {
  env: process.env.NODE_ENV || "",
  apiVersion: process.env.PROD_API_VERSION || "",
  port: process.env.PROD_PORT || "",
  url: process.env.PROD_URL || "",

  accessTokenSecret: process.env.PROD_ACCESS_TOKEN_SECRET || "",
  accessTokenExp: process.env.PROD_ACCESS_TOKEN_EXP || "",
  refreshTokenSecret: process.env.PROD_REFRESH_TOKEN_SECRET || "",
  refreshTokenExp: process.env.PROD_REFRESH_TOKEN_EXP || "",
  refreshCookieExp: process.env.PROD_REFRESH_COOKIE_EXP || "",
  otpExpiration: process.env.PROD_OTP_EXP || "",

  fbPrivateKeyId: process.env.PROD_FB_PRIVATE_KEY_ID || "",
  fbPrivateKey: process.env.PROD_FB_PRIVATE_KEY || "",
  fbClientEmail: process.env.PROD_FB_CLIENT_EMAIL || "",
  fbClientId: process.env.PROD_FB_CLIENT_ID || "",
  fbAuthUri: process.env.PROD_FB_AUTH_URI || "",
  fbTokenUri: process.env.PROD_FB_TOKEN_URI || "",
  fbAuthProviderX509CertUrl:
    process.env.PROD_FB_AUTH_PROVIDER_X509_CERT_URL || "",
  fbClientX509CertUrl: process.env.PROD_FB_CLIENT_X509_CERT_URL || "",
  fbApiKey: process.env.PROD_FB_API_KEY || "",
  fbAuthDomain: process.env.PROD_FB_AUTH_DOMAIN || "",
  fbProjectId: process.env.PROD_FB_PROJECT_ID || "",
  fbStorageBucket: process.env.PROD_FB_STORAGE_BUCKET || "",
  fbMessagingSenderId: process.env.PROD_FB_MESSAGING_SENDER_ID || "",
  fbAppId: process.env.PROD_FB_APP_ID || "",
  fbMeasurementId: process.env.PROD_FB_MEASUREMENT_ID || "",

  stripeApiKey: process.env.PROD_STRIPE_API_KEY || "",
  stripeWebhookSecret: process.env.PROD_STRIPE_WEBHOOK_SECRET || "",
  stripeAccountLinkRefreshUrl:
    process.env.PROD_STRIPE_ACCOUNT_LINK_REFRESH_URL || "",
  stripeAccountLinkReturnUrl:
    process.env.PROD_STRIPE_ACCOUNT_LINK_RETURN_URL || "",

  emailHost: process.env.PROD_EMAIL_HOST || "",
  emailPort: process.env.PROD_EMAIL_PORT || "",
  email: process.env.PROD_EMAIL || "",
  emailPassword: process.env.PROD_EMAIL_PASSWORD || "",
  emailSenderName: process.env.PROD_EMAIL_SENDER_NAME || "",

  awsCwAccessKey: process.env.PROD_AWS_CW_ACCESS_KEY || "",
  awsCwSecretAccessKey: process.env.PROD_AWS_CW_SECRET_ACCESS_KEY || "",
  awsCwRegion: process.env.PROD_AWS_CW_REGION || "",
  awsCwLogGroup: process.env.PROD_AWS_CW_LOG_GROUP || "",
  awsCwLogStream: process.env.PROD_AWS_CW_LOG_STREAM || "",
};

let config: ConfigType;
if (process.env.NODE_ENV === "development") {
  config = dev;
} else {
  config = prod;
}

export default config;
