const GenerateTalkList = require("../GenerateTalkList/GenerateTalkList");
const {
  durationRegex,
  meridiamRegex,
  getRegexMatchArray
} = require("../../common/regex");
const { formatMinutes, formatHours } = require("../../common/formatTime");
const { printTimeFormat } = require("../../common/printFormat");

const {
  AFTERNOON_SESSION_START_TIME,
  DURATION_OF_LIGHTNING_TALK
} = require("../../data/conferenceSessionsData");

class CreateTimetable {
  firstTalkOfTheSession(index) {
    return index === 0;
  }

  checkIfTalkIsLightning(talk) {
    const durationOfTalk =
      talk.match(durationRegex) === null
        ? DURATION_OF_LIGHTNING_TALK
        : Number(talk.match(durationRegex)[0]);
    return durationOfTalk;
  }

  minutesIsMoreThan60(mins) {
    return mins >= 60;
  }

  addNetworkingInAfternoonSession(startTime) {
    return startTime === AFTERNOON_SESSION_START_TIME;
  }

  getArrayOfTalksForASession(
    talkDurationAndTitleArray,
    durationOfAvailableTimeForTalks
  ) {
    const talkListForASession = new GenerateTalkList(
      durationOfAvailableTimeForTalks
    );
    return talkListForASession.createArrayOfTalksForTimeSlot(
      talkDurationAndTitleArray
    );
  }

  assignTimingsToTalks(
    talkDurationAndTitleArray,
    startTime,
    durationOfAvailableTimeForTalks
  ) {
    const arrayOfTalksForTimeSlot = this.getArrayOfTalksForASession(
      talkDurationAndTitleArray,
      durationOfAvailableTimeForTalks
    );

    const startTimeArray = getRegexMatchArray(startTime, durationRegex);
    const currentTimeMeridiem = getRegexMatchArray(startTime, meridiamRegex);

    let currentTimeHour = Number(startTimeArray[0]);
    let currentTimeMins = Number(startTimeArray[1]);
    let [printTimeHours, printTimeMins] = [currentTimeHour, currentTimeMins];

    const scheduledTalksWithTimingArray = arrayOfTalksForTimeSlot.map(
      (talk, index) => {
        let scheduledTalkTime = "";
        let durationOfTalk;

        this.firstTalkOfTheSession(index)
          ? (scheduledTalkTime = startTime)
          : (scheduledTalkTime = printTimeFormat(
              printTimeHours,
              printTimeMins,
              currentTimeMeridiem
            ));

        durationOfTalk = this.checkIfTalkIsLightning(talk);
        currentTimeMins += durationOfTalk;

        if (this.minutesIsMoreThan60(currentTimeMins)) {
          currentTimeHour += 1;
          currentTimeMins -= 60;
        }

        printTimeHours = formatHours(currentTimeHour);
        printTimeMins = formatMinutes(currentTimeMins);

        return scheduledTalkTime.concat(" ", talk);
      }
    );

    if (this.addNetworkingInAfternoonSession(startTime)) {
      scheduledTalksWithTimingArray.push(
        printTimeFormat(printTimeHours, printTimeMins, currentTimeMeridiem) +
          " Networking Event"
      );
    }

    return scheduledTalksWithTimingArray;
  }
}

module.exports = CreateTimetable;
