// recurrenceStore.js
import { create } from 'zustand';


export const useRecurrenceStore = create(set => ({
  // Recurrence state
  frequency: 'DAILY',    // 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
  interval: 1,           // Repeat every X units
  // Weekly-specific
  days: [],              // Selected weekdays (0=Sun..6=Sat)
  // Monthly-specific pattern
  monthlyOption: 'date', // 'date' or 'weekday'
  monthDay: 1,           // Day of month (1-31) when monthlyOption='date'
  monthWeekday: 0,       // Weekday index (0-6) when monthlyOption='weekday'
  monthWeekIndex: 1,     // Ordinal (1=first, 2=second, ..., 5=last) when monthlyOption='weekday'
  // Date range
  startDate: new Date().toISOString().split('T')[0], // e.g. '2023-09-05'
  endDate: '',           // Optional end date (empty means no end)
  // Updater functions
  setFrequency: (f) => set({ frequency: f }),
  setInterval: (n) => set({ interval: n }),
  toggleDay: (d) => set(state => {
    const days = state.days.includes(d) ? state.days.filter(x => x !== d) : [...state.days, d];
    return { days };
  }),
  setMonthlyOption: (opt) => set({ monthlyOption: opt }),
  setMonthDay: (d) => set({ monthDay: d }),
  setMonthWeekday: (w) => set({ monthWeekday: w }),
  setMonthWeekIndex: (i) => set({ monthWeekIndex: i }),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
}));
