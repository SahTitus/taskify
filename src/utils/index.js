/**
 * Formats a date string to a user-friendly format.
 *
 * - If the date is today, it returns "Today".
 * - If the date was yesterday, it returns "Yesterday".
 * - Otherwise, it returns the formatted date string.
 *
 * @param {string} dateStr - The date string to format.
 * @returns {string} - A readable date format.
 */
export const formatDate = (dateStr) => {
  const today = new Date();
  const taskDate = new Date(dateStr);

  // Calculate the difference in time between today and the task date
  const differenceInTime = today - taskDate;

  // Convert the time difference to days
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  if (differenceInDays === 0) return "Today"; // If the task date is today
  if (differenceInDays === 1) return "Yesterday"; // If the task date was yesterday

  return taskDate.toLocaleDateString();
};
