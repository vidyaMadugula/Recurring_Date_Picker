import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecurringDatePicker from '@/components/RecurringDatePicker/RecurringDatePicker';
import { useRecurrenceStore } from '@/store/recurrenceStore';

jest.mock('@/store/recurrenceStore');

describe('RecurringDatePicker Integration Test', () => {
  beforeEach(() => {
    useRecurrenceStore.mockReturnValue({
      frequency: 'DAILY',
      interval: 1,
      startDate: '2025-07-01',
      endDate: '2025-07-03',
      setFrequency: jest.fn(),
      setInterval: jest.fn(),
      setStartDate: jest.fn(),
      setEndDate: jest.fn(),
      previewDates: ['2025-07-01', '2025-07-02', '2025-07-03'],
      setPreviewDates: jest.fn(),
    });
  });

 it('renders the recurring date picker with preview dates', () => {
  render(<RecurringDatePicker />);
  
  // Match actual heading
  expect(screen.getByText(/Recurring Task Setup/i)).toBeInTheDocument();

  // Match calendar preview heading — adjust based on real text
  expect(screen.getByText(/Your Recurring Dates/i)).toBeInTheDocument();

  // Match one of the previewed dates
  expect(screen.getByText('2025-07-01')).toBeInTheDocument();
});


});
