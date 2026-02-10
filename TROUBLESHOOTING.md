# 🔧 Troubleshooting Guide - TimeBlock AI

## Quick Diagnostic

Run this command to check your setup:
```bash
node --version && npm --version && ls -la
```

Expected output:
```
v18.x.x (or higher)
9.x.x (or higher)
[list of files including package.json]
```

---

## 🚨 Common Issues & Solutions

### 1. "npm: command not found" or "node: command not found"

**Problem:** Node.js is not installed

**Solution:**
1. Go to https://nodejs.org/
2. Download LTS version (recommended)
3. Install it
4. Close and reopen terminal
5. Verify: `node --version`

**Mac specific:** You might need to use Homebrew:
```bash
brew install node
```

**Windows specific:** Make sure to check "Add to PATH" during installation

---

### 2. "npm install" fails or gets stuck

**Problem:** Corrupted cache or network issues

**Solution 1 - Clear cache:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Solution 2 - Use different registry:**
```bash
npm install --registry=https://registry.npmjs.org/
```

**Solution 3 - Check permissions (Mac/Linux):**
```bash
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

---

### 3. "Port 5173 is already in use"

**Problem:** Another app is using that port

**Solution 1 - Kill the process:**

Mac/Linux:
```bash
lsof -ti:5173 | xargs kill -9
```

Windows:
```powershell
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F
```

**Solution 2 - Use different port:**
Edit `vite.config.js`:
```js
export default {
  server: {
    port: 3000  // Change to any available port
  }
}
```

---

### 4. Styles not showing / App looks unstyled

**Problem:** Tailwind CSS not configured properly

**Checklist:**
- [ ] Is `index.css` in the `src/` folder?
- [ ] Does `index.css` contain Tailwind directives?
- [ ] Is `tailwind.config.js` in root directory?
- [ ] Did you restart dev server?

**Fix index.css:**
Make sure it has:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Clear browser cache:**
- Chrome/Edge: Ctrl+Shift+R (Cmd+Shift+R on Mac)
- Firefox: Ctrl+Shift+Delete
- Safari: Cmd+Option+E

**Rebuild:**
```bash
npm run build
npm run dev
```

---

### 5. "Module not found" errors

**Problem:** Missing dependencies or wrong import paths

**Solution 1 - Reinstall dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Solution 2 - Check imports:**
Make sure imports are correct:
```jsx
// Correct (using .jsx extension)
import TimeBlocker from './TimeBlocker.jsx';

// Also works (Vite auto-resolves)
import TimeBlocker from './TimeBlocker';
```

**Solution 3 - Check file locations:**
```
src/
├── App.jsx              ✓
├── TimeBlocker.jsx      ✓
├── TimeBlockerAI.jsx    ✓
├── main.jsx             ✓
└── index.css            ✓
```

---

### 6. API Keys not working

**Problem:** Environment variables not configured correctly

**Checklist:**
- [ ] Is `.env` file in ROOT directory (not in src/)?
- [ ] Are variables prefixed with `VITE_`?
- [ ] Did you restart dev server after creating .env?
- [ ] Is your API key valid (check for typos)?

**Correct .env format:**
```env
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
VITE_WEATHER_API_KEY=xxxxxxxxxxxxx
```

**Incorrect formats:**
```env
# ❌ Wrong - missing VITE_ prefix
OPENAI_API_KEY=sk-proj-xxx

# ❌ Wrong - has quotes
VITE_OPENAI_API_KEY="sk-proj-xxx"

# ❌ Wrong - has spaces
VITE_OPENAI_API_KEY = sk-proj-xxx
```

**Debug in browser console:**
```javascript
console.log(import.meta.env.VITE_OPENAI_API_KEY);
// Should show your key (without quotes)
// If undefined, .env is not loaded correctly
```

**Always restart after .env changes:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

---

### 7. OpenAI API errors

**Error:** "Invalid API key"
**Solution:** 
- Check key is copied correctly (no extra spaces)
- Verify key is active at https://platform.openai.com/api-keys
- Make sure you have credits/billing set up

**Error:** "Rate limit exceeded"
**Solution:**
- You're making too many requests
- Wait a minute and try again
- Upgrade to paid plan for higher limits

**Error:** "CORS error"
**Solution:**
- This shouldn't happen with OpenAI
- Check you're using correct endpoint
- Make sure fetch request is correct

**Error:** "Model not found"
**Solution:**
- Use `gpt-3.5-turbo` (not gpt-4)
- GPT-4 requires paid account

---

### 8. Weather API not working

**Error:** "Invalid API key"
**Solution:**
- Get free key at https://openweathermap.org/api
- Wait 10 minutes after signup (activation delay)
- Check key is in .env as VITE_WEATHER_API_KEY

**Error:** "City not found"
**Solution:**
- Use general location names ("London" not "London, UK")
- Try alternative spellings
- Use city name only, not full address

**Request example:**
```javascript
// ✓ Good
https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY

// ✗ Bad
https://api.openweathermap.org/data/2.5/weather?q=123 Main St&appid=YOUR_KEY
```

---

### 9. White screen / App won't load

**Problem:** JavaScript error preventing render

**Debug steps:**

1. **Check browser console (F12):**
   - Look for red error messages
   - Note the file and line number

2. **Check terminal:**
   - Look for compilation errors
   - Check for syntax errors

3. **Common causes:**
   - Missing closing tags in JSX
   - Unclosed curly braces `{}`
   - Missing imports

**Quick fix - revert to working version:**
```bash
git checkout HEAD~1  # If using Git
# Or restore from backup
```

---

### 10. App crashes when clicking buttons

**Problem:** Event handlers or state updates causing errors

**Debug:**
1. Open browser console (F12)
2. Click the button again
3. Read the error message

**Common issues:**

**Issue:** "Cannot read property 'map' of undefined"
```jsx
// ❌ Wrong
{tasks.map(task => ...)}  // tasks might be undefined

// ✓ Fixed
{tasks && tasks.map(task => ...)}
// Or
{(tasks || []).map(task => ...)}
```

**Issue:** "setState is not a function"
```jsx
// ❌ Wrong
const [tasks, setTasks] = useState;  // Missing ()

// ✓ Fixed
const [tasks, setTasks] = useState([]);
```

---

### 11. Build fails (npm run build)

**Error:** "Out of memory"
**Solution:**
```bash
# Increase Node memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

**Error:** "Missing dependencies"
**Solution:**
```bash
npm install
npm run build
```

**Error:** "Failed to optimize dependencies"
**Solution:**
```bash
rm -rf node_modules/.vite
npm run build
```

---

### 12. Deployment issues

**Vercel deployment fails:**
- Make sure `package.json` has build script
- Check Node version in Vercel settings (18.x)
- Verify environment variables are set

**Netlify deployment fails:**
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18.x

**Environment variables not working in production:**
- Re-add them in deployment platform settings
- Don't include .env file in deployment
- Rebuild after adding env vars

---

## 🔍 Debugging Techniques

### 1. Console Logging
```jsx
const calculateSchedule = () => {
  console.log('Event time:', eventTime);
  console.log('Tasks:', tasks);
  // ... rest of function
};
```

### 2. React DevTools
- Install React DevTools browser extension
- Inspect component state in real-time
- Check props being passed

### 3. Network Tab
- Open DevTools → Network tab
- Check API requests
- Look for 400/500 errors
- Verify request/response data

### 4. Step-by-Step Isolation
```jsx
// Comment out code to isolate issue
const handleSubmit = () => {
  console.log('Step 1: Starting');
  // calculateSchedule();  // Comment this
  console.log('Step 2: Done');
};
```

---

## 📝 Error Message Dictionary

### "unexpected token"
→ Syntax error in your code (missing comma, bracket, etc.)

### "cannot find module"
→ Wrong import path or missing dependency

### "hooks can only be called inside function components"
→ Using useState/useEffect outside component or in wrong order

### "maximum update depth exceeded"
→ Infinite loop in useEffect (missing dependencies)

### "objects are not valid as react child"
→ Trying to render an object directly (use .map() or properties)

---

## 🆘 Still Stuck?

### Step-by-step diagnostic:

1. **Verify basics:**
   ```bash
   node --version  # Should be 18+
   npm --version   # Should be 9+
   ls package.json # Should exist
   ```

2. **Clean install:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check file structure:**
   ```bash
   ls -R src/
   # Should show all .jsx and .css files
   ```

4. **Start fresh:**
   ```bash
   npm run dev
   ```

5. **Check browser console (F12)** for errors

6. **Check terminal** for compilation errors

---

## 💡 Prevention Tips

1. **Save frequently** - Don't lose work
2. **Test incrementally** - Don't add 100 lines without testing
3. **Use Git** - Commit working versions
4. **Read error messages** - They usually tell you what's wrong
5. **Google is your friend** - Copy error message → Google → Stack Overflow

---

## 🎯 Quick Recovery Checklist

If everything breaks:

- [ ] Stop dev server (Ctrl+C)
- [ ] Delete node_modules and package-lock.json
- [ ] Run `npm install`
- [ ] Check all files are in correct folders
- [ ] Verify .env has correct format
- [ ] Restart dev server
- [ ] Clear browser cache
- [ ] Check browser console for errors
- [ ] If all else fails, restore from backup or Git

---

## 📞 Resources

- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev
- Stack Overflow: https://stackoverflow.com
- MDN Web Docs: https://developer.mozilla.org

---

Remember: Every developer faces these issues. Don't get discouraged! 💪

Good luck with your project! 🚀
