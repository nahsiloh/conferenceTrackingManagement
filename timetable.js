const data = require("./index");

NUMBER_OF_MINS_DURING_MORNING_SESSION = 180;
MIN_NUMBER_OF_MINS_DURING_AFTERNOON_SESSION = 180;
MAX_NUMBER_OF_MINS_DURING_AFTERNOON_SESSION = 240;

class Timetable {
  constructor(timeAvailable) {
    this.scheduledTalks = [];
    this.remainingTime = timeAvailable;
  }

  addTalkToTimetable(index) {
    return this.scheduledTalks.push(
      talkDurationAndTitleObject[index].titles[0]
    );
  }

  removeTalkFromTalkData(index) {
    talkDurationAndTitleObject[index].titles.shift();
  }

  createTimetable(talkDurationAndTitleObject) {
    for (let i = 0; i < talkDurationAndTitleObject.length; i++) {
      if (this.remainingTime === 0) {
        break;
      }

      if (
        this.remainingTime % talkDurationAndTitleObject[i].duration === 0 &&
        talkDurationAndTitleObject[i].titles.length > 0
      ) {
        this.addTalkToTimetable(i);
        this.removeTalkFromTalkData(i);
        this.remainingTime -= talkDurationAndTitleObject[i].duration;
        this.createTimetable(talkDurationAndTitleObject);
      }
    }
    return this.scheduledTalks;
  }
}

module.exports = Timetable;
