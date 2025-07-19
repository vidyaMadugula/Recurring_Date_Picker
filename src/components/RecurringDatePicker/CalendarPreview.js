// CalendarPreview.js
import React from 'react';
import { useRecurrenceStore } from '../../store/recurrenceStore';

const CalendarPreview = () => {
  const {
    frequency, interval, days,
    monthlyOption, monthDay, monthWeekday, monthWeekIndex,
    startDate, endDate
  } = useRecurrenceStore();

  const start = new Date(startDate);
  const year = start.getFullYear(), month = start.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Helper: check if a given date matches the recurrence rules
  const isRecurring = (date) => {
    if (date < start) return false;
    if (endDate && date > new Date(endDate)) return false;
    const diffDays = Math.floor((date - start) / (1000*60*60*24));
    if (frequency === 'DAILY') {
      return diffDays % interval === 0;
    }
    if (frequency === 'WEEKLY') {
      const dayIndex = date.getDay();
      const diffWeeks = Math.floor(diffDays / 7);
      return days.includes(dayIndex) && (diffWeeks % interval === 0);
    }
    if (frequency === 'MONTHLY') {
      const monthDiff = (date.getFullYear() - year) * 12 + (date.getMonth() - month);
      if (monthlyOption === 'date') {
        return date.getDate() === monthDay && (monthDiff % interval === 0);
      } else {
        // Check ordinal weekday (e.g. 2nd Tuesday)
        if (date.getDay() !== monthWeekday) return false;
        const ordinal = Math.ceil(date.getDate() / 7);
        return ordinal === monthWeekIndex && (monthDiff % interval === 0);
      }
    }
    if (frequency === 'YEARLY') {
      // Simple: same month/day each year
      const yearDiff = date.getFullYear() - year;
      return date.getMonth() === month && date.getDate() === start.getDate() && (yearDiff % interval === 0);
    }
    return false;
  };

  // Build a grid of days for the current month
  const grid = [];
  const offset = firstDayOfMonth.getDay(); // Sunday=0
  // Leading empty cells
  for (let i = 0; i < offset; i++) grid.push(null);
  for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
    grid.push(new Date(year, month, d));
  }
  // Chunk into weeks (rows of 7)
  const weeks = [];
  for (let i = 0; i < grid.length; i += 7) {
    weeks.push(grid.slice(i, i + 7));
  }

  return (
    <div className="mt-4">
      <div className="font-medium mb-2">Calendar Preview ({start.toLocaleString('default', { month: 'long', year: 'numeric' })})</div>
      <div className="grid grid-cols-7 text-center text-sm">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} className="font-semibold">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((date, idx) => (
          <div
            key={idx}
            className={`h-8 flex items-center justify-center 
              ${date ? (isRecurring(date) ? 'bg-blue-300 text-blue-900 rounded' : '') : ''}`}
          >
            {date ? date.getDate() : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPreview;
