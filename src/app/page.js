// src/app/page.js
'use client';

import Head from 'next/head';
import RecurringDatePicker from '../components/RecurringDatePicker/RecurringDatePicker';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Recurring Date Picker Demo</title>
      </Head>
      <main className="min-h-screen p-8 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Recurring Date Picker Demo</h1>
        <RecurringDatePicker />
      </main>
    </div>
  );
}
