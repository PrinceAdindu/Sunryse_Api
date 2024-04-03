const config = require('../config');

const stripe = require('stripe')(config.stripeApiKey);

async function createStripeAccount(email) {
  const account = await stripe.accounts.create({
    type: 'express',
    email,
  });
  return account.id;
}

async function verifyStripeUpdate(clinicId, payoutsEnabled) {
  const { archiveClinic } = require('./clinic/clinicService');
  if (!payoutsEnabled) {
    await archiveClinic(clinicId);
  }
}

async function createAccountLink(stripeId) {
  const accountLink = await stripe.accountLinks.create({
    account: stripeId,
    refresh_url: config.stripeAccountLinkRefreshUrl,
    return_url: config.stripeAccountLinkReturnUrl,
    type: 'account_onboarding',
  });
  return accountLink;
}

async function createDahsboardLink(stripeid) {
  const dahsboardLink = await stripe.accounts.createLoginLink(stripeid);
  return dahsboardLink;
}

async function getStripeAccount(stripeId) {
  const account = await stripe.accounts.retrieve(stripeId);
  return account;
}

async function getStripeStatus(stripeId) {
  const account = await getStripeAccount(stripeId);
  let statusObj = {};
  statusObj.active = true;

  if (
    account.details_submitted === false ||
    account.payouts_enabled === false ||
    account.charges_enabled === false ||
    account.requirements.currently_due > 0 ||
    account.requirements.past_due > 0
  ) {
    statusObj.active = false;
  }
  statusObj.payouts_enabled = account.payouts_enabled;
  statusObj.charges_enabled = account.charges_enabled;
  statusObj.requirements = account.requirements;
  return statusObj;
}

module.exports = {
  createStripeAccount,
  verifyStripeUpdate,
  createAccountLink,
  createDahsboardLink,
  getStripeStatus,
};
