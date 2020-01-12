const { formatMinutes, formatHours } = require("../../common/formatTime");
const { durationRegex, meridiamRegex } = require("../../common/regex");
const DURATION_OF_LIGHTNING_TALK = 5;
const AFTERNOON_SESSION_START_TIME = "01:00PM";

class Timetable {
  constructor(timeAvailable) {
    this.arrayOfTalksForTimeSlot = [];
    this.remainingTime = timeAvailable;
  }

  addTalkToTimetable(array, index) {
    return this.arrayOfTalksForTimeSlot.push(array[index].titles[0]);
  }

  removeTalkFromTalkData(array, index) {
    array[index].titles.shift();
  }

  createArrayOfTalksForTimeSlot(talkDurationAndTitleArray) {
    for (let i = 0; i < talkDurationAndTitleArray.length; i++) {
      if (this.remainingTime === 0) {
        break;
      }

      if (
        this.remainingTime % talkDurationAndTitleArray[i].duration === 0 &&
        talkDurationAndTitleArray[i].titles.length > 0
      ) {
        this.addTalkToTimetable(talkDurationAndTitleArray, i);
        this.removeTalkFromTalkData(talkDurationAndTitleArray, i);
        this.remainingTime -= talkDurationAndTitleArray[i].duration;
        this.createArrayOfTalksForTimeSlot(talkDurationAndTitleArray);
      }
    }
    return this.arrayOfTalksForTimeSlot;
  }

  assignTimingsForTalks(arrayOfTalksForTimeSlot, startTime) {
    const startTimeArray = startTime.match(durationRegex);
    const currentTimeMeridiem = startTime.match(meridiamRegex);

    let currentTimeHour = Number(startTimeArray[0]);
    let currentTimeMins = Number(startTimeArray[1]);

    let [printTimeHours, printTimeMins] = [currentTimeHour, currentTimeMins];

    const scheduledTalksWithTiming = arrayOfTalksForTimeSlot.map(
      (talk, index) => {
        let scheduledTalkTime = "";
        let durationOfTalk;

        index === 0
          ? (scheduledTalkTime = startTime)
          : (scheduledTalkTime = `${printTimeHours}:${printTimeMins}${currentTimeMeridiem}`);

        talk.match(durationRegex) === null
          ? (durationOfTalk = DURATION_OF_LIGHTNING_TALK)
          : (durationOfTalk = Number(talk.match(durationRegex)[0]));

        currentTimeMins += durationOfTalk;

        if (currentTimeMins >= 60) {
          currentTimeHour += 1;
          currentTimeMins -= 60;
        }

        printTimeHours = formatHours(currentTimeHour);
        printTimeMins = formatMinutes(currentTimeMins);

        return scheduledTalkTime.concat(" ", talk);
      }
    );

    if (startTime === AFTERNOON_SESSION_START_TIME) {
      scheduledTalksWithTiming.push(
        `${printTimeHours}:${printTimeMins}${currentTimeMeridiem} Networking Event`
      );
    }

    return scheduledTalksWithTiming;
  }

  convertScheduledTalksToString(scheduledTalksWithTiming) {
    return scheduledTalksWithTiming.join("\n");
  }

  executeTimetable(talkDurationAndTitleArray, startTime) {
    const arrayOfTalksForTimeSlot = this.createArrayOfTalksForTimeSlot(
      talkDurationAndTitleArray
    );
    const arrayOfScheduledTalksWithTiming = this.assignTimingsForTalks(
      arrayOfTalksForTimeSlot,
      startTime
    );
    const compiledTimetable = this.convertScheduledTalksToString(
      arrayOfScheduledTalksWithTiming
    );
    return compiledTimetable;
  }
}

module.exports = Timetable;
