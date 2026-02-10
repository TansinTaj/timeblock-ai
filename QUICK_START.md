# ⚡ TimeBlock AI - Quick Reference Card

## 🎯 Your 5-Day Mission

```
Day 1: Setup & Test Basic App          ← YOU ARE HERE
Day 2: Add AI Natural Language
Day 3: Add Weather & Traffic
Day 4: Add Learning Features
Day 5: Record Demo & Submit
```

---

## 🚀 START HERE - Getting Your App Running

### Option 1: Use the Scripts (Easiest)

**Mac/Linux:**
```bash
cd timeblock-ai
./start.sh
```

**Windows:**
```
Double-click: start.bat
```

### Option 2: Manual Start
```bash
cd timeblock-ai
npm install
npm run dev
```

Then open: **http://localhost:5173**

---

## 📁 What You Got

```
timeblock-ai/
├── 📘 LOCAL_SETUP.md         ← START HERE (basic setup)
├── 📗 COMPLETE_GUIDE.md      ← Full 5-day plan
├── 📄 README.md              ← Project overview
│
├── 🎬 start.sh / start.bat   ← Quick start scripts
├── ⚙️ .env.example            ← API keys template
│
└── src/
    ├── TimeBlocker.jsx       ← Version 1 (Basic)
    └── TimeBlockerAI.jsx     ← Version 2 (With AI) ★
```

---

## ✅ Day 1 Checklist

- [ ] Download all files
- [ ] Run `npm install` (or use start script)
- [ ] Start dev server (`npm run dev`)
- [ ] Open http://localhost:5173 in browser
- [ ] Test basic features:
  - [ ] Add event details
  - [ ] Add tasks
  - [ ] Generate schedule
  - [ ] See wake-up time
- [ ] Take screenshots for demo
- [ ] Push to GitHub (recommended)

---

## 🤖 Day 2 Setup (AI Features)

### Step 1: Get API Key
→ Go to https://platform.openai.com/api-keys
→ Sign up (free tier available)
→ Create new API key
→ Copy it somewhere safe

### Step 2: Set Up .env
```bash
# Copy the template
cp .env.example .env

# Then edit .env and add your key:
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
```

### Step 3: Switch to AI Version
Edit `src/App.jsx`:
```jsx
// Change this line:
import TimeBlocker from './TimeBlocker';

// To this:
import TimeBlocker from './TimeBlockerAI';
```

### Step 4: Restart & Test
```bash
# Stop server (Ctrl+C)
# Start again:
npm run dev
```

Now try: **"I have class at 10am at university"** ✨

---

## 🎨 App Features Overview

### Basic Version (Day 1)
✅ Event input (name, time, location)
✅ Task management (add/remove/edit)
✅ Backward time calculation
✅ Visual timeline display
✅ Wake-up time calculation

### AI Version (Day 2+)
✨ Natural language input
✨ Auto task suggestions
🌤️ Weather awareness (Day 3)
🚗 Traffic checking (Day 3)
📊 Learning from history (Day 4)
📈 Success rate tracking (Day 4)

---

## 💡 Quick Tips

### Testing the App
Try these example inputs:
1. "I have class at 10am at university"
2. "Meeting with boss at 2pm downtown"
3. "Gym session at 6pm at LA Fitness"
4. "Doctor appointment at 3:30pm"

### Common Issues
| Problem | Solution |
|---------|----------|
| Port already in use | Close other apps or change port |
| Styles not working | Clear browser cache (Ctrl+Shift+R) |
| API not working | Check .env file, restart server |
| Module not found | Run `npm install` again |

### Pro Tips
- Use Chrome DevTools (F12) to debug
- Check terminal for error messages
- Save your work frequently
- Test each feature before moving on
- Take screenshots as you go

---

## 📊 Demo Video Outline (Day 5)

```
00:00-00:30  Hook: "I'm always late..." + problem
00:30-01:00  Solution: Introduce TimeBlock AI
01:00-02:00  Demo: Show basic + AI features
02:00-03:30  Demo: Show smart features (weather/learning)
03:30-04:30  Impact: Stats, use cases, vision
04:30-05:00  Tech stack + closing
```

**Key Moments to Record:**
- ✅ Typing natural language → auto-fill
- ✅ Weather check → time adjustment
- ✅ Timeline generation → wake-up time
- ✅ Success rate display

---

## 🎯 Success Criteria

Your app should:
- ✅ Calculate wake-up time accurately
- ✅ Understand natural language (Day 2+)
- ✅ Adjust for weather/traffic (Day 3+)
- ✅ Learn from user patterns (Day 4+)
- ✅ Look professional (clean UI)
- ✅ Work smoothly (no crashes)

---

## 📚 Key Resources

### Documentation
- Complete Guide: `COMPLETE_GUIDE.md`
- Setup Guide: `LOCAL_SETUP.md`
- React Docs: https://react.dev
- OpenAI API: https://platform.openai.com/docs

### API Keys Needed
- Day 2: OpenAI API (https://platform.openai.com)
- Day 3: Weather API (https://openweathermap.org)
- Day 3: Google Maps API (https://console.cloud.google.com)

### Deployment (Day 5)
- Vercel: https://vercel.com (easiest)
- Netlify: https://netlify.com
- GitHub Pages: https://pages.github.com

---

## 🆘 Getting Help

1. **Check the guides:**
   - LOCAL_SETUP.md for setup issues
   - COMPLETE_GUIDE.md for feature implementation

2. **Debug checklist:**
   - [ ] Is Node.js installed? (`node --version`)
   - [ ] Are dependencies installed? (check node_modules/)
   - [ ] Is dev server running? (check terminal)
   - [ ] Are there console errors? (press F12)
   - [ ] Is .env file correct? (check spelling/format)

3. **Still stuck?**
   - Google the error message
   - Check Stack Overflow
   - Review the error stack trace

---

## 🎉 You Got This!

Remember:
- Start simple, add features gradually
- Test each feature before moving on
- Take breaks when stuck
- Done is better than perfect
- Focus on the demo story

Good luck with your TikTok internship application! 🚀

---

Built by Tansin Taj | TikTok PM Internship 2026
