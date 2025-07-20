
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-12 px-4">
      <Head>
        <title>Recurring Date Picker</title>
      </Head>

      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 bg-green-100 rounded-full mb-2">
          <svg
            className="h-5 w-5 text-green-500 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-700 font-medium text-sm h-4">No Cost, No Hassle</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold sm:text-5xl leading-tight mt-2">
          Create perfect recurring schedules in seconds.
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-gray-600">
          Recurring Date Picker – configure daily, weekly, monthly, or yearly patterns with advanced customization options.
        </p>

        {/* CTA */}
        <Link href="/recurring">
          <button className="mt-8 inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md  transition">
            📅 Start Creating Dates
          </button>
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="mt-16 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* Feature 1 */}
        <div className="bg-white shadow-md rounded-lg p-6 border border-green-500 hover:shadow-lg transition">
          <div className="text-blue-600 mb-3 text-2xl">📅</div>
          <h3 className="text-lg font-semibold mb-2">Smart Recurring Patterns</h3>
          <p className="text-gray-600 text-sm">
            Daily, weekly, monthly, or yearly – create any pattern you need quickly and easily.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white shadow-md rounded-lg p-6 border border-green-500 hover:shadow-lg transition">
          <div className="text-blue-600 mb-3 text-2xl">🔁</div>
          <h3 className="text-lg font-semibold mb-2">Instant Calendar Sync</h3>
          <p className="text-gray-600 text-sm">
            One-click sync with Google Calendar – no complex setup required.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white shadow-md rounded-lg p-6 border border-green-500 hover:shadow-lg transition">
          <div className="text-blue-600 mb-3 text-2xl">⚙️</div>
          <h3 className="text-lg font-semibold mb-2">Flexible Customization</h3>
          <p className="text-gray-600 text-sm">
            Custom intervals, specific days, and advanced rules tailored to your needs.
          </p>
        </div>
      </div>
    </div>
  );
}
