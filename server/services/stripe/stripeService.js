const config = require('../../config');

const stripe = require('stripe')(config.stripeApiKey);

async function createStripeAccount(email) {
  const account = await stripe.accounts.create({
    type: 'standard',
    email,
  });
  return account.id;
}

module.exports = {
  createStripeAccount,
};
