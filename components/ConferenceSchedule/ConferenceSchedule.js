const conferenceScheduleData = [
  {
    session: "morning",
    startTime: "9:00AM",
    durationOfAvailableSlotForTalks: 180
  },
  {
    session: "lunch",
    startTime: "12:00PM",
    durationOfAvailableSlotForTalks: 0
  },
  {
    session: "afternoon",
    startTime: "1:00PM",
    durationOfAvailableSlotForTalks: 240
  },
  { session: "networking", startTime: "", durationOfAvailableSlotForTalks: 0 }
];

const Timetable = require("../Timetable/Timetable");

class ConferenceSchedule {
  constructor() {}

  getScheduledTalks(talkDurationAndTitleObject) {
    const track1MorningTimetable = new Timetable(180);
    const printTrack1MorningTimetable = track1MorningTimetable.executeTimetable(
      talkDurationAndTitleObject,
      "09:00AM"
    );

    const track1AfternoonTimetable = new Timetable(240);
    const printTrack1AfternoonTimetable = track1AfternoonTimetable.executeTimetable(
      talkDurationAndTitleObject,
      "01:00PM"
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
