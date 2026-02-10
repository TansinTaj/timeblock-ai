# TimeBlock AI - Never Be Late Again 🚀

An AI-powered reverse time planning app that helps you figure out when to wake up based on your schedule.

## What It Does

Instead of guessing when to wake up, TimeBlock AI:
1. Takes your event time (e.g., "Class at 10:00 AM")
2. Works **backward** through all your tasks
3. Tells you exactly when to wake up

Perfect for people who are always running late!

## Current Features (v1.0 - Basic Prototype)

✅ Reverse time calculation
✅ Custom task management
✅ Visual timeline display
✅ Clean, modern UI
✅ Mobile responsive

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher) - Download from https://nodejs.org/

### Installation

1. **Download all the files** from this folder

2. **Create project structure:**
```
timeblock-ai/
├── src/
│   ├── App.jsx
│   ├── TimeBlocker.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

3. **Move files to correct locations:**
   - Put `App.jsx`, `TimeBlocker.jsx`, `main.jsx`, and `index.css` in the `src/` folder
   - Keep all other files in the root directory

4. **Open terminal in the project folder** and run:
```bash
npm install
```

5. **Start the development server:**
```bash
npm run dev
```

6. **Open your browser** and go to: `http://localhost:5173`

## How to Use

1. Enter your event details (name, time, location)
2. Add tasks you need to do before (shower, breakfast, etc.)
3. Set duration for each task
4. Click "⚡ Generate My Schedule"
5. See your wake-up time and complete timeline!

## Next Steps - Adding AI Features

### Phase 2: Natural Language Input (Day 2)
- Add OpenAI API integration
- Allow typing: "I have class at 10am at university"
- AI extracts event details automatically

### Phase 3: Context Awareness (Day 3)
- Weather API integration (rainy = more commute time)
- Traffic API (Google Maps)
- Smart time adjustments

### Phase 4: Learning Features (Day 4)
- Track if you were on time
- Adjust suggestions based on patterns
- Personalized time estimates

## For the TikTok OA Demo

### What to Show (5 minutes):
1. **Problem (30s):** "I'm always late because I'm bad at planning backwards"
2. **Solution (30s):** "I built TimeBlock AI to solve this"
3. **Demo (2min):** Show the app working with your real schedule
4. **AI Plans (1.5min):** Walk through the AI features you'll add
5. **Impact (30s):** "This could help millions of people be on time"

### Demo Script Example:
```
"Hi! I'm Tansin, and I'm always running late to class. The problem? 
I'm terrible at working backward from my event time.

So I built TimeBlock AI. Let me show you how it works...

[Show interface]
I have class at 10am at university. I need to shower, make breakfast, 
and review my notes.

[Add tasks]
[Click generate]

Look at that - it tells me I need to wake up at 7:00 AM to make 
everything fit!

Now, the exciting part - I'm adding AI features:
1. Natural language: Just type 'class at 10am' and it understands
2. Weather-aware: Checks if it's raining and adds buffer time
3. Learning: Tracks if I'm actually on time and adjusts

This could help students, working professionals, parents - anyone 
who struggles with time management.

Thanks for watching!"
```

## Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Future AI:** OpenAI API, Weather API, Google Maps API

## Project Structure

```
src/
├── App.jsx              # Main app wrapper
├── TimeBlocker.jsx      # Main component with all logic
├── main.jsx            # React entry point
└── index.css           # Tailwind imports
```

## Troubleshooting

**"npm install" fails:**
- Make sure Node.js is installed: `node --version`
- Delete `node_modules` and `package-lock.json`, try again

**Styles not working:**
- Check that `index.css` is in `src/` folder
- Check that Tailwind config is in root

**App won't start:**
- Make sure all files are in correct folders
- Check terminal for error messages
- Try: `npm install` then `npm run dev`

## Building for Production

When ready to deploy:
```bash
npm run build
```

This creates a `dist/` folder you can host anywhere!

## Questions?

This is a work in progress! The basic calculator works, and AI features are planned for Days 2-4.

---

Built by Tansin Taj for TikTok PM Internship Application 2026
