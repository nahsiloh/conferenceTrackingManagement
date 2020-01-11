const fs = require("fs");
const talksData = fs.readFileSync("./data/talksData.txt", "utf8");
module.exports = talksData;

const ConferenceSchedule = require("./components/ConferenceSchedule/ConferenceSchedule");
const { executeFormatData } = require("./common/formatData");

const talkDurationAndTitleObject = executeFormatData(talksData);

const techWeek = new ConferenceSchedule();
const schedule = techWeek.getScheduledTalks(talkDurationAndTitleObject);

console.log(schedule);
