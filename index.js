const fs = require("fs");
const talksData = fs.readFileSync("./data/talksData.txt", "utf8");
module.exports = talksData;

const ConferenceSchedule = require("./components/ConferenceSchedule/ConferenceSchedule");
const { executeFormatData } = require("./common/formatData");
const { printScheduleFormat } = require("./common/printFormat");

const talkDurationAndTitleArray = executeFormatData(talksData);

const techWeek = new ConferenceSchedule();
const conferenceScheduleArray = techWeek.getScheduledTalksForConferenceArray(
  talkDurationAndTitleArray
);

(function printSchedule() {
  conferenceScheduleArray.forEach(tracks => {
    console.log(
      printScheduleFormat(
        tracks.track,
        tracks.morningSession,
        tracks.afternoonSession
      )
    );
  });
  return;
})();
