const { formatHours, formatMinutes } = require("./formatTime");

describe("Time Formatter", () => {
  describe("Format Hours", () => {
    it("should be able to format the hours with 1 digit to 2 digits", () => {
      expect(formatHours(5)).toBe("05");
    });

    it("should return the 2 digit hours", () => {
      expect(formatHours(10)).toBe("10");
    });
  });

  describe("Format Minutes", () => {
    it("should be able to format the minutes if it is 0", () => {
      expect(formatMinutes(0)).toBe("00");
    });
  });
});
