// Helper functions for date formatting, parsing, and comparison

const dateUtils = {
  /**
   * Formats a date object into a readable string (e.g., 'MM/DD/YYYY').
   * @param {Date} date - The date to format.
   * @returns {string} - The formatted date string.
   */
  formatDate(date) {
    if (!(date instanceof Date)) {
      return 'Invalid date';
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  },

  /**
   * Converts a string date input into a JavaScript Date object.
   * @param {string} dateString - The date string to parse (e.g., 'MM/DD/YYYY').
   * @returns {Date} - The parsed Date object.
   */
  parseDate(dateString) {
    const [month, day, year] = dateString.split('/');
    if (month && day && year) {
      return new Date(year, month - 1, day); // Adjust for zero-indexed month
    }
    return null;
  },

  /**
   * Compares two dates and returns the difference in days.
   * @param {Date} date1 - The first date.
   * @param {Date} date2 - The second date.
   * @returns {number} - The difference in days between the two dates.
   */
  compareDates(date1, date2) {
    const msInDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
    const diffInMs = date2 - date1;
    return Math.round(diffInMs / msInDay);
  },
};

export default dateUtils;
 
