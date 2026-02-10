# TimeBlock AI - Complete 5-Day Development Guide 🚀

## 📋 Table of Contents
- [Day 1: Setup & Testing](#day-1-setup--testing)
- [Day 2: AI Natural Language Input](#day-2-ai-natural-language-input)
- [Day 3: Context Awareness](#day-3-context-awareness)
- [Day 4: Learning & Personalization](#day-4-learning--personalization)
- [Day 5: Demo Recording & Submission](#day-5-demo-recording--submission)

---

## Day 1: Setup & Testing

### ✅ What You Have Right Now
Your project structure is complete:
```
timeblock-ai/
├── src/
│   ├── App.jsx              ✓ Main wrapper
│   ├── TimeBlocker.jsx      ✓ Core component  
│   ├── main.jsx             ✓ Entry point
│   └── index.css            ✓ Tailwind styles
├── index.html               ✓ HTML template
├── package.json             ✓ Dependencies
├── vite.config.js           ✓ Vite config
├── tailwind.config.js       ✓ Tailwind config
└── postcss.config.js        ✓ PostCSS config
```

### 🛠 Step-by-Step Setup

#### Step 1: Install Dependencies
```bash
cd /path/to/timeblock-ai
npm install
```

This will install:
- React 18.2.0
- Vite (build tool)
- Tailwind CSS (styling)
- Lucide React (icons)

#### Step 2: Start Development Server
```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

#### Step 3: Open in Browser
1. Open Chrome/Firefox
2. Go to `http://localhost:5173`
3. You should see the TimeBlock AI interface!

### 🧪 Testing Your Basic App

Test these features to make sure everything works:

1. **Event Input:**
   - Enter event name: "Class"
   - Set time: 10:00 AM
   - Set location: "University Building"

2. **Add Tasks:**
   - Click "+ Add Task"
   - Add: "Shower" - 20 min
   - Add: "Breakfast" - 15 min
   - Add: "Commute" - 30 min
   - Add: "Review notes" - 10 min

3. **Generate Schedule:**
   - Click "⚡ Generate My Schedule"
   - Should show wake-up time: 8:45 AM
   - Should show visual timeline with all tasks

4. **Edit/Remove:**
   - Try changing task durations
   - Try removing tasks
   - Watch wake-up time recalculate

### 🎯 Day 1 Goals
- [ ] Successfully run `npm install`
- [ ] Start dev server with `npm run dev`
- [ ] See app in browser at localhost:5173
- [ ] Test all basic features (add tasks, generate schedule)
- [ ] Take screenshots for your demo video
- [ ] Push code to GitHub (recommended)

---

## Day 2: AI Natural Language Input

### 🎯 Goal
Allow users to type: **"I have class at 10am at university"** and auto-fill the form.

### 🔧 What You'll Build

Add a natural language input box that uses AI to:
1. Extract event name ("Class")
2. Extract time ("10:00 AM")
3. Extract location ("University")
4. Suggest common tasks based on event type

### 📦 Required Setup

#### Install OpenAI SDK
```bash
npm install openai
```

#### Get OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create new API key
3. Save it securely (you'll need it)

### 💻 Implementation Steps

#### Step 1: Create Environment File
Create `.env` in root:
```env
VITE_OPENAI_API_KEY=your_api_key_here
```

#### Step 2: Add Natural Language Input Component

Add this to `TimeBlocker.jsx` above the existing form:

```jsx
const [nlInput, setNlInput] = useState('');
const [isProcessing, setIsProcessing] = useState(false);

const processNaturalLanguage = async () => {
  setIsProcessing(true);
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Extract event details from user input. Return JSON with: eventName, eventTime (HH:MM format), location, and suggestedTasks (array of {name, duration}). For class events, suggest: shower (20 min), breakfast (15 min), commute (30 min), review notes (10 min).'
          },
          {
            role: 'user',
            content: nlInput
          }
        ],
        temperature: 0.3
      })
    });

    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content);
    
    // Auto-fill the form
    setEventName(parsed.eventName);
    setEventTime(parsed.eventTime);
    setLocation(parsed.location);
    setTasks(parsed.suggestedTasks || []);
    
  } catch (error) {
    console.error('AI processing error:', error);
    alert('Could not process your input. Please try again!');
  }
  
  setIsProcessing(false);
};
```

#### Step 3: Add UI for Natural Language

Add this JSX before the existing form:

```jsx
{/* Natural Language Input */}
<div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
    <Sparkles className="w-5 h-5 text-purple-600" />
    Try AI: Just describe your event!
  </h3>
  
  <div className="flex gap-2">
    <input
      type="text"
      value={nlInput}
      onChange={(e) => setNlInput(e.target.value)}
      placeholder='e.g., "I have class at 10am at university" or "Meeting at 2pm downtown"'
      className="flex-1 px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
    <button
      onClick={processNaturalLanguage}
      disabled={!nlInput || isProcessing}
      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 flex items-center gap-2"
    >
      {isProcessing ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4" />
          Auto-fill
        </>
      )}
    </button>
  </div>
  
  <p className="text-xs text-gray-600 mt-2">
    💡 The AI will extract your event details and suggest tasks!
  </p>
</div>
```

#### Step 4: Import New Icons

Add to imports at top of `TimeBlocker.jsx`:
```jsx
import { Clock, MapPin, Plus, Trash2, Calendar, Sparkles, Loader } from 'lucide-react';
```

### 🧪 Testing Day 2

Test these inputs:
1. "I have class at 10am at university"
2. "Meeting with boss at 2pm at office downtown"
3. "Gym session at 6pm"
4. "Doctor appointment at 3:30pm at city hospital"

Expected behavior:
- AI should extract time, location, event name
- Should suggest relevant tasks
- Form should auto-fill

### 🎯 Day 2 Goals
- [ ] Install OpenAI SDK
- [ ] Set up API key in .env
- [ ] Add natural language input UI
- [ ] Implement AI parsing function
- [ ] Test with various inputs
- [ ] Record demo of AI feature working

---

## Day 3: Context Awareness (Weather & Traffic)

### 🎯 Goal
Make the app **smart** - adjust times based on real-world conditions.

### 🌤 Feature 1: Weather Awareness

If it's raining → Add 5-10 min buffer to commute time.

#### Setup Weather API

Use OpenWeatherMap (free tier):
1. Sign up at https://openweathermap.org/api
2. Get free API key
3. Add to `.env`:
```env
VITE_WEATHER_API_KEY=your_weather_key
```

#### Implementation

```jsx
const checkWeather = async (location) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
    );
    const data = await response.json();
    
    const isRaining = data.weather[0].main.toLowerCase().includes('rain');
    const isSnowing = data.weather[0].main.toLowerCase().includes('snow');
    
    return {
      condition: data.weather[0].main,
      description: data.weather[0].description,
      temp: data.main.temp,
      needsExtraTime: isRaining || isSnowing,
      extraMinutes: isRaining ? 10 : isSnowing ? 15 : 0,
      icon: data.weather[0].icon
    };
  } catch (error) {
    console.error('Weather check failed:', error);
    return { needsExtraTime: false, extraMinutes: 0 };
  }
};
```

#### Auto-adjust commute time

```jsx
const adjustForWeather = async () => {
  const weather = await checkWeather(location);
  
  if (weather.needsExtraTime) {
    // Find commute task and add time
    setTasks(prev => prev.map(task => 
      task.name.toLowerCase().includes('commute') 
        ? { ...task, duration: task.duration + weather.extraMinutes }
        : task
    ));
    
    // Show notification
    setWeatherAlert({
      show: true,
      message: `${weather.condition} detected! Added ${weather.extraMinutes} min to commute.`,
      icon: weather.icon
    });
  }
};
```

### 🚗 Feature 2: Traffic Awareness

Use Google Maps Distance Matrix API to get real commute time.

#### Setup Google Maps API

1. Go to Google Cloud Console
2. Enable Distance Matrix API
3. Get API key
4. Add to `.env`:
```env
VITE_GOOGLE_MAPS_API_KEY=your_maps_key
```

#### Implementation

```jsx
const getTrafficTime = async (origin, destination, arrivalTime) => {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&departure_time=now&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    const durationInTraffic = data.rows[0].elements[0].duration_in_traffic.value;
    const normalDuration = data.rows[0].elements[0].duration.value;
    
    const trafficDelay = Math.ceil((durationInTraffic - normalDuration) / 60);
    
    return {
      normalMinutes: Math.ceil(normalDuration / 60),
      withTraffic: Math.ceil(durationInTraffic / 60),
      delay: trafficDelay
    };
  } catch (error) {
    console.error('Traffic check failed:', error);
    return { normalMinutes: 30, withTraffic: 30, delay: 0 };
  }
};
```

### 📊 Context Panel UI

Add a "Smart Insights" panel:

```jsx
<div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
  <h4 className="font-semibold mb-2 flex items-center gap-2">
    <Cloud className="w-4 h-4" />
    Smart Context
  </h4>
  
  {weatherAlert.show && (
    <div className="flex items-center gap-2 text-sm mb-2">
      <img src={`http://openweathermap.org/img/w/${weatherAlert.icon}.png`} className="w-6 h-6" />
      <span>{weatherAlert.message}</span>
    </div>
  )}
  
  {trafficInfo.delay > 0 && (
    <div className="text-sm text-orange-700">
      ⚠️ Heavy traffic detected: +{trafficInfo.delay} min commute time
    </div>
  )}
</div>
```

### 🎯 Day 3 Goals
- [ ] Set up weather API
- [ ] Implement weather checking
- [ ] Auto-adjust times for rain/snow
- [ ] Set up Google Maps API
- [ ] Implement traffic checking
- [ ] Show smart insights panel
- [ ] Test with different weather conditions
- [ ] Record demo showing smart adjustments

---

## Day 4: Learning & Personalization

### 🎯 Goal
Track user behavior and improve suggestions over time.

### 🧠 What to Track

1. **Actual vs Planned Times**
   - Did user wake up when suggested?
   - Were they on time to the event?
   - Which tasks took longer than planned?

2. **Personal Patterns**
   - Average shower time
   - Average breakfast time
   - Typical commute duration by day/time

### 💾 Storage Strategy

Use localStorage for MVP (no backend needed):

```jsx
// Save user history
const saveEventHistory = (eventData) => {
  const history = JSON.parse(localStorage.getItem('timeblock_history') || '[]');
  history.push({
    ...eventData,
    timestamp: new Date().toISOString(),
    wasOnTime: null // User will mark later
  });
  localStorage.setItem('timeblock_history', JSON.stringify(history));
};

// Get average task duration
const getAverageTaskDuration = (taskName) => {
  const history = JSON.parse(localStorage.getItem('timeblock_history') || '[]');
  const matchingTasks = history
    .flatMap(event => event.tasks)
    .filter(task => task.name.toLowerCase().includes(taskName.toLowerCase()));
  
  if (matchingTasks.length === 0) return null;
  
  const avg = matchingTasks.reduce((sum, task) => sum + task.duration, 0) / matchingTasks.length;
  return Math.round(avg);
};
```

### 📈 Feedback Collection

Add post-event feedback:

```jsx
const [showFeedback, setShowFeedback] = useState(false);

// Show this modal after event time passes
<div className="modal">
  <h3>How did it go?</h3>
  <p>Were you on time for {eventName}?</p>
  
  <button onClick={() => recordFeedback('yes')}>
    ✅ Yes, on time!
  </button>
  <button onClick={() => recordFeedback('no')}>
    ❌ No, was late
  </button>
  
  <textarea 
    placeholder="What went wrong? (optional)"
    onChange={(e) => setFeedbackNotes(e.target.value)}
  />
</div>
```

### 🎯 Personalization Features

#### 1. Smart Task Suggestions

```jsx
const getSmartSuggestions = (eventType) => {
  const userAverage = getAverageTaskDuration('shower');
  const defaultDuration = 20;
  
  return {
    name: 'Shower',
    duration: userAverage || defaultDuration,
    isPersonalized: !!userAverage
  };
};
```

#### 2. Success Rate Display

```jsx
const getSuccessRate = () => {
  const history = JSON.parse(localStorage.getItem('timeblock_history') || '[]');
  const withFeedback = history.filter(e => e.wasOnTime !== null);
  const successful = withFeedback.filter(e => e.wasOnTime).length;
  
  return withFeedback.length > 0 
    ? Math.round((successful / withFeedback.length) * 100)
    : null;
};
```

Show in UI:
```jsx
<div className="stats-card">
  <h4>Your Success Rate</h4>
  <div className="text-4xl font-bold text-green-600">
    {successRate}%
  </div>
  <p className="text-sm text-gray-600">
    On time {successfulEvents}/{totalEvents} times
  </p>
</div>
```

### 🎯 Day 4 Goals
- [ ] Implement localStorage history tracking
- [ ] Add post-event feedback modal
- [ ] Calculate average task durations
- [ ] Show personalized suggestions
- [ ] Display success rate stats
- [ ] Test with mock historical data
- [ ] Record demo showing learning features

---

## Day 5: Demo Recording & Submission

### 🎬 Demo Video Structure (5 minutes)

#### Part 1: Hook (30 seconds)
```
"I'm always running late to class. The problem? I'm terrible at 
working backward from my event time. So I built TimeBlock AI 
to solve this forever."
```

Show: You being late (can be staged/acted)

#### Part 2: Problem Deep Dive (30 seconds)
```
"Most apps tell you to wake up early. But HOW early? They don't 
account for your specific morning routine, weather conditions, 
or traffic. That's where TimeBlock AI is different."
```

Show: Screenshots of other timer apps vs yours

#### Part 3: Demo - Basic Features (1 minute)
```
"Here's how it works. I have class at 10am at university..."
```

Show on screen:
1. Type "I have class at 10am at university" → AI auto-fills
2. Review suggested tasks (shower, breakfast, etc.)
3. Click generate → See wake-up time: 7:00 AM
4. Show visual timeline

#### Part 4: Demo - Smart Features (1.5 minutes)
```
"But here's where it gets cool. The app checks the weather..."
```

Show:
1. Weather check → Rainy → +10 min commute
2. Traffic check → Heavy traffic → +15 min
3. Wake-up time adjusts automatically to 6:35 AM
4. Smart insights panel showing why

```
"And it learns from you. After tracking my routines for a week,
it knows I actually take 25 minutes for breakfast, not 15."
```

Show:
1. Personalized suggestions
2. Success rate: 85%
3. Average task times chart

#### Part 5: Impact & Vision (1 minute)
```
"This solves a real problem. 60% of people report being late 
regularly. With TimeBlock AI, you:
- Never guess wake-up times
- Account for real-world conditions
- Get better over time

This could help students, professionals, parents - anyone who
values punctuality but struggles with backward planning."
```

Show: Stats, use cases, potential impact

#### Part 6: Tech & Wrap-up (30 seconds)
```
"Built with React, OpenAI API for natural language, weather and 
traffic APIs for context awareness, and machine learning for 
personalization. All in 5 days."

Thanks for watching! I'm Tansin, and I'd love to bring this 
product thinking to TikTok."
```

Show: Code snippets, tech stack, your contact

### 🎥 Recording Tips

**Equipment:**
- Use phone camera (good enough) or laptop webcam
- Make sure good lighting (face a window)
- Clear audio (quiet room, use earbuds mic if needed)

**Screen Recording:**
- Mac: Cmd + Shift + 5
- Windows: Win + G (Game Bar)
- Or use OBS Studio (free)

**Editing:**
- Use iMovie (Mac) or Clipchamp (Windows)
- Add text overlays for key points
- Add background music (YouTube Audio Library)
- Keep it punchy - cut dead air

**Practice:**
- Script everything
- Practice 3-5 times before recording
- Record in segments, then stitch together

### 📤 Submission Checklist

Before you submit:
- [ ] Video is exactly 5 minutes (±10 seconds)
- [ ] Shows all 4 features (basic, AI, context, learning)
- [ ] Clear explanation of problem & solution
- [ ] Good audio and visual quality
- [ ] Includes your name and contact
- [ ] Uploaded to required platform
- [ ] App is deployed (Vercel/Netlify) with live link
- [ ] GitHub repo is public with good README
- [ ] All code is commented and clean

### 🚀 Deployment

Deploy your app so the video shows a live link:

#### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Follow prompts, get live URL in 2 minutes.

#### Option 2: Netlify
```bash
npm run build
# Drag the 'dist' folder to Netlify Drop
```

Add your live link to video description!

---

## 🆘 Troubleshooting

### Common Issues

**Issue: npm install fails**
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Issue: API keys not working**
- Make sure .env file is in ROOT directory
- Restart dev server after adding .env
- Check for typos in VITE_* prefix

**Issue: CORS errors with APIs**
- Weather API: Should work directly
- OpenAI: Works from client-side
- Google Maps: May need proxy - use Netlify Functions

**Issue: Tailwind styles not applying**
- Check index.css has @tailwind directives
- Check tailwind.config.js content paths
- Restart dev server

---

## 🎯 Final Checklist

### Day 1
- [x] Project runs locally
- [ ] Basic features tested
- [ ] Screenshots taken

### Day 2
- [ ] OpenAI API integrated
- [ ] Natural language input works
- [ ] Tested with multiple inputs

### Day 3
- [ ] Weather API integrated
- [ ] Traffic API integrated
- [ ] Smart adjustments working

### Day 4
- [ ] History tracking implemented
- [ ] Personalization working
- [ ] Success rate displayed

### Day 5
- [ ] App deployed
- [ ] Demo video recorded
- [ ] Application submitted

---

## 💡 Extra Credit Ideas

If you finish early, consider adding:

1. **Calendar Integration**
   - Import from Google Calendar
   - Show upcoming events

2. **Notifications**
   - Browser notifications for wake-up time
   - SMS reminders

3. **Social Sharing**
   - Share your schedule with friends
   - "I'm waking up at 7am tomorrow!"

4. **Analytics Dashboard**
   - Charts showing punctuality trends
   - Most time-consuming tasks

5. **Multi-day Planning**
   - Plan entire week
   - Recurring events

---

## 📚 Resources

### APIs
- OpenAI: https://platform.openai.com/docs
- Weather: https://openweathermap.org/api
- Google Maps: https://developers.google.com/maps/documentation/distance-matrix

### React/Vite
- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev
- Tailwind CSS: https://tailwindcss.com

### Deployment
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com

---

Good luck! You've got this! 🚀

Remember: Done is better than perfect. Focus on getting working demos 
of each feature rather than polishing everything perfectly.

---

Built by Tansin Taj for TikTok PM Internship Application 2026
Questions? Review this guide or search the documentation!
