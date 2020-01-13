const durationRegex = /\d+/g;
const meridiamRegex = /[a-z]+/gi;

const getRegexMatchArray = (string, regex) => {
  return string.match(regex);
};

module.exports = { durationRegex, meridiamRegex, getRegexMatchArray };
