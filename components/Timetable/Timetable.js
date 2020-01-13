const { formatMinutes, formatHours } = require("../../common/formatTime");
const { durationRegex, meridiamRegex } = require("../../common/regex");
const DURATION_OF_LIGHTNING_TALK = 5;
const AFTERNOON_SESSION_START_TIME = "01:00PM";

class Timetable {
  constructor(timeAvailable) {
    this.arrayOfTalksForTimeSlot = [];
    this.remainingTime = timeAvailable;
  }

  addTalkToTimetableArray(array, index) {
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
        this.addTalkToTimetableArray(talkDurationAndTitleArray, i);
        this.removeTalkFromTalkData(talkDurationAndTitleArray, i);
        this.remainingTime -= talkDurationAndTitleArray[i].duration;
        this.createArrayOfTalksForTimeSlot(talkDurationAndTitleArray);
      }
    }
    return this.arrayOfTalksForTimeSlot;
  }
}

module.exports = Timetable;
