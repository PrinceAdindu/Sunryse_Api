const {
  EDNPOINT_CHECK_FUNCS,
  checkEndpointData,
} = require('../../utilities/endpointChecks');

const verifyRegistrationData = (req, res, next) => {
  const formData = req.body.data;
  const errors = checkEndpointData(formData, REGISTER_ENDPOINT_RULES);

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Registration request has invalid data',
      errors: errors,
    });
  }

  next();
};

const REGISTER_ENDPOINT_RULES = {
  email: {
    type: 'string',
    required: true,
    checks: [
      (formData) => EDNPOINT_CHECK_FUNCS.requiredCheck(formData.email),
      (formData) =>
        EDNPOINT_CHECK_FUNCS.regexCheck(
          formData.email,
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        ),
    ],
  },
  password: {
    type: 'string',
    required: true,
    checks: [
      (formData) => EDNPOINT_CHECK_FUNCS.requiredCheck(formData.password),
      (formData) => EDNPOINT_CHECK_FUNCS.minLengthCheck(formData.password, 8),
    ],
  },
  passwordConf: {
    type: 'string',
    required: true,
    checks: [
      (formData) => EDNPOINT_CHECK_FUNCS.requiredCheck(formData.passwordConf),
      (formData) =>
        EDNPOINT_CHECK_FUNCS.minLengthCheck(formData.passwordConf, 8),
      (formData) =>
        EDNPOINT_CHECK_FUNCS.equalsCheck(
          formData.passwordConf,
          formData.password,
        ),
    ],
  },
};

module.exports = {
  verifyRegistrationData,
  REGISTER_ENDPOINT_RULES,
};
