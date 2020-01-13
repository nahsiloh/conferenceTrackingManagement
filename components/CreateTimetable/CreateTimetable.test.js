const CreateTimetable = require("./CreateTimetable");
const { testData } = require("../../data/testData");
const { executeFormatData } = require("../../common/formatData");

describe("Create Timetable", () => {
  beforeEach(() => {
    return (testtalkDurationAndTitleArray = executeFormatData(testData));
  });

  describe("Assign timings for the talks", () => {
    it("should output an array of talks with timings for the morning session", () => {
      const techWeek = new CreateTimetable();
      const output = [
        "09:00AM Writing Fast Tests Against Enterprise Rails 60min",
        "10:00AM Communicating Over Distance 60min",
        "11:00AM Sit Down and Write 30min",
        "11:30AM Lua for the Masses 30min"
      ];
      expect(
        techWeek.assignTimingsToTalks(
          testtalkDurationAndTitleArray,
          "09:00AM",
          180
        )
      ).toStrictEqual(output);
    });
  });

  it("should output an array of talks with timings for the afternoon session", () => {
    const techWeek = new CreateTimetable();
    const output = [
      "01:00PM Writing Fast Tests Against Enterprise Rails 60min",
      "02:00PM Communicating Over Distance 60min",
      "03:00PM Sit Down and Write 30min",
      "03:30PM Overdoing it in Python 45min",
      "04:15PM Ruby Errors from Mismatched Gem Versions 45min",
      "05:00PM Networking Event"
    ];
    expect(
      techWeek.assignTimingsToTalks(
        testtalkDurationAndTitleArray,
        "01:00PM",
        240
      )
    ).toStrictEqual(output);
  });
});
