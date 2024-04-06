const typeCheck = (value, type) => {
  const passed = typeof value !== type;
  return {
    passed: passed,
    message: passed ? 'Passed' : 'Incorrect type',
  };
};

// DepenedentValue: string, number, array
const requiredCheck = (value, dependentField = '', dependentValue = '') => {
  // Requirement is dependent
  if (dependentField) {
    if (Array.isArray(dependentValue)) {
      const passed = value && dependentValue.includes(dependentField);
      return {
        passed: passed,
        message: passed ? 'Passed' : 'This field is required',
      };
    } else {
      const passed = value && dependentField === dependentValue;
      return {
        passed: passed,
        message: passed ? 'Passed' : 'This field is required',
      };
    }
  }
  // Check if value is present
  const passed = value && true;
  return {
    passed: passed,
    message: passed ? 'Passed' : 'This field is required',
  };
};

const maxLengthCheck = (value, length) => {
  if (value <= length) {
    return { passed: true, message: 'Passed' };
  } else {
    return {
      passed: false,
      message: `Max length of ${length} exceeded`,
    };
  }
};

const minLengthCheck = (value, length) => {
  if (value >= length) {
    return { passed: true, message: 'Passed' };
  } else {
    return {
      passed: false,
      message: `Minimum length of ${length} not reached`,
    };
  }
};

const maxValueCheck = (value, amount) => {
  if (value <= amount) {
    return {
      passed: true,
      message: `Passed`,
    };
  } else {
    return {
      passed: false,
      message: `Max value of ${amount} exceeded`,
    };
  }
};

const minValueCheck = (value, amount) => {
  if (value >= amount) {
    return { passed: true, message: 'Passed' };
  } else {
    return {
      passed: false,
      message: `Minimum length of ${amount} not reached`,
    };
  }
};

const availabiltyCheck = (availability) => {
  availability.forEach((day) => {
    day.times.forEach((timeBlock) => {
      if (timeBlock.error === true) {
        return { passed: false, message: 'Availability contains errors' };
      }
    });
  });
  return { passed: true, message: 'Passed' };
};

const regexCheck = (value, regex) => {
  if (!regex.test(value)) {
    return { passed: true, message: 'Passed' };
  } else {
    return {
      passed: false,
      message: `Minimum length of ${value} not reached`,
    };
  }
};

const equalsCheck = (value, amount) => {
  if (value === amount) {
    return { passed: true, message: 'Passed' };
  } else {
    return {
      passed: false,
      message: `Minimum length of ${amount} not reached`,
    };
  }
};

function checkEndpointData(formData, formRules) {
  let errors = {};

  for (const field in formData) {
    const fieldChecks = formRules[field]?.checks;
    fieldChecks.forEach((check) => {
      const result = check(formData);
      if (!result.passed) {
        errors[field] = result.message;
      }
    });
  }

  return errors;
}

const EDNPOINT_CHECK_FUNCS = {
  typeCheck: typeCheck,
  requiredCheck: requiredCheck,
  maxLengthCheck: maxLengthCheck,
  minLengthCheck: minLengthCheck,
  maxValueCheck: maxValueCheck,
  minValueCheck: minValueCheck,
  availabiltyCheck: availabiltyCheck,
  regexCheck: regexCheck,
  equalsCheck: equalsCheck,
};

module.exports = { EDNPOINT_CHECK_FUNCS, checkEndpointData };
