export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

export function calculateExpirationTime(otpExp) {
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + parseInt(otpExp));
  return expirationTime;
}
