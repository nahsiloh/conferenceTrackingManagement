const fs = require("fs");
const talksData = fs.readFileSync("./data/talksData.txt", "utf8");
module.exports = talksData;

const ConferenceSchedule = require("./components/ConferenceSchedule/ConferenceSchedule");
const { executeFormatData } = require("./common/formatData");

const talkDurationAndTitleArray = executeFormatData(talksData);

const techWeek = new ConferenceSchedule();
const conferenceScheduleArray = techWeek.getScheduledTalksForConferenceArray(
  talkDurationAndTitleArray
);

function convertScheduledTalksToString(scheduledTalksWithTiming) {
  return scheduledTalksWithTiming.join("\n");
}

(function printSchedule() {
  conferenceScheduleArray.forEach(tracks =>
    console.log(
      `Track${tracks.track}\n` +
        `${convertScheduledTalksToString(tracks.morningSession)}\n` +
        "12:00PM Lunch\n" +
        `${convertScheduledTalksToString(tracks.afternoonSession)}\n`
    )
  );
  return;
})();
