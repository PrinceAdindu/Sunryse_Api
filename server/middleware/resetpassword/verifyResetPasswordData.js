const {
  EDNPOINT_CHECK_FUNCS,
  checkEndpointData,
} = require('../../utilities/endpointChecks');

const verifyResetPasswordData = (req, res, next) => {
  const formData = req.body.data;
  const errors = checkEndpointData(formData, RESET_PASSWORD_ENDPOINT_RULES);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: 'Password reset request has Invalid data',
      errors: errors,
    });
  }

  next();
};

const RESET_PASSWORD_ENDPOINT_RULES = {
  email: {
    type: 'string',
    required: (formData) => EDNPOINT_CHECK_FUNCS.requiredCheck(formData.email),
    checks: [
      (formData) =>
        EDNPOINT_CHECK_FUNCS.regexCheck(
          formData.email,
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        ),
    ],
  },
  password: {
    type: 'string',
    required: (formData) =>
      EDNPOINT_CHECK_FUNCS.requiredCheck(formData.password),
    checks: [
      (formData) => EDNPOINT_CHECK_FUNCS.minLengthCheck(formData.password, 8),
    ],
  },
  passwordConf: {
    type: 'string',
    required: (formData) =>
      EDNPOINT_CHECK_FUNCS.requiredCheck(formData.passwordConf),
    checks: [
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
  verifyResetPasswordData,
  RESET_PASSWORD_ENDPOINT_RULES,
};
