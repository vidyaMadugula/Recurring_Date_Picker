


'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { format, addDays } from 'date-fns';
import RecurrenceOptions from './RecurrenceOptions';
import CalendarPreview from './CalendarPreview';
import { useRecurrenceStore } from '../../store/recurrenceStore';

const RecurringDatePicker = () => {
  const [formattedDates, setFormattedDates] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);

  const {
    setFrequency,
    setInterval,
    setStartDate,
    setEndDate,
    setSelectedDays,
    setMonthlyOption,
    setMonthDay,
    setMonthWeekday,
    setMonthWeekIndex,
    setPreviewDates,
    previewDates,
    frequency,
    startDate,
    endDate,
    days,
    monthlyOption,
    monthDay,
    monthWeekIndex,
    monthWeekday,
    interval,
  } = useRecurrenceStore();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleReset = () => {
    setFrequency('DAILY');
    setInterval(1);
    setStartDate('');
    setEndDate('');
    setSelectedDays([]);
    setMonthlyOption('date');
    setMonthDay(1);
    setMonthWeekday(0);
    setMonthWeekIndex(1);
    setPreviewDates([]);
  };

  useEffect(() => {
    if (!startDate || !frequency) return;

    const sDate = new Date(startDate);
    const eDate = endDate ? new Date(endDate) : addDays(sDate, 365);

    const dates = [];
    let current = new Date(sDate);

    while (current <= eDate && dates.length < 200) {
      const match = (() => {
        const dayDiff = Math.floor((current - sDate) / (1000 * 60 * 60 * 24));

        switch (frequency) {
          case 'DAILY':
            return dayDiff % interval === 0;

          case 'WEEKLY':
            const weekDiff = Math.floor(dayDiff / 7);
            return days.includes(current.getDay()) && weekDiff % interval === 0;

          case 'MONTHLY': {
            const monthDiff =
              (current.getFullYear() - sDate.getFullYear()) * 12 +
              (current.getMonth() - sDate.getMonth());

            if (monthDiff % interval !== 0) return false;

            if (monthlyOption === 'date') {
              return current.getDate() === monthDay;
            } else {
              const weekday = current.getDay();
              const weekOfMonth = Math.ceil(current.getDate() / 7);
              return weekday === monthWeekday && weekOfMonth === monthWeekIndex;
            }
          }

          case 'YEARLY':
            const yearDiff = current.getFullYear() - sDate.getFullYear();
            return (
              yearDiff % interval === 0 &&
              current.getDate() === sDate.getDate() &&
              current.getMonth() === sDate.getMonth()
            );

          default:
            return false;
        }
      })();

      if (match) {
        dates.push(format(current, 'yyyy-MM-dd'));
      }

      current.setDate(current.getDate() + 1);
    }

    setPreviewDates(dates);
  }, [
    startDate,
    endDate,
    frequency,
    interval,
    days,
    monthlyOption,
    monthDay,
    monthWeekIndex,
    monthWeekday,
  ]);

  useEffect(() => {
    if (!hasMounted) return;
    const formatted = previewDates.map((date) =>
      new Date(date).toLocaleDateString('en-CA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
    setFormattedDates(formatted);
  }, [previewDates, hasMounted]);

  const generateGoogleCalendarLink = () => {
    const start = startDate?.replace(/-/g, '');
    const end = endDate?.replace(/-/g, '');
    const description = encodeURIComponent(
      'Recurring Dates:\n' + previewDates.join('\n')
    );

    const title = encodeURIComponent('My Recurring Task');
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${description}&dates=${start}/${end}`;
  };

  return (
    <>
      <Link
        href="/"
        className="text-green-600 hover:underline text-sm mb-4 inline-block"
      >
        ← Back to Home
      </Link>

      <div className="max-w-7xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6 min-h-[400px]">
          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Recurring Task Setup
              </h2>
              <button
                onClick={handleReset}
                className="flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md hover:bg-gray-100 transition"
              >
                🔄 Reset
              </button>
            </div>
            <RecurrenceOptions />
          </div>

          <div className="flex-1 h-full">
            <CalendarPreview />
          </div>
        </div>

        <div className="pt-4 border-t mt-6 space-y-6">
          {!startDate ? (
            <div className="text-center text-gray-500 text-sm italic py-4">
              No dates generated yet. Please select a start date to begin.
            </div>
          ) : (
            <>
              <div className="pl-[10px]  py-2">
                <h4 className="text-md font-semibold text-gray-800 mb-1">
                  📅 Your Date Range
                </h4>
                <div className="text-sm text-gray-700 space-y-1 bg-blue-200 rounded-3xl pl-[24px] h-24 pt-[10px] ">
                  <p>
                    <strong>Start Date:</strong> {startDate || 'N/A'}
                  </p>
                  <p>
                    <strong>End Date:</strong> {endDate || 'N/A'}
                  </p>
                  <p>
                    <strong>Recurrence Pattern:</strong> {frequency}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl pl-[14px]">
                <h4 className="text-md font-semibold text-gray-800 mb-2 mt-6">
                  🗓️ Generated Recurring Dates
                </h4>
                {!hasMounted ? (
                  <p className="text-gray-400">Loading...</p>
                ) : formattedDates.length === 0 ? (
                  <p className="text-gray-500">
                    No recurring dates. Please check your selections.
                  </p>
                ) : (
                  <div className="max-h-[200px] overflow-y-auto border border-gray-300 rounded-xl p-3">
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
                      {formattedDates.map((date, idx) => (
                        <li
                          key={idx}
                          className="bg-blue-200 px-3 py-1 rounded-xl text-blue-900 text-center"
                        >
                          {date}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* ADD TO GOOGLE CALENDAR SECTION */}
              <div className="mt-6 pl-[10px]">
                <h4 className="text-md font-semibold text-gray-800 mb-2">
                  📌 Add to Google Calendar
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Click the button below to open Google Calendar with all your recurring dates listed in the event description.
                </p>
                <a
  href={generateGoogleCalendarLink()}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex justify-center items-center px-4 py-2 bg-blue-400 text-white rounded-md shadow transition w-full text-center"
>
  📆 Add to Google Calendar
</a>

              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RecurringDatePicker;
