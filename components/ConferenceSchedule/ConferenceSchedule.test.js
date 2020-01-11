const ConferenceSchedule = require("./ConferenceSchedule");
const talksData = require("../../index.js");
const { executeFormatData } = require("../../common/formatData");

const conferenceSchedule = [
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
  {
    session: "networking",
    startTime: "4:00PM",
    durationOfAvailableSlotForTalks: 0
  }
];

const printSchedule =
  "Track1\n" +
  "09:00AM Writing Fast Tests Against Enterprise Rails 60min\n" +
  "10:00AM Communicating Over Distance 60min\n" +
  "11:00AM Rails Magic 60min\n" +
  "12:00PM Lunch\n" +
  "01:00PM Ruby on Rails: Why We Should Move On 60min\n" +
  "02:00PM Ruby on Rails Legacy App Maintenance 60min\n" +
  "03:00PM Lua for the Masses 30min\n" +
  "03:30PM Overdoing it in Python 45min\n" +
  "04:15PM Ruby Errors from Mismatched Gem Versions 45min\n" +
  "05:00PM Networking Event\n" +
  "\n" +
  "Track2\n" +
  "09:00AM Common Ruby Errors 45min\n" +
  "09:45AM Accounting-Driven Development 45min\n" +
  "10:30AM Pair Programming vs Noise 45min\n" +
  "11:15AM Clojure Ate Scala (on my project) 45min\n" +
  "12:00PM Lunch\n" +
  "01:00PM Woah 30min\n" +
  "01:30PM Sit Down and Write 30min\n" +
  "02:00PM Programming in the Boondocks of Seattle 30min\n" +
  "02:30PM Ruby vs. Clojure for Back-End Development 30min\n" +
  "03:00PM A World Without HackerNews 30min\n" +
  "03:30PM User Interface CSS in Rails Apps 30min\n" +
  "04:00PM Rails for Python Developers lightning\n" +
  "04:05PM Networking Event";

describe("Conference Schedule", () => {
  it("should print out the entire Conference Schedule", () => {
    const testTalkDurationAndTitleObject = executeFormatData(talksData);
    const techWeek = new ConferenceSchedule();
    expect(techWeek.getScheduledTalks(testTalkDurationAndTitleObject)).toBe(
      printSchedule
    );
  });
});
