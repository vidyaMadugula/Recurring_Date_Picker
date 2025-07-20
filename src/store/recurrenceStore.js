

import { create } from 'zustand';

const defaultState = {
  frequency: 'DAILY',
  interval: 1,
  days: [],
  monthlyOption: 'date',
  monthDay: 1,
  monthWeekday: 0,
  monthWeekIndex: 1,
  startDate: '', // ← don't initialize with `new Date()`
  endDate: '',
  previewDates: [],
};

export const useRecurrenceStore = create((set) => ({
  ...defaultState,

  setFrequency: (f) => set({ frequency: f }),
  setInterval: (n) => set({ interval: n }),
  toggleDay: (d) =>
    set((state) => {
      const days = state.days.includes(d)
        ? state.days.filter((x) => x !== d)
        : [...state.days, d];
      return { days };
    }),
  setSelectedDays: (days) => set({ days }),
  setMonthlyOption: (opt) => set({ monthlyOption: opt }),
  setMonthDay: (d) => set({ monthDay: d }),
  setMonthWeekday: (w) => set({ monthWeekday: w }),
  setMonthWeekIndex: (i) => set({ monthWeekIndex: i }),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setPreviewDates: (dates) => set({ previewDates: dates }),
}));
