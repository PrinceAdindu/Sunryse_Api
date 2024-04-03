const { EDNPOINT_CHECK_FUNCS } = require('../../utilities/endpointChecks');

const verifyNewServiceData = (req, res, next) => {
  const formData = req.body.data;
  let errors = {};

  for (const field in formData) {
    const fieldChecks = NEW_SERVICE_ENDPOINT_RULES[field].checks;
    fieldChecks?.forEach((check) => {
      const result = check(formData);
      if (!result.passed) {
        errors[field] = result.message;
      }
    });
  }

  if (errors.length > 0) {
    return res
      .status(400)
      .json({ message: 'Request has errors in form data', errors: errors });
  }

  next();
};

const NEW_SERVICE_ENDPOINT_RULES = {
  id: {
    type: 'string',
    required: false,
  },
  status: {
    type: 'boolean',
    required: false,
  },
  name: {
    type: 'string',
    required: true,
    checks: [
      (formData) => EDNPOINT_CHECK_FUNCS.typeCheck(formData.name, 'string'),
      (formData) => EDNPOINT_CHECK_FUNCS.requiredCheck(formData.name),
      (formData) => EDNPOINT_CHECK_FUNCS.maxLengthCheck(formData.name, 100),
    ],
  },
  description: {
    type: 'string',
    required: true,
    checks: [
      (formData) =>
        EDNPOINT_CHECK_FUNCS.typeCheck(formData.description, 'string'),
      (formData) => EDNPOINT_CHECK_FUNCS.requiredCheck(formData.description),
      (formData) =>
        EDNPOINT_CHECK_FUNCS.maxLengthCheck(formData.description, 500),
    ],
  },
  duration: {
    type: 'number',
    required: true,
    checks: [
      (formData) => EDNPOINT_CHECK_FUNCS.typeCheck(formData.duration, 'number'),
      (formData) => EDNPOINT_CHECK_FUNCS.requiredCheck(formData.duration),
      (formData) => EDNPOINT_CHECK_FUNCS.minValueCheck(formData.duration, 0),
    ],
  },
  price: {
    type: 'number',
    required: true,
    checks: [
      (formData) => EDNPOINT_CHECK_FUNCS.typeCheck(formData.number, 'number'),
      (formData) => EDNPOINT_CHECK_FUNCS.requiredCheck(formData.price),
      (formData) => EDNPOINT_CHECK_FUNCS.minValueCheck(formData.price, 0),
    ],
  },
  currency: {
    type: 'string',
    required: false,
  },
  tax: {
    type: 'string',
    required: true,
    checks: [
      (formData) => EDNPOINT_CHECK_FUNCS.typeCheck(formData.tax, 'string'),
      (formData) => EDNPOINT_CHECK_FUNCS.requiredCheck(formData.tax),
    ],
    options: [
      { value: 'none', label: 'None' },
      { value: 'gst', label: 'GST' },
      { value: 'hst', label: 'HST' },
      { value: 'pst', label: 'PST' },
    ],
  },
  taxPercent: {
    type: 'number',
    required: false,
    checks: [
      (formData) =>
        EDNPOINT_CHECK_FUNCS.typeCheck(formData.taxPercent, 'number'),
      (formData) =>
        EDNPOINT_CHECK_FUNCS.requiredCheck(formData.taxPercent, formData.tax, [
          'gst, hst, pst',
        ]),
      (formData) => EDNPOINT_CHECK_FUNCS.minValueCheck(formData.taxPercent, 0),
    ],
  },
  location: {
    type: 'string',
    required: true,
    checks: [
      (formData) => EDNPOINT_CHECK_FUNCS.typeCheck(formData.location, 'string'),
      (formData) => EDNPOINT_CHECK_FUNCS.requiredCheck(formData.location),
    ],
    options: [
      { value: 'virtual', label: 'Virtual' },
      { value: 'live', label: 'In Person' },
      { value: 'hybrid', label: 'Virtual or In Person' },
    ],
  },
  availabilityType: {
    type: 'string',
    required: true,
    checks: [
      (formData) =>
        EDNPOINT_CHECK_FUNCS.typeCheck(formData.availabilityType, 'string'),
      (formData) =>
        EDNPOINT_CHECK_FUNCS.requiredCheck(formData.availabilityType),
      (formData) =>
        EDNPOINT_CHECK_FUNCS.requiresIf(
          formData.availabilityType,
          formData.availability,
          'custom',
        ),
    ],
    options: [
      { value: 'all', label: 'Business Hours' },
      { value: 'custom', label: 'Custom Times' },
      { value: 'none', label: 'None' },
    ],
  },
  availability: {
    type: 'object',
    required: false,
    checks: [
      (formData) =>
        EDNPOINT_CHECK_FUNCS.typeCheck(formData.availability, 'object'),
      (formData) =>
        EDNPOINT_CHECK_FUNCS.requiredCheck(
          formData.availability,
          formData.availabilityType,
          'custom',
        ),
      (formData) =>
        EDNPOINT_CHECK_FUNCS.minLengthCheck(formData.availability, 1),
      (formData) =>
        EDNPOINT_CHECK_FUNCS.availabiltyCheck(formData.availability),
    ],
  },
  policy: {
    type: 'string',
    required: true,
    checks: [
      (formData) => EDNPOINT_CHECK_FUNCS.typeCheck(formData.policy, 'string'),
      (formData) => EDNPOINT_CHECK_FUNCS.requiredCheck(formData.policy),
    ],
    options: [
      { value: 'anytime', label: 'Cancel Anytime' },
      { value: 'notice', label: 'Notice Required' },
      { value: 'none', label: 'No Refunds' },
    ],
  },
  notice: {
    type: 'string',
    required: false,
    checks: [
      (formData) => EDNPOINT_CHECK_FUNCS.typeCheck(formData.notice, 'string'),
      (formData) =>
        EDNPOINT_CHECK_FUNCS.requiredCheck(
          formData.notice,
          formData.policy,
          'notice',
        ),
    ],
    options: [
      { value: '12', label: '12 hours' },
      { value: '24', label: '24 hours' },
      { value: '48', label: '48 hours' },
    ],
  },
  lateFee: {
    type: 'number',
    required: false,
    checks: [
      (formData) => EDNPOINT_CHECK_FUNCS.typeCheck(formData.lateFee, 'number'),
      (formData) =>
        EDNPOINT_CHECK_FUNCS.requiredCheck(
          formData.lateFee,
          formData.policy,
          'notice',
        ),
    ],
  },
};

module.exports = {
  NEW_SERVICE_ENDPOINT_RULES,
  verifyNewServiceData,
};
