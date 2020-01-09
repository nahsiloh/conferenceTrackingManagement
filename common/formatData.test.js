const FormatData = require("./formatData");

const {
  testData,
  testDataArray,
  testUniqueTalkDurationArray,
  testUniqueTalkDurationArraySorted,
  testTalkDurationAndTitleObject
} = require("../data/testData");

const {
  convertDataToArray,
  createUniqueTalkDurationArray,
  sortUniqueTalkDurationArray,
  createTalkDurationAndTitleObject,
  executeFormatData
} = require("./formatData");

describe("Format Data", () => {
  it("should parse data to array", () => {
    expect(convertDataToArray(testData)).toStrictEqual(testDataArray);
  });

  it("should create a unique date array", () => {
    expect(createUniqueTalkDurationArray(testDataArray)).toStrictEqual(
      testUniqueTalkDurationArray
    );
  });

  it("should sort the unique date array in descending order", () => {
    expect(
      sortUniqueTalkDurationArray(testUniqueTalkDurationArray)
    ).toStrictEqual(testUniqueTalkDurationArraySorted);
  });

  it("should create a unique date array", () => {
    expect(
      createTalkDurationAndTitleObject(
        testUniqueTalkDurationArray,
        testDataArray
      )
    ).toStrictEqual(testTalkDurationAndTitleObject);
  });

  describe("Execute Format Data", () => {
    expect(executeFormatData(testData)).toStrictEqual(
      testTalkDurationAndTitleObject
    );
  });
});
