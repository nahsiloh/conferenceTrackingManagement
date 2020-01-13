const { durationRegex, getRegexMatchArray } = require("./regex");
const {
  DURATION_OF_LIGHTNING_TALK
} = require("../data/conferenceSessionsData");

const isLightningTalk = durationRegexMatchArray => {
  return durationRegexMatchArray === null;
};

const assignTalkDuration = durationRegexMatchArray => {
  const durationOfTalk = isLightningTalk(durationRegexMatchArray)
    ? DURATION_OF_LIGHTNING_TALK
    : parseInt(durationRegexMatchArray[0]);
  return durationOfTalk;
};

const convertDataToArray = data => {
  return data.split("\n");
};

const sortArrayByDescendingDurations = array => {
  return array.sort((a, b) => b - a);
};

const ifDurationIsUnique = (array, talkDuration) => {
  return array.some(duration => duration === talkDuration) === false;
};

const createUniqueAndSortedArrayOfTalkDurations = dataArray => {
  const uniqueArrayOfTalkDurations = [];

  dataArray.forEach(talk => {
    let oneTalkDurationArray = getRegexMatchArray(talk, durationRegex);
    const oneTalkDurationNumber = assignTalkDuration(oneTalkDurationArray);

    if (uniqueArrayOfTalkDurations.length === 0) {
      uniqueArrayOfTalkDurations.push(oneTalkDurationNumber);
    }

    if (ifDurationIsUnique(uniqueArrayOfTalkDurations, oneTalkDurationNumber)) {
      uniqueArrayOfTalkDurations.push(oneTalkDurationNumber);
    }
  });

  return sortArrayByDescendingDurations(uniqueArrayOfTalkDurations);
};

const getIndexOfLightningTalk = talkDurationAndTitleArray => {
  return talkDurationAndTitleArray.findIndex(
    index => index.duration === DURATION_OF_LIGHTNING_TALK
  );
};

const sortTalksToArrayAccordingToDuration = (
  dataArray,
  talkDurationAndTitleArray
) => {
  dataArray.forEach(talk => {
    if (getRegexMatchArray(talk, durationRegex) === null) {
      const indexOfLightning = getIndexOfLightningTalk(
        talkDurationAndTitleArray
      );
      talkDurationAndTitleArray[indexOfLightning].titles.push(talk);
    } else {
      for (let i = 0; i < talkDurationAndTitleArray.length; i++) {
        if (talk.includes(talkDurationAndTitleArray[i].duration)) {
          talkDurationAndTitleArray[i].titles.push(talk);
          return;
        }
      }
    }
  });
};

const createtalkDurationAndTitleArray = (
  uniqueAndSortedArrayOfTalkDurations,
  dataArray
) => {
  const talkDurationAndTitleArray = [];

  uniqueAndSortedArrayOfTalkDurations.forEach(duration => {
    talkDurationAndTitleArray.push({ duration: duration, titles: [] });
  });

  sortTalksToArrayAccordingToDuration(dataArray, talkDurationAndTitleArray);
  return talkDurationAndTitleArray;
};

const executeFormatData = data => {
  const dataArray = convertDataToArray(data);
  const uniqueTalkDurationArray = createUniqueAndSortedArrayOfTalkDurations(
    dataArray
  );
  const talkDurationAndTitleArray = createtalkDurationAndTitleArray(
    uniqueTalkDurationArray,
    dataArray
  );
  return talkDurationAndTitleArray;
};

module.exports = {
  convertDataToArray,
  createUniqueAndSortedArrayOfTalkDurations,
  createtalkDurationAndTitleArray,
  executeFormatData
};
