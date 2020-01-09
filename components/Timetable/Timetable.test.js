const Timetable = require("./Timetable");
const { executeFormatData } = require("../../common/formatData");
const { testData } = require("../../data/testData");

describe("Create Timetable", () => {
  beforeEach(() => {
    return (talkDurationAndTitleObject = executeFormatData(testData));
  });

  it("should return empty if there are no time slots available", () => {
    const schedule = new Timetable(0);
    expect(
      schedule.createArrayOfTalksForTimeSlot(talkDurationAndTitleObject)
    ).toStrictEqual([]);
  });

  it("should return one 60min talk when there is only 60mins timeslot available", () => {
    const schedule = new Timetable(60);
    expect(
      schedule.createArrayOfTalksForTimeSlot(talkDurationAndTitleObject)
    ).toStrictEqual(["Writing Fast Tests Against Enterprise Rails 60min"]);
  });

  it("should return two 60min talks when there is 120mins timeslot available", () => {
    const schedule = new Timetable(120);
    expect(
      schedule.createArrayOfTalksForTimeSlot(talkDurationAndTitleObject)
    ).toStrictEqual([
      "Writing Fast Tests Against Enterprise Rails 60min",
      "Communicating Over Distance 60min"
    ]);
  });

  it("should return two 60min talks (when there are no more 60min talks), and two 30min talks when there is 180mins timeslot available", () => {
    const schedule = new Timetable(180);
    expect(
      schedule.createArrayOfTalksForTimeSlot(talkDurationAndTitleObject)
    ).toStrictEqual([
      "Writing Fast Tests Against Enterprise Rails 60min",
      "Communicating Over Distance 60min",
      "Sit Down and Write 30min",
      "Lua for the Masses 30min"
    ]);
  });

  it("should return 2 60min, 1 30min and 2 45min talks when there is 240mins timeslot available", () => {
    const schedule = new Timetable(240);
    expect(
      schedule.createArrayOfTalksForTimeSlot(talkDurationAndTitleObject)
    ).toStrictEqual([
      "Writing Fast Tests Against Enterprise Rails 60min",
      "Communicating Over Distance 60min",
      "Sit Down and Write 30min",
      "Overdoing it in Python 45min",
      "Ruby Errors from Mismatched Gem Versions 45min"
    ]);
  });

  describe("Assign Timings For Individual Talks", () => {
    it("assign the timings for talks in the morning session", () => {
      const schedule = new Timetable(180);
      const scheduledTalksWithinTimeSlot = schedule.createArrayOfTalksForTimeSlot(
        talkDurationAndTitleObject
      );
      const output = [
        "09:00AM Writing Fast Tests Against Enterprise Rails 60min",
        "10:00AM Communicating Over Distance 60min",
        "11:00AM Sit Down and Write 30min",
        "11:30AM Lua for the Masses 30min"
      ];
      expect(
        schedule.assignTimingsForTalks(scheduledTalksWithinTimeSlot, "09:00AM")
      ).toStrictEqual(output);
    });

    it("assign the timings for talks in the afternoon session", () => {
      const schedule = new Timetable(240);
      const scheduledTalksWithinTimeSlot = schedule.createArrayOfTalksForTimeSlot(
        talkDurationAndTitleObject
      );
      const output = [
        "01:00PM Writing Fast Tests Against Enterprise Rails 60min",
        "02:00PM Communicating Over Distance 60min",
        "03:00PM Sit Down and Write 30min",
        "03:30PM Overdoing it in Python 45min",
        "04:15PM Ruby Errors from Mismatched Gem Versions 45min"
      ];
      expect(
        schedule.assignTimingsForTalks(scheduledTalksWithinTimeSlot, "01:00PM")
      ).toStrictEqual(output);
    });
  });

  describe("Print Timetable", () => {
    it("include the start times for the talks for morning session", () => {
      const schedule = new Timetable(180);
      const print =
        "09:00AM Writing Fast Tests Against Enterprise Rails 60min\n" +
        "10:00AM Communicating Over Distance 60min\n" +
        "11:00AM Sit Down and Write 30min\n" +
        "11:30AM Lua for the Masses 30min";
      expect(
        schedule.printTimetable(talkDurationAndTitleObject, "09:00AM")
      ).toBe(print);
    });

    it("include the start times for the talks for afternoon session", () => {
      const schedule = new Timetable(240);
      const print =
        "01:00PM Writing Fast Tests Against Enterprise Rails 60min\n" +
        "02:00PM Communicating Over Distance 60min\n" +
        "03:00PM Sit Down and Write 30min\n" +
        "03:30PM Overdoing it in Python 45min\n" +
        "04:15PM Ruby Errors from Mismatched Gem Versions 45min";
      expect(
        schedule.printTimetable(talkDurationAndTitleObject, "01:00PM")
      ).toBe(print);
    });
  });
});
