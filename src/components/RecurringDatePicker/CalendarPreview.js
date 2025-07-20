
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useRecurrenceStore } from '../../store/recurrenceStore';

const CalendarPreview = () => {
  const {
    frequency, interval, days,
    monthlyOption, monthDay, monthWeekday, monthWeekIndex,
    startDate, endDate,
  } = useRecurrenceStore();

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [upcomingDates, setUpcomingDates] = useState([]);

  useEffect(() => {
    if (startDate) {
      const dates = generateUpcomingDates();
      setUpcomingDates(dates.slice(0, 5));
    } else {
      setUpcomingDates([]);
    }
  }, [startDate, endDate, frequency, interval, days, monthlyOption, monthDay, monthWeekday, monthWeekIndex]);

  const handlePrevMonth = () => {
  if (currentMonth === 0) {
    setCurrentMonth(11);
    setCurrentYear(currentYear - 1);
  } else {
    setCurrentMonth(currentMonth - 1);
  }
};

const handleNextMonth = () => {
  if (currentMonth === 11) {
    setCurrentMonth(0);
    setCurrentYear(currentYear + 1);
  } else {
    setCurrentMonth(currentMonth + 1);
  }
};


  const isRecurring = (date) => {
    if (!startDate) return false;

    const s = new Date(startDate);
    if (date < s) return false;
    if (endDate && date > new Date(endDate)) return false;

    const diffDays = Math.floor((date - s) / (1000 * 60 * 60 * 24));

    if (frequency === 'DAILY') {
      return diffDays % interval === 0;
    }

    if (frequency === 'WEEKLY') {
      const diffWeeks = Math.floor(diffDays / 7);
      return days.includes(date.getDay()) && diffWeeks % interval === 0;
    }

    if (frequency === 'MONTHLY') {
      const monthDiff = (date.getFullYear() - s.getFullYear()) * 12 + (date.getMonth() - s.getMonth());
      if (monthlyOption === 'date') {
        return date.getDate() === monthDay && monthDiff % interval === 0;
      } else {
        if (date.getDay() !== monthWeekday) return false;
        const ordinal = Math.ceil(date.getDate() / 7);
        return ordinal === monthWeekIndex && monthDiff % interval === 0;
      }
    }

    if (frequency === 'YEARLY') {
      const yearDiff = date.getFullYear() - s.getFullYear();
      return date.getDate() === s.getDate() && date.getMonth() === s.getMonth() && yearDiff % interval === 0;
    }

    return false;
  };

  const generateUpcomingDates = () => {
    const results = [];
    const s = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(s.getFullYear() + 1, 11, 31);
    let current = new Date(s);

    while (current <= end && results.length < 50) {
      if (isRecurring(current)) {
        results.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }

    return results;
  };

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const grid = [];

  const offset = firstDayOfMonth.getDay();
  for (let i = 0; i < offset; i++) grid.push(null);
  for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
    grid.push(new Date(currentYear, currentMonth, d));
  }

  const weeks = [];
  for (let i = 0; i < grid.length; i += 7) {
    weeks.push(grid.slice(i, i + 7));
  }

  return (
    <div className="mt-6 p-4 border rounded-xl bg-white shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          onClick={handlePrevMonth}
        >
          ←
        </button>
        <h2 className="text-lg font-semibold text-gray-800">
          {format(new Date(currentYear, currentMonth), 'MMMM yyyy')}
        </h2>
        <button
          className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          onClick={handleNextMonth}
        >
          →
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-gray-500">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mt-2 text-center text-sm">
        {weeks.flat().map((date, idx) => (
          <div key={idx} className="h-10 flex items-center justify-center">
            {date ? (
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full 
                  ${isRecurring(date)
                    ? 'bg-blue-500 text-white font-semibold shadow'
                    : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {date.getDate()}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* Upcoming Dates */}
      <div className="mt-5 text-sm text-gray-700">
        <p className="font-semibold mb-1">Upcoming Dates:</p>
        {startDate ? (
          upcomingDates.length === 0 ? (
            <p className="text-gray-500 italic">No recurring dates generated yet</p>
          ) : (
            <ul className="list-disc list-inside space-y-1">
              {upcomingDates.map((date, i) => (
                <li key={i}>{format(date, 'EEEE, MMM d, yyyy')}</li>
              ))}
            </ul>
          )
        ) : (
          <p className="text-gray-500 italic">No recurring dates generated yet</p>
        )}
      </div>
    </div>
  );
};

export default CalendarPreview;

