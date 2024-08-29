import {
  ENDPOINT_CHECK_FUNCS,
  checkEndpointData,
} from "../../utilities/endpointChecks";

export default function verifyNewServiceData(req, res, next) {
  const formData = req.body.data;
  const errors = checkEndpointData(formData, NEW_SERVICE_ENDPOINT_RULES);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "New service request has invalid data",
      errors: errors,
    });
  }

  next();
}

export const NEW_SERVICE_ENDPOINT_RULES = {
  id: {
    type: "string",
  },
  status: {
    type: "boolean",
  },
  name: {
    type: "string",
    required: (formData) => ENDPOINT_CHECK_FUNCS.requiredCheck(formData.name),
    checks: [
      (formData) => ENDPOINT_CHECK_FUNCS.typeCheck(formData.name, "string"),
      (formData) => ENDPOINT_CHECK_FUNCS.maxLengthCheck(formData.name, 100),
    ],
  },
  description: {
    type: "string",
    required: (formData) =>
      ENDPOINT_CHECK_FUNCS.requiredCheck(formData.description),
    checks: [
      (formData) =>
        ENDPOINT_CHECK_FUNCS.typeCheck(formData.description, "string"),
      (formData) =>
        ENDPOINT_CHECK_FUNCS.maxLengthCheck(formData.description, 500),
    ],
  },
  duration: {
    type: "number",
    required: (formData) =>
      ENDPOINT_CHECK_FUNCS.requiredCheck(formData.duration),
    checks: [
      (formData) => ENDPOINT_CHECK_FUNCS.typeCheck(formData.duration, "number"),
      (formData) => ENDPOINT_CHECK_FUNCS.minValueCheck(formData.duration, 0),
    ],
  },
  price: {
    type: "number",
    required: (formData) => ENDPOINT_CHECK_FUNCS.requiredCheck(formData.price),
    checks: [
      (formData) => ENDPOINT_CHECK_FUNCS.typeCheck(formData.price, "number"),
      (formData) => ENDPOINT_CHECK_FUNCS.minValueCheck(formData.price, 0),
    ],
  },
  currency: {
    type: "string",
    required: false,
  },
  tax: {
    type: "string",
    required: (formData) => ENDPOINT_CHECK_FUNCS.requiredCheck(formData.tax),
    checks: [
      (formData) => ENDPOINT_CHECK_FUNCS.typeCheck(formData.tax, "string"),
    ],
    options: [
      {value: "none", label: "None"},
      {value: "gst", label: "GST"},
      {value: "hst", label: "HST"},
      {value: "pst", label: "PST"},
    ],
  },
  taxPercent: {
    type: "number",
    required: (formData) =>
      ENDPOINT_CHECK_FUNCS.requiredCheck(
        formData.taxPercent,
        formData.tax,
        ["gst, hst, pst"],
        false
      ),
    checks: [
      (formData) =>
        ENDPOINT_CHECK_FUNCS.typeCheck(formData.taxPercent, "number"),
      (formData) => ENDPOINT_CHECK_FUNCS.minValueCheck(formData.taxPercent, 0),
    ],
  },
  location: {
    type: "string",
    required: (formData) =>
      ENDPOINT_CHECK_FUNCS.requiredCheck(formData.location),
    checks: [
      (formData) => ENDPOINT_CHECK_FUNCS.typeCheck(formData.location, "string"),
    ],
    options: [
      {value: "virtual", label: "Virtual"},
      {value: "live", label: "In Person"},
      {value: "hybrid", label: "Virtual or In Person"},
    ],
  },
  availabilityType: {
    type: "string",
    required: (formData) =>
      ENDPOINT_CHECK_FUNCS.requiredCheck(formData.availabilityType),
    checks: [
      (formData) =>
        ENDPOINT_CHECK_FUNCS.typeCheck(formData.availabilityType, "string"),
    ],
    options: [
      {value: "all", label: "Business Hours"},
      {value: "custom", label: "Custom Times"},
      {value: "none", label: "None"},
    ],
  },
  customAvailability: {
    type: "object",
    required: (formData) =>
      ENDPOINT_CHECK_FUNCS.requiredCheck(
        formData.customAvailability,
        formData.availabilityType,
        "custom",
        false
      ),
    checks: [
      (formData) =>
        ENDPOINT_CHECK_FUNCS.typeCheck(formData.customAvailability, "object"),
      (formData) =>
        ENDPOINT_CHECK_FUNCS.minLengthCheck(formData.customAvailability, 1),
      (formData) =>
        ENDPOINT_CHECK_FUNCS.availabiltyCheck(formData.customAvailability),
    ],
  },
  policy: {
    type: "string",
    required: (formData) => ENDPOINT_CHECK_FUNCS.requiredCheck(formData.policy),
    checks: [
      (formData) => ENDPOINT_CHECK_FUNCS.typeCheck(formData.policy, "string"),
    ],
    options: [
      {value: "anytime", label: "Cancel Anytime"},
      {value: "notice", label: "Notice Required"},
      {value: "none", label: "No Refunds"},
    ],
  },
  notice: {
    type: "string",
    required: (formData) =>
      ENDPOINT_CHECK_FUNCS.requiredCheck(
        formData.notice,
        formData.policy,
        "notice",
        false
      ),
    checks: [
      (formData) => ENDPOINT_CHECK_FUNCS.typeCheck(formData.notice, "string"),
    ],
    options: [
      {value: "12", label: "12 hours"},
      {value: "24", label: "24 hours"},
      {value: "48", label: "48 hours"},
    ],
  },
  lateFee: {
    type: "number",
    required: (formData) =>
      ENDPOINT_CHECK_FUNCS.requiredCheck(
        formData.lateFee,
        formData.policy,
        "notice",
        false
      ),
    checks: [
      (formData) => ENDPOINT_CHECK_FUNCS.typeCheck(formData.lateFee, "number"),
    ],
  },
};
