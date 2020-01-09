const { formatMinutes, formatHours } = require("./formatTime");

class Timetable {
  constructor(timeAvailable) {
    this.scheduledTalksWithinTimeSlot = [];
    this.remainingTime = timeAvailable;
  }

  addTalkToTimetable(array, index) {
    return this.scheduledTalksWithinTimeSlot.push(array[index].titles[0]);
  }

  removeTalkFromTalkData(array, index) {
    array[index].titles.shift();
  }

  createArrayOfTalksForTimeSlot(talkDurationAndTitleObject) {
    for (let i = 0; i < talkDurationAndTitleObject.length; i++) {
      if (this.remainingTime === 0) {
        break;
      }

      if (
        this.remainingTime % talkDurationAndTitleObject[i].duration === 0 &&
        talkDurationAndTitleObject[i].titles.length > 0
      ) {
        this.addTalkToTimetable(talkDurationAndTitleObject, i);
        this.removeTalkFromTalkData(talkDurationAndTitleObject, i);
        this.remainingTime -= talkDurationAndTitleObject[i].duration;
        this.createArrayOfTalksForTimeSlot(talkDurationAndTitleObject);
      }
    }
    return this.scheduledTalksWithinTimeSlot;
  }

  assignTimingsForTalks(scheduledTalks, startTime) {
    const durationRegex = /\d+/g;
    const meridiamRegex = /[a-z]+/gi;
    const startTimeArray = startTime.match(durationRegex);
    const currentTimeMeridiem = startTime.match(meridiamRegex);

    let currentTimeHour = Number(startTimeArray[0]);
    let currentTimeMins = Number(startTimeArray[1]);

    let [printTimeHours, printTimeMins] = [currentTimeHour, currentTimeMins];

    const scheduledTalksWithTiming = scheduledTalks.map((talk, index) => {
      let scheduledTalkTime = "";

      if (index === 0) {
        scheduledTalkTime = startTime;
      } else {
        scheduledTalkTime = `${printTimeHours}:${printTimeMins}${currentTimeMeridiem}`;
      }

      let durationOfTalk = Number(talk.match(durationRegex)[0]);
      currentTimeMins += durationOfTalk;

      if (currentTimeMins >= 60) {
        currentTimeHour += 1;
        currentTimeMins -= 60;
      }

      printTimeHours = formatHours(currentTimeHour);
      printTimeMins = formatMinutes(currentTimeMins);

      return scheduledTalkTime.concat(" ", talk);
    });
    return scheduledTalksWithTiming;
  }

  printTimetable(scheduledTalksWithTiming) {
    return scheduledTalksWithTiming.join("\n");
  }
}

module.exports = Timetable;
