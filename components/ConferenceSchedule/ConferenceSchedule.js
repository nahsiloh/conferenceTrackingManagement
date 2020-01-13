const {
  MORNING_SESSION_START_TIME,
  MORNING_SESSION_DURATION,
  AFTERNOON_SESSION_START_TIME,
  AFTERNOON_SESSION_DURATION
} = require("../../data/conferenceSessionsData");
const CreateTimetable = require("../CreateTimetable/CreateTimetable");
class ConferenceSchedule {
  constructor() {
    this.track = 1;
    this.isUnscheduledTalks = false;
    this.scheduleForADay = {
      track: this.track,
      morningSession: [],
      afternoonSession: []
    };
    this.scheduleForConference = [];
  }

  resestState() {
    this.scheduleForADay = {
      track: this.track,
      morningSession: [],
      afternoonSession: []
    };
    this.track += 1;
    this.isUnscheduledTalks = false;
  }

  getScheduledTalksForOneTrack(talkDurationAndTitleArray) {
    const morningTimetable = new CreateTimetable();
    const afternoonTimetable = new CreateTimetable();

    const arrayOfTalksWithAssignedTimingsForMorning = morningTimetable.assignTimingsToTalks(
      talkDurationAndTitleArray,
      MORNING_SESSION_START_TIME,
      MORNING_SESSION_DURATION
    );
    this.scheduleForADay.morningSession = arrayOfTalksWithAssignedTimingsForMorning;

    const arrayOfTalksWithAssignedTimingsForAfternoon = afternoonTimetable.assignTimingsToTalks(
      talkDurationAndTitleArray,
      AFTERNOON_SESSION_START_TIME,
      AFTERNOON_SESSION_DURATION
    );
    this.scheduleForADay.afternoonSession = arrayOfTalksWithAssignedTimingsForAfternoon;

    return this.scheduleForADay;
  }

  isTalksUnscheduled(talk) {
    return talk.titles.length > 0;
  }

  checkForUnscheduledTalks(talkDurationAndTitleArray) {
    talkDurationAndTitleArray.forEach(talk => {
      if (this.isTalksUnscheduled(talk)) {
        return (this.isUnscheduledTalks = true);
      }
    });
    return this.isUnscheduledTalks;
  }

  getScheduledTalksForConferenceArray(talkDurationAndTitleArray) {
    this.checkForUnscheduledTalks(talkDurationAndTitleArray);
    while (this.isUnscheduledTalks === true) {
      this.resestState();
      const scheduleForADay = this.getScheduledTalksForOneTrack(
        talkDurationAndTitleArray
      );
      this.scheduleForConference.push(scheduleForADay);
      this.checkForUnscheduledTalks(talkDurationAndTitleArray);
    }
    return this.scheduleForConference;
  }
}

module.exports = ConferenceSchedule;
