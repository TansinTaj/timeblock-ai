# 🚀 Getting Started - Local Setup

## Quick Start (Easiest Way)

### Mac/Linux Users:
1. Open Terminal
2. Navigate to the project folder:
   ```bash
   cd /path/to/timeblock-ai
   ```
3. Run the start script:
   ```bash
   ./start.sh
   ```

### Windows Users:
1. Navigate to the project folder in File Explorer
2. Double-click `start.bat`
3. That's it!

The script will:
- ✅ Check if Node.js is installed
- ✅ Install all dependencies automatically
- ✅ Start the development server
- ✅ Open your app at http://localhost:5173

---

## Manual Setup (If scripts don't work)

### Step 1: Install Node.js
If you don't have Node.js:
1. Go to https://nodejs.org/
2. Download and install the LTS version (recommended)
3. Verify installation:
   ```bash
   node --version
   # Should show v18.x.x or higher
   ```

### Step 2: Install Dependencies
Open terminal in the project folder and run:
```bash
npm install
```

This will download all required packages (React, Vite, Tailwind, etc.)

### Step 3: Start Development Server
```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 234 ms

➜  Local:   http://localhost:5173/
```

### Step 4: Open in Browser
Open your browser and go to:
```
http://localhost:5173
```

You should see the TimeBlock AI app! 🎉

---

## Testing the Basic App

1. **Enter Event Details:**
   - Event name: "Class"
   - Time: 10:00 AM
   - Location: "University"

2. **Add Some Tasks:**
   - Click "+ Add Task"
   - Add tasks like:
     - "Shower" - 20 min
     - "Breakfast" - 15 min
     - "Commute" - 30 min

3. **Generate Schedule:**
   - Click "⚡ Generate My Schedule"
   - Should show your wake-up time!
   - Should show timeline with all tasks

---

## Next Steps - Adding AI Features

Once the basic app works, you're ready for Day 2!

### Day 2: Set Up AI Features

1. **Get OpenAI API Key:**
   - Go to https://platform.openai.com/api-keys
   - Create an account (free tier available)
   - Generate new API key
   - Copy it

2. **Create .env File:**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` in a text editor
   - Replace `your_api_key_here` with your actual OpenAI API key
   - Save the file

3. **Switch to AI Version:**
   - Open `src/App.jsx`
   - Change the import:
     ```jsx
     // Change from:
     import TimeBlocker from './TimeBlocker';
     
     // To:
     import TimeBlocker from './TimeBlockerAI';
     ```
   - Save the file

4. **Restart Server:**
   - Press Ctrl+C in terminal
   - Run `npm run dev` again

5. **Test AI Features:**
   - Try typing: "I have class at 10am at university"
   - Click "Auto-fill"
   - AI should extract details and suggest tasks!

---

## Troubleshooting

### "npm command not found"
→ Node.js not installed. Install from https://nodejs.org/

### "Port 5173 is already in use"
→ Another app is using that port. Close it or:
```bash
# Kill the process
lsof -ti:5173 | xargs kill -9  # Mac/Linux
# Or change port in vite.config.js
```

### "Module not found" errors
→ Dependencies not installed:
```bash
rm -rf node_modules
npm install
```

### API not working
→ Check these:
1. Is `.env` file in the root directory?
2. Did you add `VITE_` prefix to variable names?
3. Did you restart the dev server after adding .env?
4. Is your API key valid?

### Styles not showing
→ Check:
1. Is `index.css` in the `src/` folder?
2. Does it have the Tailwind directives?
3. Try clearing browser cache (Ctrl+Shift+R)

---

## Project Structure

```
timeblock-ai/
├── src/
│   ├── App.jsx              # Main app wrapper
│   ├── TimeBlocker.jsx      # Basic version (no AI)
│   ├── TimeBlockerAI.jsx    # AI-enhanced version
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind styles
├── index.html               # HTML template
├── package.json             # Dependencies
├── .env                     # API keys (YOU CREATE THIS)
├── .env.example             # Template for .env
├── start.sh                 # Mac/Linux startup script
├── start.bat                # Windows startup script
├── COMPLETE_GUIDE.md        # Full 5-day development plan
└── README.md                # This file
```

---

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Need Help?

1. Check `COMPLETE_GUIDE.md` for detailed instructions
2. Review error messages in the terminal
3. Check browser console (F12) for errors
4. Make sure all files are in correct folders

---

## What's Next?

- ✅ Day 1: Get basic app running (YOU ARE HERE)
- 🔜 Day 2: Add AI natural language input
- 🔜 Day 3: Add weather & traffic awareness
- 🔜 Day 4: Add learning & personalization
- 🔜 Day 5: Record demo & submit

See `COMPLETE_GUIDE.md` for detailed day-by-day instructions!

---

Built with ❤️ by Tansin Taj for TikTok PM Internship
