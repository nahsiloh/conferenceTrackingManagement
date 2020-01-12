const FormatData = require("./formatData");

const {
  testData,
  testDataArray,
  testUniqueTalkDurationArray,
  testUniqueTalkDurationArraySorted,
  testtalkDurationAndTitleArray
} = require("../data/testData");

const {
  convertDataToArray,
  createUniqueTalkDurationArray,
  sortUniqueTalkDurationArray,
  createtalkDurationAndTitleArray,
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
      createtalkDurationAndTitleArray(
        testUniqueTalkDurationArray,
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
