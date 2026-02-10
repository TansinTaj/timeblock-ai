# 🚀 QUICK START GUIDE - TimeBlock AI

## ⚡ Super Fast Setup (5 minutes)

### Step 1: Check if Node.js is installed

Open your terminal/command prompt and run:
```bash
node --version
```

**If you see a version number (like v18.x.x or v20.x.x):** Great! Skip to Step 2.

**If you get an error:** Download and install Node.js from https://nodejs.org/
- Choose the LTS (Long Term Support) version
- Use all default settings during installation
- Restart your terminal after installation

### Step 2: Navigate to this project folder

```bash
# On Mac/Linux:
cd ~/Downloads/timeblock-ai

# On Windows:
cd C:\Users\YourName\Downloads\timeblock-ai
```

### Step 3: Install dependencies

```bash
npm install
```

This will take 1-2 minutes. You'll see a progress bar.

### Step 4: Start the development server

```bash
npm run dev
```

### Step 5: Open in browser

You should see something like:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Click the link or open:** http://localhost:5173

🎉 **That's it! Your app should be running!**

---

## 🐛 Troubleshooting

### Problem: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Problem: Port 5173 already in use
**Solution:** 
```bash
npm run dev -- --port 3000
```
Then open: http://localhost:3000

### Problem: "Cannot find module"
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problem: Styles look broken
**Solution:** Make sure you ran `npm install` - Tailwind CSS needs to be installed

---

## 📁 Project Structure

```
timeblock-ai/
├── src/
│   ├── App.jsx              ← Main wrapper
│   ├── TimeBlocker.jsx      ← Core app logic
│   ├── main.jsx            ← React entry point
│   └── index.css           ← Tailwind imports
├── index.html              ← HTML template
├── package.json            ← Dependencies
├── vite.config.js          ← Build config
├── tailwind.config.js      ← Styling config
└── postcss.config.js       ← CSS processing
```

---

## 🎯 Next Steps - Your 5-Day Plan

### ✅ Day 1: DONE!
- ✅ Built basic prototype
- ✅ Reverse time calculation working
- ✅ Clean UI complete

### 📅 Day 2: Add AI Natural Language Input
**Goal:** Type "class at 10am" and have it auto-fill

**What to do:**
1. Sign up for OpenAI API key (https://platform.openai.com/)
2. Install OpenAI SDK:
   ```bash
   npm install openai
   ```
3. Add environment variables for API key
4. Create AI parsing function
5. Test with different inputs

**Files to modify:** `TimeBlocker.jsx`

### 📅 Day 3: Context Awareness
**Goal:** Check weather & traffic to adjust times

**What to do:**
1. Get Weather API key (https://openweathermap.org/api)
2. Get Google Maps API key (https://developers.google.com/maps)
3. Add API calls to check conditions
4. Update time calculations based on context
5. Show weather/traffic warnings in UI

**New dependencies:**
```bash
npm install axios
```

**Files to modify:** `TimeBlocker.jsx` (add API integration)

### 📅 Day 4: Learning & Personalization
**Goal:** Track user patterns and improve suggestions

**What to do:**
1. Add localStorage to save user history
2. Track actual vs planned times
3. Calculate user's average "buffer time"
4. Adjust suggestions based on patterns
5. Show insights (e.g., "You usually need 10 extra minutes")

**Files to modify:** `TimeBlocker.jsx` (add learning logic)

### 📅 Day 5: Demo Video & Polish
**Goal:** Record killer demo, submit application

**Morning:**
- Fix any bugs
- Polish UI
- Add smooth animations
- Test with real schedule

**Afternoon:**
- Record 5-minute demo video
- Edit video
- Upload to TikTok/YouTube
- Submit application

---

## 🎬 Demo Video Script (Use This!)

**0:00-0:30 - The Problem**
```
"Hi! I'm [Your Name], and I have a confession: I'm chronically late.

Not because I don't care, but because I'm terrible at planning backwards.

Like, if I have class at 10am, my brain goes: 'Okay, leave at 9:30...
wait, when should I wake up? 8? 7:30? 7?'

And I ALWAYS guess wrong."
```

**0:30-1:00 - The Solution**
```
"So I built TimeBlock AI - an app that works BACKWARDS for me.

Let me show you..."

[Screen record starting here]
```

**1:00-2:30 - The Demo**
```
"I have class tomorrow at 10am at the university.

[Type in event details]

Now I'll add my morning tasks:
- Shower: 15 minutes
- Breakfast: 20 minutes  
- Commute: 30 minutes
- Review notes: 15 minutes

[Click Generate Schedule]

BOOM. Wake up time: 8:40 AM.

And look at this timeline - it shows me exactly when to do each thing."
```

**2:30-4:00 - The AI Features**
```
"But here's where it gets cool. I'm adding AI:

[Show code/mockups]

Feature 1: Natural language input
Just type: 'dentist appointment at 3pm downtown'
And AI extracts all the details.

Feature 2: Context awareness
It checks the weather - if it's raining, adds 10 minutes to commute.
Checks traffic conditions in real-time.

Feature 3: Learns from you
Tracks if you're actually on time.
If you're always 5 minutes late, it learns and adjusts.
Basically becomes YOUR personal time coach."
```

**4:00-4:30 - Why It Matters**
```
"This isn't just for me.

73% of people say they're regularly late to things.
Students, working professionals, parents juggling schedules.

TimeBlock AI could help millions of people:
- Reduce morning stress
- Never miss important meetings
- Actually get enough sleep

All by working BACKWARDS from what matters."
```

**4:30-5:00 - Call to Action**
```
"I built this in 5 days for the TikTok PM internship.

If you'd like to see this become real, let me know in the comments.

And if you're from TikTok... I'd love to show you what else I can build.

Thanks for watching!"

[End screen with your contact info]
```

---

## 💡 Pro Tips

### For the Demo Video:
- Use screen recording software (OBS is free)
- Test your demo 3 times before recording
- Have a backup if something crashes
- Edit out any mistakes (CapCut is free and easy)

### For the Code:
- Comment your code well (shows you're thinking like a PM)
- Keep it simple - working > fancy
- Have a "fallback mode" if APIs fail
- Test on both mobile and desktop

### For the Application:
- Emphasize the USER PROBLEM, not just the tech
- Show you understand PM thinking (user needs > features)
- Be authentic about what's working vs what's planned

---

## 🆘 Need Help?

**While building:**
- Stack Overflow (search your error message)
- ChatGPT (explain what you're trying to do)
- React docs: https://react.dev
- Vite docs: https://vitejs.dev

**For APIs:**
- OpenAI docs: https://platform.openai.com/docs
- Weather API: https://openweathermap.org/api
- Google Maps: https://developers.google.com/maps

---

## 🎓 Key Learnings to Mention in Interview

If you get the interview, here's what you learned:

1. **User-first thinking:** Started with a personal problem
2. **Rapid prototyping:** Built working MVP in Day 1
3. **AI integration:** Not just using AI, but using it THOUGHTFULLY
4. **Product sense:** Features solve real problems (weather = better time estimates)
5. **Technical choices:** React + Vite = fast development
6. **Scalability:** Designed with growth in mind (learning features)

---

## 📊 Metrics You Could Track (if you build v2)

- Average time saved per user
- Accuracy rate (planned vs actual)
- Most common use cases
- Peak usage times
- Feature adoption rates

---

**Good luck! You've got this! 🚀**

Questions? Issues? Debug as you go and learn from errors.

Remember: A working simple version beats a broken fancy one.

Ship it! 🎯
