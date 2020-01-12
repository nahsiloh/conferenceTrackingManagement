const ConferenceSchedule = require("./ConferenceSchedule");
const talksData = require("../../index.js");
const { executeFormatData } = require("../../common/formatData");
const { printSchedule } = require("../../data/testData");
describe("Conference Schedule", () => {
  it("should get the schedule in an array for the day", () => {
    const testtalkDurationAndTitleArray = executeFormatData(talksData);
    const techWeek = new ConferenceSchedule();
    expect(techWeek.getScheduledTalks(testtalkDurationAndTitleArray)).toBe(
      printSchedule
    );
  });
});
