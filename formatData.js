const DURATION_OF_LIGHTNING_TALK = 5;
const durationRegex = /\d+/g;

class FormatData {
  constructor(data) {
    this.data = data;
  }

  convertDataToArray(data) {
    const dataArray = data.split("\n");
    return dataArray;
  }

  createUniqueTalkDurationArray(dataArray) {
    const uniqueTalkDurationArray = [];

    dataArray.forEach(talk => {
      let oneTalkDurationArray = talk.match(durationRegex);

      if (oneTalkDurationArray === null) {
        oneTalkDurationArray = [DURATION_OF_LIGHTNING_TALK];
      }

      const oneTalkDurationNumber = parseInt(oneTalkDurationArray[0]);

      if (uniqueTalkDurationArray.length === 0) {
        uniqueTalkDurationArray.push(oneTalkDurationNumber);
      }

      if (uniqueTalkDurationArray.length > 0) {
        if (
          uniqueTalkDurationArray.some(
            duration => duration === oneTalkDurationNumber
          ) === false
        ) {
          uniqueTalkDurationArray.push(oneTalkDurationNumber);
        }
      }
    });
    return uniqueTalkDurationArray;
  }

  sortUniqueTalkDurationArray(uniqueTalkDurationArray) {
    const uniqueTalkDurationArraySorted = uniqueTalkDurationArray.sort(
      (a, b) => b - a
    );
    return uniqueTalkDurationArraySorted;
  }

  createTalkDurationAndTitleObject(uniqueTalkDurationArraySorted, dataArray) {
    const talkDurationAndTitleObject = [];

    uniqueTalkDurationArraySorted.forEach(duration => {
      talkDurationAndTitleObject.push({ duration: duration, titles: [] });
    });

    dataArray.forEach(talk => {
      if (talk.match(durationRegex) === null) {
        const indexOfLightning = talkDurationAndTitleObject.findIndex(
          index => index.duration === DURATION_OF_LIGHTNING_TALK
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
  }
}

module.exports = FormatData;
