const express = require('express');
const router = express.Router();
const { getClinic, editClinic } = require('../services/clinic/clinicService');

router.post('/', async (req, res, next) => {
  const event = JSON.parse(req.body);
  const stripeId = event.data.object.id;

  const data = { stripeId: stripeId };
  const userId = await getClinic(data);

  //   switch (event.type) {
  //     case 'account.application.deauthorized':
  //       await archiveTherapist(userId);
  //     case 'account.updated':
  //       updateStripeAccount(userId, event);
  //     case 'checkout.session.completed':
  //       const sessionId = event.data.object.metaData.sessionId;
  //       const updates = { status: 'booked' };
  //       upadateSession(userId, sessionId, updates);
  //     case 'checkout.session.expired':
  //       const sessionId = event.data.object.metaData.sessionId;
  //       deleteSession(userId, sessionId, updates);
  //   }

  const { timeZone, schedule } = req.body;
  if (!timeZone || !schedule)
    return res.status(400).json({
      message: 'Timezone and schedule details are required.',
    });
  try {
    const data = {
      timeZone,
      schedule,
    };
    const newTherapist = await editTherapist(req.userId, data);
    return res.status(200).json({
      message: 'Successfully saved therapist business hours.',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error saving therapist business hours.',
    });
  }
});

module.exports = router;
