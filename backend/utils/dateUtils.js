function getWeekStartTime() {
  const today = new Date();

  // Calculate the start of the week (Sunday) in UTC
  const dayOfWeek = today.getUTCDay();
  const daysToSubtract = dayOfWeek;
  const weekStart = new Date(
    today.getTime() - daysToSubtract * 24 * 60 * 60 * 1000
  );

  // Extract year, month, and day from the week start date
  const year = weekStart.getUTCFullYear();
  const month = String(weekStart.getUTCMonth() + 1).padStart(2, "0");
  const day = String(weekStart.getUTCDate()).padStart(2, "0");

  return `${year}${month}${day}T0000`;
}

module.exports = getWeekStartTime;
