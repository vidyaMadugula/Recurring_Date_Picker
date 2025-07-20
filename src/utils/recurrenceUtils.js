import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(advancedFormat);


/**
 * Generate recurring dates between a start and end date based on recurrence rules.
 * 
 * @param {Object} options - Configuration object
 * @param {'DAILY'|'WEEKLY'|'MONTHLY'|'YEARLY'} options.frequency
 * @param {number} options.interval - Repeat every X units
 * @param {string} options.startDate - ISO date string
 * @param {string} options.endDate - ISO date string
 * @param {number[]} [options.selectedDays] - For weekly recurrence, 0 (Sun) to 6 (Sat)
 * @param {Object} [options.monthlyPattern] - For monthly recurrence { week: 'First'|'Second'|'Third'|'Fourth'|'Last', day: 'Monday'... }
 * 
 * @returns {string[]} - Array of recurring date strings (ISO format)
 */
export function generateRecurringDates({
  frequency,
  interval = 1,
  startDate,
  endDate,
  selectedDays = [],
  monthlyPattern,
}) {
  if (!startDate) return [];

  const start = dayjs(startDate);
  const end = endDate ? dayjs(endDate) : start.add(1, 'year');
  let dates = [];

  switch (frequency) {
    case 'DAILY':
      for (let date = start; date.isSameOrBefore(end); date = date.add(interval, 'day')) {
        dates.push(date.format('YYYY-MM-DD'));
      }
      break;

    case 'WEEKLY':
      // Repeat every `interval` weeks on selectedDays (e.g., Mon, Wed)
      let weekStart = start.startOf('week');
      while (weekStart.isSameOrBefore(end)) {
        selectedDays.forEach(day => {
          const candidate = weekStart.add(day, 'day');
          if (candidate.isSameOrAfter(start) && candidate.isSameOrBefore(end)) {
            dates.push(candidate.format('YYYY-MM-DD'));
          }
        });
        weekStart = weekStart.add(interval, 'week');
      }
      break;

    case 'MONTHLY':
      if (monthlyPattern?.week && monthlyPattern?.day) {
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const weekMap = {
          First: 1,
          Second: 2,
          Third: 3,
          Fourth: 4,
          Last: -1,
        };

        for (let date = start.startOf('month'); date.isSameOrBefore(end); date = date.add(interval, 'month')) {
          const dayIndex = weekdays.indexOf(monthlyPattern.day);
          if (dayIndex === -1) continue;

          const target = getNthWeekdayOfMonth(date, dayIndex, weekMap[monthlyPattern.week]);
          if (target && target.isSameOrAfter(start) && target.isSameOrBefore(end)) {
            dates.push(target.format('YYYY-MM-DD'));
          }
        }
      }
      break;

    case 'YEARLY':
      for (let date = start; date.isSameOrBefore(end); date = date.add(interval, 'year')) {
        dates.push(date.format('YYYY-MM-DD'));
      }
      break;

    default:
      break;
  }

  return dates;
}

/**
 * Get the nth occurrence of a weekday in a given month
 * 
 * @param {dayjs.Dayjs} baseDate - Start of the month
 * @param {number} dayIndex - 0 (Sun) to 6 (Sat)
 * @param {number} nth - 1, 2, 3, 4, or -1 (last)
 * 
 * @returns {dayjs.Dayjs|null}
 */
function getNthWeekdayOfMonth(baseDate, dayIndex, nth) {
  const daysInMonth = baseDate.daysInMonth();
  let occurrences = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const d = baseDate.date(i);
    if (d.day() === dayIndex) {
      occurrences.push(d);
    }
  }

  if (nth === -1) {
    return occurrences[occurrences.length - 1] || null;
  }

  return occurrences[nth - 1] || null;
}
