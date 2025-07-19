// DateRangePicker.js
import React from 'react';
import { useRecurrenceStore } from '../../store/recurrenceStore';


const DateRangePicker = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useRecurrenceStore();

  return (
    <div className="mt-4 space-y-2">
      <div>
        <label className="block font-medium">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="mt-1 p-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">End Date (optional):</label>
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="mt-1 p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
