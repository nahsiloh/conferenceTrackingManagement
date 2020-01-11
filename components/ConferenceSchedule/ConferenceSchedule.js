const { conferenceTalkSessions } = require("../../data/conferenceTalkSessions");
const Timetable = require("../Timetable/Timetable");

class ConferenceSchedule {
  constructor(conferenceDays) {
    this.conferenceDays = conferenceDays;
  }

  getScheduledTalks(talkDurationAndTitleObject) {
    const track1MorningTimetable = new Timetable(
      conferenceTalkSessions[0].durationOfAvailableTimeForTalks
    );
    const printTrack1MorningTimetable = track1MorningTimetable.executeTimetable(
      talkDurationAndTitleObject,
      conferenceTalkSessions[0].startTime
    );

    const track1AfternoonTimetable = new Timetable(
      conferenceTalkSessions[1].durationOfAvailableTimeForTalks
    );
    const printTrack1AfternoonTimetable = track1AfternoonTimetable.executeTimetable(
      talkDurationAndTitleObject,
      conferenceTalkSessions[1].startTime
    );

    const track2MorningTimetable = new Timetable(180);
    const printTrack2MorningTimetable = track2MorningTimetable.executeTimetable(
      talkDurationAndTitleObject,
      "09:00AM"
    );

    const track2AfternoonTimetable = new Timetable(240);
    const printTrack2AfternoonTimetable = track2AfternoonTimetable.executeTimetable(
      talkDurationAndTitleObject,
      "01:00PM"
    );

    return (
      "Track1\n" +
      `${printTrack1MorningTimetable}\n` +
      "12:00PM Lunch\n" +
      `${printTrack1AfternoonTimetable}\n` +
      "\n" +
      "Track2\n" +
      `${printTrack2MorningTimetable}\n` +
      "12:00PM Lunch\n" +
      `${printTrack2AfternoonTimetable}`
    );
  }
}

module.exports = ConferenceSchedule;
