import checkEndpointData, {
  ENDPOINT_CHECK_FUNCS,
} from "../../utilities/endpointChecks";

export default function verifyRegistrationData(req, res, next) {
  const formData = req.body.data;
  const errors = checkEndpointData(formData, REGISTER_ENDPOINT_RULES);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "New registration request has invalid data",
      errors: errors,
    });
  }

  next();
}

export const REGISTER_ENDPOINT_RULES = {
  email: {
    type: "string",
    required: (formData) => ENDPOINT_CHECK_FUNCS.requiredCheck(formData.email),
    checks: [
      (formData) =>
        ENDPOINT_CHECK_FUNCS.regexCheck(
          formData.email,
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
        ),
    ],
  },
  password: {
    type: "string",
    required: (formData) =>
      ENDPOINT_CHECK_FUNCS.requiredCheck(formData.password),
    checks: [
      (formData) => ENDPOINT_CHECK_FUNCS.minLengthCheck(formData.password, 8),
    ],
  },
  passwordConf: {
    type: "string",
    required: (formData) =>
      ENDPOINT_CHECK_FUNCS.requiredCheck(formData.passwordConf),
    checks: [
      (formData) =>
        ENDPOINT_CHECK_FUNCS.minLengthCheck(formData.passwordConf, 8),
      (formData) =>
        ENDPOINT_CHECK_FUNCS.equalsCheck(
          formData.passwordConf,
          formData.password
        ),
    ],
  },
};
