'use client';

import React from 'react';
import { useRecurrenceStore } from '../../store/recurrenceStore';

import DaySelector from './DaySelector';
import MonthlyPatternPicker from './MonthlyPatternPicker';

const RecurrenceOptions = () => {
  const {
    frequency, interval,
    setFrequency, setInterval,
  } = useRecurrenceStore();

  return (
    <div className="p-4 border rounded-lg space-y-4">
      {/* Frequency selection */}
      <div>
        <label className="block font-medium">Repeat:</label>
        <select
          value={frequency}
          onChange={e => setFrequency(e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
        >
          {['DAILY','WEEKLY','MONTHLY','YEARLY'].map(freq => (
            <option key={freq} value={freq}>
              {freq.charAt(0) + freq.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Interval input */}
      <div>
        <label className="block font-medium">Every</label>
        <input
          type="number"
          min="1"
          value={interval}
          onChange={e => setInterval(parseInt(e.target.value) || 1)}
          className="mt-1 w-20 p-2 border rounded"
        />
        <span className="ml-2">
          {frequency === 'DAILY'
            ? 'day(s)'
            : frequency === 'WEEKLY'
            ? 'week(s)'
            : frequency === 'MONTHLY'
            ? 'month(s)'
            : 'year(s)'}
        </span>
      </div>

      {/* Conditional sub-options */}
      {frequency === 'WEEKLY' && <DaySelector />}
      {frequency === 'MONTHLY' && <MonthlyPatternPicker />}
    </div>
  );
};

export default RecurrenceOptions;
