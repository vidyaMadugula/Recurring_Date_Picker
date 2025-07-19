// DaySelector.js
import React from 'react';
import { useRecurrenceStore } from '../../store/recurrenceStore';


const DaySelector = () => {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const selected = useRecurrenceStore(state => state.days);
  const toggleDay = useRecurrenceStore(state => state.toggleDay);

  return (
    <div>
      <label className="block font-medium">On:</label>
      <div className="flex flex-wrap mt-2 space-x-2">
        {days.map((day, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => toggleDay(idx)}
            className={`px-2 py-1 border rounded ${selected.includes(idx) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaySelector;
