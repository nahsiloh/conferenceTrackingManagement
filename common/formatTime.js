const MAX_SINGLE_DIGIT_NUMBER = 9;

const formatHours = hours => {
  if (hours <= MAX_SINGLE_DIGIT_NUMBER) {
    return `0${hours}`;
  } else {
    return `${hours}`;
  }
};

const formatMinutes = minutes => {
  if (minutes === 0) {
    return "00";
  } else if (minutes <= MAX_SINGLE_DIGIT_NUMBER) {
    return `0${minutes}`;
  } else {
    return `${minutes}`;
  }
};

module.exports = { formatHours, formatMinutes };
