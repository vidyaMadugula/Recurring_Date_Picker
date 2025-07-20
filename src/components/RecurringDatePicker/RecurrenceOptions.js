

'use client';

import React from 'react';
import { useRecurrenceStore } from '../../store/recurrenceStore';
import { Clock, CalendarDays, CalendarCheck, CalendarPlus } from 'lucide-react'; // using lucide icons
import DaySelector from './DaySelector';
import MonthlyPatternPicker from './MonthlyPatternPicker';
import DateRangePicker from './DateRangePicker';

const RecurrenceOptions = () => {
  const {
    frequency,
    interval,
    setFrequency,
    setInterval,
  } = useRecurrenceStore();

  const frequencyOptions = [
    { value: 'DAILY', label: 'Daily', icon: <Clock size={16} color="#3B82F6"/> },
    { value: 'WEEKLY', label: 'Weekly', icon: <CalendarDays size={16} color="#10B981"/> },
    { value: 'MONTHLY', label: 'Monthly', icon: <CalendarCheck size={16} color="#F59E0B"/> },
    { value: 'YEARLY', label: 'Yearly', icon: <CalendarPlus size={16} color="#EF4444"/> },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md space-y-6">
      {/* Recurrence Type Toggle Buttons */}
      <div>
        <p className="block text-sm font-medium text-gray-700 mb-2">Recurrence Type</p>
        <div className="grid grid-cols-2 gap-3 max-w-md">
          {frequencyOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setFrequency(option.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition
                ${frequency === option.value
                  ? 'bg-blue-500 text-white border-blue-900'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}`}
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interval */}
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">Every</label>
        <input
          type="number"
          min="1"
          value={interval}
          onChange={e => setInterval(parseInt(e.target.value) || 1)}
          className="w-20 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-gray-600">
          {frequency === 'DAILY'
            ? 'day(s)'
            : frequency === 'WEEKLY'
            ? 'week(s)'
            : frequency === 'MONTHLY'
            ? 'month(s)'
            : 'year(s)'}
        </span>
      </div>

      {/* Conditional Options */}
      {frequency === 'WEEKLY' && <DaySelector />}
      {frequency === 'MONTHLY' && <MonthlyPatternPicker />}
       <DateRangePicker />
    </div>
  );
};

export default RecurrenceOptions;
