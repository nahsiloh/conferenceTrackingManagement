module.exports.testData =
  "Overdoing it in Python 45min\nSit Down and Write 30min\nWriting Fast Tests Against Enterprise Rails 60min\nLua for the Masses 30min\nRuby Errors from Mismatched Gem Versions 45min\nRails for Python Developers lightning\nCommunicating Over Distance 60min";

module.exports.testDataArray = [
  "Overdoing it in Python 45min",
  "Sit Down and Write 30min",
  "Writing Fast Tests Against Enterprise Rails 60min",
  "Lua for the Masses 30min",
  "Ruby Errors from Mismatched Gem Versions 45min",
  "Rails for Python Developers lightning",
  "Communicating Over Distance 60min"
];

module.exports.testUniqueTalkDurationArray = [45, 30, 60, 5];

module.exports.testUniqueTalkDurationArraySorted = [60, 45, 30, 5];

module.exports.testTalkDurationAndTitleObject = [
  {
    duration: 60,
    titles: [
      "Writing Fast Tests Against Enterprise Rails 60min",
      "Communicating Over Distance 60min"
    ]
  },
  {
    duration: 45,
    titles: [
      "Overdoing it in Python 45min",
      "Ruby Errors from Mismatched Gem Versions 45min"
    ]
  },
  {
    duration: 30,
    titles: ["Sit Down and Write 30min", "Lua for the Masses 30min"]
  },
  { duration: 5, titles: ["Rails for Python Developers lightning"] }
];
