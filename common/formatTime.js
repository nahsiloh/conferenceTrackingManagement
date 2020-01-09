const MAX_TIME_IN_SINGLE_DIGIT = 9;

const formatHours = hours => {
  if (hours <= MAX_TIME_IN_SINGLE_DIGIT) {
    return `0${hours}`;
  } else {
    return `${hours}`;
  }
};

const formatMinutes = minutes => {
  if (minutes === 0) {
    return "00";
  } else {
    return `${minutes}`;
  }
};

module.exports = { formatHours, formatMinutes };
