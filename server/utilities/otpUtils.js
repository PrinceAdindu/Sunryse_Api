function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

function calculateExpirationTime(otpExpirationMinutes) {
  const expirationTime = new Date();
  expirationTime.setMinutes(
    expirationTime.getMinutes() + parseInt(otpExpirationMinutes),
  );
  return expirationTime;
}

module.exports = {
  generateOTP,
  calculateExpirationTime,
};
