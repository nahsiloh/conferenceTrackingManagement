const MAX_SINGLE_DIGIT_NUMBER = 9;

const formatHours = hours => {
  let printTimeHours;
  if (hours <= MAX_SINGLE_DIGIT_NUMBER) {
    printTimeHours = `0${hours}`;
  } else {
    printTimeHours = `${hours}`;
  }
  return printTimeHours;
};

const formatMinutes = minutes => {
  let printTimeMins;
  if (minutes === 0) {
    printTimeMins = "00";
  } else if (minutes <= MAX_SINGLE_DIGIT_NUMBER) {
    printTimeMins = `0${minutes}`;
  } else {
    printTimeMins = `${minutes}`;
  }
  return printTimeMins;
};

module.exports = { formatHours, formatMinutes };
