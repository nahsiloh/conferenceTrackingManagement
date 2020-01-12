const fs = require("fs");
const talksData = fs.readFileSync("./data/talksData.txt", "utf8");
module.exports = talksData;

const ConferenceSchedule = require("./components/ConferenceSchedule/ConferenceSchedule");
const { executeFormatData } = require("./common/formatData");

const talkDurationAndTitleArray = executeFormatData(talksData);

const techWeek = new ConferenceSchedule();
const schedule = techWeek.scheduleForASession(talkDurationAndTitleArray);

console.log(schedule);
