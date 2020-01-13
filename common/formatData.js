const { durationRegex } = require("./regex");
const DURATION_OF_LIGHTNING_TALK = 5;

const checkIfTalkIsLightning = durationRegexMatchArray => {
  const durationOfTalk =
    durationRegexMatchArray === null
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

const createUniqueAndSortedArrayOfTalkDurations = dataArray => {
  const uniqueArrayOfTalkDurations = [];

  dataArray.forEach(talk => {
    let oneTalkDurationArray = talk.match(durationRegex);
    const oneTalkDurationNumber = checkIfTalkIsLightning(oneTalkDurationArray);

    if (uniqueArrayOfTalkDurations.length === 0) {
      uniqueArrayOfTalkDurations.push(oneTalkDurationNumber);
    } else {
      if (
        uniqueArrayOfTalkDurations.some(
          duration => duration === oneTalkDurationNumber
        ) === false
      ) {
        uniqueArrayOfTalkDurations.push(oneTalkDurationNumber);
      }
    }
  });

  return sortArrayByDescendingDurations(uniqueArrayOfTalkDurations);
};

const createtalkDurationAndTitleArray = (
  uniqueAndSortedArrayOfTalkDurations,
  dataArray
) => {
  const talkDurationAndTitleArray = [];

  uniqueAndSortedArrayOfTalkDurations.forEach(duration => {
    talkDurationAndTitleArray.push({ duration: duration, titles: [] });
  });

  dataArray.forEach(talk => {
    if (talk.match(durationRegex) === null) {
      const indexOfLightning = talkDurationAndTitleArray.findIndex(
        index => index.duration === DURATION_OF_LIGHTNING_TALK
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
