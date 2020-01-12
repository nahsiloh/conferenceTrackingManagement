const ConferenceSchedule = require("./ConferenceSchedule");
const talksData = require("../../index.js");
const { executeFormatData } = require("../../common/formatData");
const { printSchedule } = require("../../data/testData");
const { conferenceTalkSessions } = require("../../data/conferenceTalkSessions");

const scheduleForADay = [];

describe("Conference Schedule", () => {
  it("should get the schedule in an array for the day", () => {
    const testtalkDurationAndTitleArray = executeFormatData(talksData);
    const techWeek = new ConferenceSchedule();
    expect(
      techWeek.scheduleForADay(
        testtalkDurationAndTitleArray,
        conferenceTalkSessions
      )
    ).toBe(printSchedule);
  });
});
