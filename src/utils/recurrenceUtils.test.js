import { generateRecurringDates } from './recurrenceUtils';

describe('generateRecurringDates', () => {
  const commonProps = {
    startDate: '2025-07-01',
    endDate: '2025-07-15',
    interval: 1,
  };

  it('generates daily recurrence correctly', () => {
    const result = generateRecurringDates({
      ...commonProps,
      frequency: 'DAILY',
    });
    expect(result.length).toBe(15);
    expect(result[0]).toBe('2025-07-01');
    expect(result[14]).toBe('2025-07-15');
  });

  it('generates weekly recurrence correctly on Monday and Wednesday', () => {
    const result = generateRecurringDates({
      ...commonProps,
      frequency: 'WEEKLY',
      selectedDays: [1, 3], // Monday, Wednesday
    });
    expect(result).toEqual(['2025-07-02', '2025-07-07', '2025-07-09', '2025-07-14']);
  });

  it('generates monthly recurrence for second Tuesday', () => {
    const result = generateRecurringDates({
      frequency: 'MONTHLY',
      interval: 1,
      startDate: '2025-07-01',
      endDate: '2025-10-01',
      monthlyPattern: {
        week: 'Second',
        day: 'Tuesday',
      },
    });
    expect(result).toEqual(['2025-07-08', '2025-08-12', '2025-09-09']);
  });

  it('generates yearly recurrence correctly', () => {
    const result = generateRecurringDates({
      frequency: 'YEARLY',
      interval: 1,
      startDate: '2022-01-01',
      endDate: '2025-01-01',
    });
    expect(result).toEqual(['2022-01-01', '2023-01-01', '2024-01-01', '2025-01-01']);
  });

  it('returns empty array if no startDate', () => {
    const result = generateRecurringDates({
      frequency: 'DAILY',
      startDate: '',
      endDate: '2025-01-01',
    });
    expect(result).toEqual([]);
  });
});
