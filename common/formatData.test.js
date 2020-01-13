const {
  testData,
  testDataArray,
  testUniqueTalkDurationArraySorted,
  testtalkDurationAndTitleArray
} = require("../data/testData");

const {
  convertDataToArray,
  createUniqueAndSortedArrayOfTalkDurations,
  createtalkDurationAndTitleArray,
  executeFormatData
} = require("./formatData");

describe("Format Data", () => {
  it("should parse data to array", () => {
    expect(convertDataToArray(testData)).toStrictEqual(testDataArray);
  });

  it("should create a unique date array", () => {
    expect(
      createUniqueAndSortedArrayOfTalkDurations(testDataArray)
    ).toStrictEqual(testUniqueTalkDurationArraySorted);
  });

  it("should create a unique date array", () => {
    expect(
      createtalkDurationAndTitleArray(
        testUniqueTalkDurationArraySorted,
        testDataArray
      )
    ).toStrictEqual(testtalkDurationAndTitleArray);
  });

  describe("Execute Format Data", () => {
    expect(executeFormatData(testData)).toStrictEqual(
      testtalkDurationAndTitleArray
    );
  });
});
