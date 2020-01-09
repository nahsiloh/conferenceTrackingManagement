const fs = require("fs");
const talksData = fs.readFileSync("./data/talksData.txt", "utf8");

const Timetable = require("./components/Timetable/Timetable");
const FormatData = require("./common/formatData");

const newTalksData = new FormatData(talksData);
const talkDurationAndTitleObject = newTalksData.executeFormatData(talksData);

const track1MorningTimetable = new Timetable(180);
const printTrack1MorningTimetable = track1MorningTimetable.printTimetable(
  talkDurationAndTitleObject,
  "09:00AM"
);

const track1AfternoonTimetable = new Timetable(240);
const printTrack1AfternoonTimetable = track1AfternoonTimetable.printTimetable(
  talkDurationAndTitleObject,
  "01:00PM"
);

const track2MorningTimetable = new Timetable(180);
const printTrack2MorningTimetable = track2MorningTimetable.printTimetable(
  talkDurationAndTitleObject,
  "09:00AM"
);

const track2AfternoonTimetable = new Timetable(240);
const printTrack2AfternoonTimetable = track2AfternoonTimetable.printTimetable(
  talkDurationAndTitleObject,
  "01:00PM"
);

console.log(printTrack1MorningTimetable);
console.log(printTrack1AfternoonTimetable);
console.log(printTrack2MorningTimetable);
console.log(printTrack2AfternoonTimetable);
