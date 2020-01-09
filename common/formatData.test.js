const FormatData = require("./formatData");

const {
  testData,
  testDataArray,
  testUniqueTalkDurationArray,
  testUniqueTalkDurationArraySorted,
  testTalkDurationAndTitleObject
} = require("../data/testData");

describe("Format Data", () => {
  it("should parse data to array", () => {
    const newData = new FormatData(testData);
    expect(newData.convertDataToArray(testData)).toStrictEqual(testDataArray);
  });

  it("should create a unique date array", () => {
    const newData = new FormatData(testData);
    expect(newData.createUniqueTalkDurationArray(testDataArray)).toStrictEqual(
      testUniqueTalkDurationArray
    );
  });

  it("should sort the unique date array in descending order", () => {
    const newData = new FormatData(testData);
    expect(
      newData.sortUniqueTalkDurationArray(testUniqueTalkDurationArray)
    ).toStrictEqual(testUniqueTalkDurationArraySorted);
  });

  it("should create a unique date array", () => {
    const newData = new FormatData(testData);
    expect(
      newData.createTalkDurationAndTitleObject(
        testUniqueTalkDurationArray,
        testDataArray
      )
    ).toStrictEqual(testTalkDurationAndTitleObject);
  });

  describe("Execute Format Data", () => {
    const newData = new FormatData(testData);
    expect(newData.executeFormatData(testData)).toStrictEqual(
      testTalkDurationAndTitleObject
    );
  });
});
