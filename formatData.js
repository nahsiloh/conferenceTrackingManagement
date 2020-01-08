const data = require("./index");

const DURATION_OF_LIGHTNING = "5min";
const durationRegex = /\d+min/g;

const checkForLightningTalks = talkDuration => {
  if (talkDuration === null) {
    talkDuration = [DURATION_OF_LIGHTNING];
  }
};

const convertDataToArray = data => {
  const dataArray = data.split("\n");
  return dataArray;
};

const createUniqueTalkDurationArray = dataArray => {
  const uniqueTalkDurationArray = [];

  dataArray.forEach(talk => {
    let oneTalkDuration = talk.match(durationRegex);

    if (oneTalkDuration === null) {
      oneTalkDuration = [DURATION_OF_LIGHTNING];
    }

    if (uniqueTalkDurationArray.length === 0) {
      uniqueTalkDurationArray.push(oneTalkDuration[0]);
    }

    if (uniqueTalkDurationArray.length > 0) {
      if (
        uniqueTalkDurationArray.some(
          duration => duration === oneTalkDuration[0]
        ) === false
      ) {
        uniqueTalkDurationArray.push(oneTalkDuration[0]);
      }
    }
  });
  return uniqueTalkDurationArray;
};

const createTalkDurationAndTitleObject = (
  uniqueTalkDurationArray,
  dataArray
) => {
  const talkDurationAndTitleObject = [];

  uniqueTalkDurationArray.forEach(duration => {
    talkDurationAndTitleObject.push({ duration: duration, titles: [] });
  });

  dataArray.forEach(talk => {
    if (talk.match(durationRegex) === null) {
      const indexOfLightning = talkDurationAndTitleObject.findIndex(
        index => index.duration === DURATION_OF_LIGHTNING
      );
      talkDurationAndTitleObject[indexOfLightning].titles.push(talk);
    } else {
      for (let i = 0; i < talkDurationAndTitleObject.length; i++) {
        if (talk.includes(talkDurationAndTitleObject[i].duration)) {
          talkDurationAndTitleObject[i].titles.push(talk);
          return;
        }
      }
    }
  });

  return talkDurationAndTitleObject;
};

module.exports = {
  convertDataToArray,
  createUniqueTalkDurationArray,
  createTalkDurationAndTitleObject
};
