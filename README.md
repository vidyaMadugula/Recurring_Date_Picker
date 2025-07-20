# 📅 Recurring Date Picker Component

This is a **reusable recurring date picker** built using **Next.js**, **Tailwind CSS**, and **Zustand**.It allows users to create flexible recurring date schedules with ease.

---

## 🚀 Features

✅ Supports recurring rules:
- **Daily**, **Weekly**, **Monthly**, **Yearly**

✅ Custom recurrence patterns:
- Every X days/weeks/months/years
- Specific weekdays (e.g., Mon, Wed)
- Monthly patterns like "Second Tuesday"

✅ Smart UI:
- Date range picker (start & optional end)
- Scrollable **calendar preview**
- Shows all generated recurring dates
- "📆 Add to Google Calendar" integration

✅ User Experience:
- Intuitive and responsive layout
- Built for reusability and extendability

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) `15.4.2`
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Date Utilities**: [dayjs](https://day.js.org/)
- **Testing**: Jest & React Testing Library (optional setup)

---

## 🚀 Installation & Run Instructions

### 📦 1. Clone the Repository

```bash
git clone https://github.com/vidyaMadugula/Recurring_Date_Picker.git
cd recurring-date-picker

📦 2. Install Dependencies
npm install

🧪 3. Start Development Server
npm run dev
```

---

### 🌐 Running in Cloud IDEs (StackBlitz / Gitpod / CodeSandbox)

When using a cloud-based IDE:

✅ **Select port `3000`** for preview.

> ⚠️ Do **not** select port `2222` — it's for internal VM access and will show a 502 Bad Gateway error.

If you encounter **502 Bad Gateway** or blank screens:
- Make sure `npm run dev` is running
- Wait for the server to fully start
- Refresh the browser preview
- Restart the dev server if the IDE is running low on memory
