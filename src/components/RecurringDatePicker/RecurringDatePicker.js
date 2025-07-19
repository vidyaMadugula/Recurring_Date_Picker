// src/components/RecurringDatePicker/RecurringDatePicker.js
// RecurringDatePicker.js
import React from 'react';
import RecurrenceOptions from './RecurrenceOptions';
import DateRangePicker from './DateRangePicker';
import CalendarPreview from './CalendarPreview';

const RecurringDatePicker = () => {
  return (
    <div className="max-w-md mx-auto p-4 space-y-6 bg-gray-50 border rounded">
      <RecurrenceOptions />
      <DateRangePicker />
      <CalendarPreview />
      {/* In a full app, you might output or use the recurrence data here */}
    </div>
  );
};

export default RecurringDatePicker;
