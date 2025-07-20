

// src/components/DaySelector.js
import React from 'react';
import { useRecurrenceStore } from '../../store/recurrenceStore';

const DaySelector = () => {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const selected = useRecurrenceStore(state => state.days);
  const toggleDay = useRecurrenceStore(state => state.toggleDay);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">On:</label>
      <div className="flex flex-wrap gap-2 mt-2">
        {days.map((day, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => toggleDay(idx)}
            className={`px-3 py-1 rounded-full border text-sm font-medium transition ${selected.includes(idx) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaySelector;