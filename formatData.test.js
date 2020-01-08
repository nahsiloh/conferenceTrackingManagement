const {
  convertDataToArray,
  createUniqueTalkDurationArray,
  createTalkDurationAndTitleObject
} = require("./formatData");

const {
  testData,
  testDataArray,
  testUniqueTalkDurationArray,
  testTalkDurationAndTitleObject
} = require("./testData");

describe("Format Data", () => {
  it("should parse data to array", () => {
    expect(convertDataToArray(testData)).toStrictEqual(testDataArray);
  });

  it("should create a unique date array", () => {
    expect(createUniqueTalkDurationArray(testDataArray)).toStrictEqual(
      testUniqueTalkDurationArray
    );
  });

  it("should create a unique date array", () => {
    expect(
      createTalkDurationAndTitleObject(
        testUniqueTalkDurationArray,
        testDataArray
      )
    ).toStrictEqual(testTalkDurationAndTitleObject);
  });

  describe("should be able to format lightning talks which are 5mins", () => {});
});
