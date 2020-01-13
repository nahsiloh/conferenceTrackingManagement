module.exports.printTimeFormat = (hours, mins, meridiam) => {
  return `${hours}:${mins}${meridiam}`;
};

function convertScheduledTalksToString(scheduledTalksWithTiming) {
  return scheduledTalksWithTiming.join("\n");
}

module.exports.printScheduleFormat = (
  track,
  morningSession,
  afternoonSession
) => {
  return (
    `Track${track}\n` +
    `${convertScheduledTalksToString(morningSession)}\n` +
    "12:00PM Lunch\n" +
    `${convertScheduledTalksToString(afternoonSession)}\n`
  );
};
