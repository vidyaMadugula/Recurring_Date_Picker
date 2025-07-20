

// src/components/MonthlyPatternPicker.js
import React from 'react';
import { useRecurrenceStore } from '../../store/recurrenceStore';

const MonthlyPatternPicker = () => {
  const {
    monthlyOption, setMonthlyOption,
    monthDay, setMonthDay,
    monthWeekday, setMonthWeekday,
    monthWeekIndex, setMonthWeekIndex
  } = useRecurrenceStore();

  return (
    <div className="p-4 bg-gray-50 rounded-lg space-y-3">
      <div className="font-medium text-gray-800">Monthly Options:</div>

      <label className="flex items-center space-x-2">
        <input
          type="radio" name="monthlyOpt" value="date"
          checked={monthlyOption === 'date'}
          onChange={() => setMonthlyOption('date')}
          className="accent-blue-500"
        />
        <span>Day</span>
        <input
          type="number" min="1" max="31"
          value={monthDay}
          onChange={e => setMonthDay(parseInt(e.target.value) || 1)}
          className="w-16 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span>of the month</span>
      </label>

      <label className="flex items-center space-x-2">
        <input
          type="radio" name="monthlyOpt" value="weekday"
          checked={monthlyOption === 'weekday'}
          onChange={() => setMonthlyOption('weekday')}
          className="accent-blue-500"
        />
        <span>The</span>
        <select
          value={monthWeekIndex}
          onChange={e => setMonthWeekIndex(parseInt(e.target.value))}
          className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[1,2,3,4,5].map(n => (
            <option key={n} value={n}>{n}{n===1?'st':n===2?'nd':n===3?'rd':'th'}</option>
          ))}
        </select>
        <select
          value={monthWeekday}
          onChange={e => setMonthWeekday(parseInt(e.target.value))}
          className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].map((wd, i) => (
            <option key={i} value={i}>{wd}</option>
          ))}
        </select>
        <span>of the month</span>
      </label>
    </div>
  );
};

export default MonthlyPatternPicker;
