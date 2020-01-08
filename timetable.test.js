const timetable = require("./timetable");
const data = require("./index");

describe("Create Timetable", () => {
  it("should return empty if there are no time slots available", () => {
    expect(timetable(data, 0)).toStrictEqual([]);
  });
});
