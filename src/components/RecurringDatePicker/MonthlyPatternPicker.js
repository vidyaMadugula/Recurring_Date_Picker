// MonthlyPatternPicker.js
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
    <div className="mt-4 p-2 border rounded-lg">
      <div className="font-medium">Monthly Options:</div>
      {/* Option 1: specific day of month */}
      <label className="flex items-center mt-2">
        <input
          type="radio" name="monthlyOpt" value="date"
          checked={monthlyOption === 'date'}
          onChange={() => setMonthlyOption('date')}
          className="mr-2"
        />
        Day 
        <input
          type="number" min="1" max="31"
          value={monthDay}
          onChange={e => setMonthDay(parseInt(e.target.value) || 1)}
          className="ml-1 w-16 p-1 border rounded"
        />
        of the month
      </label>
      {/* Option 2: ordinal weekday */}
      <label className="flex items-center mt-2">
        <input
          type="radio" name="monthlyOpt" value="weekday"
          checked={monthlyOption === 'weekday'}
          onChange={() => setMonthlyOption('weekday')}
          className="mr-2"
        />
        The
        <select
          value={monthWeekIndex}
          onChange={e => setMonthWeekIndex(parseInt(e.target.value))}
          className="mx-1 p-1 border rounded"
        >
          {[1,2,3,4,5].map(n => (
            <option key={n} value={n}>{n}{n===1?'st':n===2?'nd':n===3?'rd':'th'}</option>
          ))}
        </select>
        <select
          value={monthWeekday}
          onChange={e => setMonthWeekday(parseInt(e.target.value))}
          className="mx-1 p-1 border rounded"
        >
          {['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].map((wd, i) => (
            <option key={i} value={i}>{wd}</option>
          ))}
        </select>
        of the month
      </label>
    </div>
  );
};

export default MonthlyPatternPicker;
