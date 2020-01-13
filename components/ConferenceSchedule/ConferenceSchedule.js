const { conferenceTalkSessions } = require("../../data/conferenceTalkSessions");
const { durationRegex, meridiamRegex } = require("../../common/regex");
const { formatMinutes, formatHours } = require("../../common/formatTime");

const Timetable = require("../Timetable/Timetable");
const AFTERNOON_SESSION_START_TIME = "01:00PM";
const DURATION_OF_LIGHTNING_TALK = 5;

class ConferenceSchedule {
  constructor(talkDurationAndTitleArray) {
    this.track = 1;
    this.talkDurationAndTitleArray = talkDurationAndTitleArray;
    this.isUnscheduledTalks = false;
    this.scheduleForADay = {
      track: this.track,
      morningSession: [],
      afternoonSession: []
    };
    this.scheduleForConference = [];
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

  firstTalkOfTheSession(index) {
    return index === 0;
  }

  isAfternoonSession(startTime) {
    return startTime === AFTERNOON_SESSION_START_TIME;
  }

  assignTimingsToTalks(
    talkDurationAndTitleArray,
    startTime,
    durationOfAvailableTimeForTalks
  ) {
    const timetableForASession = new Timetable(durationOfAvailableTimeForTalks);
    const arrayOfTalksForTimeSlot = timetableForASession.createArrayOfTalksForTimeSlot(
      talkDurationAndTitleArray
    );

    const startTimeArray = startTime.match(durationRegex);
    const currentTimeMeridiem = startTime.match(meridiamRegex);

    let currentTimeHour = Number(startTimeArray[0]);
    let currentTimeMins = Number(startTimeArray[1]);

    let [printTimeHours, printTimeMins] = [currentTimeHour, currentTimeMins];

    const scheduledTalksWithTimingArray = arrayOfTalksForTimeSlot.map(
      (talk, index) => {
        let scheduledTalkTime = "";
        let durationOfTalk;

        this.firstTalkOfTheSession(index)
          ? (scheduledTalkTime = startTime)
          : (scheduledTalkTime = `${printTimeHours}:${printTimeMins}${currentTimeMeridiem}`);

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

    if (this.isAfternoonSession(startTime)) {
      scheduledTalksWithTimingArray.push(
        `${printTimeHours}:${printTimeMins}${currentTimeMeridiem} Networking Event`
      );
    }

    return scheduledTalksWithTimingArray;
  }

  getScheduledTalksForOneTrack(talkDurationAndTitleArray) {
    const arrayOfTalksWithAssignedTimingsForMorning = this.assignTimingsToTalks(
      talkDurationAndTitleArray,
      conferenceTalkSessions[0].startTime,
      conferenceTalkSessions[0].durationOfAvailableTimeForTalks
    );
    this.scheduleForADay.morningSession = arrayOfTalksWithAssignedTimingsForMorning;

    const arrayOfTalksWithAssignedTimingsForAfternoon = this.assignTimingsToTalks(
      talkDurationAndTitleArray,
      conferenceTalkSessions[1].startTime,
      conferenceTalkSessions[1].durationOfAvailableTimeForTalks
    );
    this.scheduleForADay.afternoonSession = arrayOfTalksWithAssignedTimingsForAfternoon;

    return this.scheduleForADay;
  }

  checkForUnscheduledTalks(talkDurationAndTitleArray) {
    for (let i = 0; i < talkDurationAndTitleArray.length; i++) {
      if (talkDurationAndTitleArray[i].titles.length > 0) {
        return (this.isUnscheduledTalks = true);
      }
    }
    return this.isUnscheduledTalks;
  }

  getScheduledTalksForConferenceArray(talkDurationAndTitleArray) {
    this.checkForUnscheduledTalks(talkDurationAndTitleArray);
    while (this.isUnscheduledTalks === true) {
      this.scheduleForADay = {
        track: this.track,
        morningSession: [],
        afternoonSession: []
      };
      this.track += 1;
      const scheduleForADay = this.getScheduledTalksForOneTrack(
        talkDurationAndTitleArray
      );
      this.scheduleForConference.push(scheduleForADay);
      this.isUnscheduledTalks = false;
      this.checkForUnscheduledTalks(talkDurationAndTitleArray);
    }
    return this.scheduleForConference;
  }
}

module.exports = ConferenceSchedule;
