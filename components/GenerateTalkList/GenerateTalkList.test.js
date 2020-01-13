const GenerateTalkList = require("./GenerateTalkList");
const { executeFormatData } = require("../../common/formatData");
const { testData } = require("../../data/testData");

describe("Create list of talks for a time slot", () => {
  beforeEach(() => {
    return (talkDurationAndTitleArray = executeFormatData(testData));
  });

  it("should return empty if there are no time slots available", () => {
    const schedule = new GenerateTalkList(0);
    expect(
      schedule.createArrayOfTalksForTimeSlot(talkDurationAndTitleArray)
    ).toStrictEqual([]);
  });

  it("should return one 60min talk when there is only 60mins timeslot available", () => {
    const schedule = new GenerateTalkList(60);
    expect(
      schedule.createArrayOfTalksForTimeSlot(talkDurationAndTitleArray)
    ).toStrictEqual(["Writing Fast Tests Against Enterprise Rails 60min"]);
  });

  it("should return two 60min talks when there is 120mins timeslot available", () => {
    const schedule = new GenerateTalkList(120);
    expect(
      schedule.createArrayOfTalksForTimeSlot(talkDurationAndTitleArray)
    ).toStrictEqual([
      "Writing Fast Tests Against Enterprise Rails 60min",
      "Communicating Over Distance 60min"
    ]);
  });

  it("should return two 60min talks (when there are no more 60min talks), and two 30min talks when there is 180mins timeslot available", () => {
    const schedule = new GenerateTalkList(180);
    expect(
      schedule.createArrayOfTalksForTimeSlot(talkDurationAndTitleArray)
    ).toStrictEqual([
      "Writing Fast Tests Against Enterprise Rails 60min",
      "Communicating Over Distance 60min",
      "Sit Down and Write 30min",
      "Lua for the Masses 30min"
    ]);
  });

  it("should return 2 60min, 1 30min and 2 45min talks when there is 240mins timeslot available", () => {
    const schedule = new GenerateTalkList(240);
    expect(
      schedule.createArrayOfTalksForTimeSlot(talkDurationAndTitleArray)
    ).toStrictEqual([
      "Writing Fast Tests Against Enterprise Rails 60min",
      "Communicating Over Distance 60min",
      "Sit Down and Write 30min",
      "Overdoing it in Python 45min",
      "Ruby Errors from Mismatched Gem Versions 45min"
    ]);
  });
});
