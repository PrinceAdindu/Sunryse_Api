const requiredCheck = (
  value,
  dependantValue = '',
  requiredDependantValue = '',
  canExistWithoutDependancy = false,
) => {
  // Check if dependancy exists
  if (dependantValue) {
    const dependencyPassed = Array.isArray(requiredDependantValue)
      ? requiredDependantValue.includes(dependantValue)
      : dependantValue === requiredDependantValue;
    // Check if dependancy failed
    if (!dependencyPassed) {
      // Check if field exists
      if (Boolean(value)) {
        // Check if field can exist without dependancy
        return {
          passed: canExistWithoutDependancy,
          message: canExistWithoutDependancy
            ? 'Passed'
            : 'Failed required check',
        };
      } else {
        return {
          passed: true,
          message: 'Passed required check',
        };
      }
    }
  }
  // Field must be required
  const passed = Boolean(value);
  return {
    passed: passed,
    message: passed ? 'Passed required check' : 'Failed required check',
  };
};

const typeCheck = (value, type) => {
  const passed = typeof value === type || value === '';
  return {
    passed: passed,
    message: passed ? 'Passed type check' : 'Failed type check',
  };
};

const maxLengthCheck = (value, length) => {
  if (value.length <= length) {
    return { passed: true, message: 'Passed max length check' };
  } else {
    return {
      passed: false,
      message: `Failed max length check`,
    };
  }
};

const minLengthCheck = (value, length) => {
  if (value.length >= length) {
    return { passed: true, message: 'Passed min length check' };
  } else {
    return {
      passed: false,
      message: `Failed min length check`,
    };
  }
};

const maxValueCheck = (value, amount) => {
  if (value <= amount) {
    return {
      passed: true,
      message: `Passed max value check`,
    };
  } else {
    return {
      passed: false,
      message: `Failed max value check`,
    };
  }
};

const minValueCheck = (value, amount) => {
  if (value >= amount) {
    return { passed: true, message: 'Passed min value check' };
  } else {
    return {
      passed: false,
      message: `Failed min value check`,
    };
  }
};

const equalsCheck = (value, requiredValue) => {
  if (value === requiredValue) {
    return { passed: true, message: 'Passed equals check' };
  } else {
    return {
      passed: false,
      message: `Failed equals check`,
    };
  }
};

const regexCheck = (value, regex) => {
  if (regex.test(value)) {
    return { passed: true, message: 'Passed regex check' };
  } else {
    return {
      passed: false,
      message: `Failed regex check`,
    };
  }
};

const availabiltyCheck = (availability) => {
  availability.forEach((day) => {
    day.times.forEach((timeBlock) => {
      if (timeBlock.error === true) {
        return { passed: false, message: 'Failed availability check' };
      }
    });
  });
  return { passed: true, message: 'Passed availability check' };
};

function checkEndpointData(formData, formRules) {
  let errors = {};

  for (const field in formData) {
    const fieldRules = formRules[field];
    // Run requirement check first
    if (fieldRules?.required) {
      const func = fieldRules?.required;
      const result = func(formData);
      if (!result.passed) {
        errors[field] = result.message;
        return errors;
      }
    }
    // Run field checks if field exists
    if (Boolean(formData[field])) {
      const fieldChecks = fieldRules?.checks;
      fieldChecks?.forEach((check) => {
        const result = check(formData);
        if (!result.passed) {
          errors[field] = result.message;
        }
      });
    }
  }
  return errors;
}

const EDNPOINT_CHECK_FUNCS = {
  requiredCheck: requiredCheck,
  typeCheck: typeCheck,
  maxLengthCheck: maxLengthCheck,
  minLengthCheck: minLengthCheck,
  maxValueCheck: maxValueCheck,
  minValueCheck: minValueCheck,
  availabiltyCheck: availabiltyCheck,
  regexCheck: regexCheck,
  equalsCheck: equalsCheck,
};

module.exports = { EDNPOINT_CHECK_FUNCS, checkEndpointData };
