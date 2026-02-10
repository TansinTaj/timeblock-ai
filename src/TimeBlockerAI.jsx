import React, { useState } from 'react';
import { Clock, Calendar, MapPin, Plus, Trash2, Zap, Sparkles, Loader, Cloud, AlertCircle } from 'lucide-react';

export default function TimeBlockerAI() {
  // Original state
  const [eventTime, setEventTime] = useState('10:00');
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Get ready & shower', duration: 60 },
    { id: 2, name: 'Make breakfast', duration: 30 },
  ]);
  const [newTask, setNewTask] = useState({ name: '', duration: 30 });
  const [schedule, setSchedule] = useState(null);

  // NEW: AI features state
  const [nlInput, setNlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [showAIPanel, setShowAIPanel] = useState(true);

  // NEW: Context awareness state
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [trafficInfo, setTrafficInfo] = useState(null);
  const [contextChecking, setContextChecking] = useState(false);

  const addTask = () => {
    if (newTask.name.trim()) {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
      setNewTask({ name: '', duration: 30 });
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // NEW: AI Natural Language Processing
  const processNaturalLanguage = async () => {
    if (!nlInput.trim()) return;
    
    setIsProcessing(true);
    
    try {
      // Check if API key is set
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!apiKey || apiKey === 'your_api_key_here') {
        alert('⚠️ Please set up your OpenAI API key in .env file!\n\nSee COMPLETE_GUIDE.md Day 2 for instructions.');
        setIsProcessing(false);
        return;
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are an AI assistant that extracts event details from natural language.
              
              Extract these fields:
              - eventName: The name of the event (e.g., "Class", "Meeting", "Gym")
              - eventTime: Time in HH:MM 24-hour format (e.g., "10:00", "14:30")
              - location: Location description (e.g., "University", "Office", "Downtown Gym")
              - suggestedTasks: Array of tasks to do before the event
              
              For each suggested task, provide:
              - name: Task name
              - duration: Duration in minutes
              
              Common task suggestions by event type:
              - Class/School: [shower (20), breakfast (15), review notes (10), commute (30)]
              - Work/Meeting: [shower (15), breakfast (10), prepare materials (15), commute (30)]
              - Gym: [light snack (10), pack gym bag (5), commute (20)]
              - Doctor: [prepare insurance (5), commute (25)]
              
              Return ONLY valid JSON, no markdown, no explanation.
              
              Example output:
              {
                "eventName": "Class",
                "eventTime": "10:00",
                "location": "University Building",
                "suggestedTasks": [
                  {"name": "Shower & get ready", "duration": 20},
                  {"name": "Breakfast", "duration": 15},
                  {"name": "Review notes", "duration": 10},
                  {"name": "Commute to campus", "duration": 30}
                ]
              }`
            },
            {
              role: 'user',
              content: nlInput
            }
          ],
          temperature: 0.3,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Parse JSON response
      let parsed;
      try {
        // Remove markdown code blocks if present
        const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
        parsed = JSON.parse(cleanContent);
      } catch (e) {
        console.error('Failed to parse AI response:', content);
        throw new Error('AI returned invalid JSON');
      }
      
      // Auto-fill the form
      setEventName(parsed.eventName || '');
      setEventTime(parsed.eventTime || '10:00');
      setLocation(parsed.location || '');
      
      // Set tasks with unique IDs
      if (parsed.suggestedTasks && Array.isArray(parsed.suggestedTasks)) {
        setTasks(parsed.suggestedTasks.map((task, index) => ({
          id: Date.now() + index,
          name: task.name,
          duration: task.duration
        })));
      }
      
      // Show success message
      setAiSuggestions({
        success: true,
        message: `✨ Understood! I've set up "${parsed.eventName}" for ${parsed.eventTime}`
      });
      
      // Clear input
      setNlInput('');
      
    } catch (error) {
      console.error('AI processing error:', error);
      setAiSuggestions({
        success: false,
        message: `❌ ${error.message || 'Could not process your input. Please try again!'}`
      });
    }
    
    setIsProcessing(false);
  };

  // NEW: Check weather
  const checkWeather = async () => {
    if (!location) {
      alert('Please enter a location first!');
      return;
    }

    setContextChecking(true);

    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      
      if (!apiKey || apiKey === 'your_weather_key') {
        alert('⚠️ Please set up your Weather API key in .env file!\n\nSee COMPLETE_GUIDE.md Day 3 for instructions.');
        setContextChecking(false);
        return;
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Weather check failed');
      }

      const data = await response.json();
      
      const condition = data.weather[0].main.toLowerCase();
      const isRaining = condition.includes('rain');
      const isSnowing = condition.includes('snow');
      const needsExtraTime = isRaining || isSnowing;
      const extraMinutes = isRaining ? 10 : isSnowing ? 15 : 0;
      
      setWeatherInfo({
        condition: data.weather[0].main,
        description: data.weather[0].description,
        temp: Math.round(data.main.temp),
        icon: data.weather[0].icon,
        needsExtraTime,
        extraMinutes
      });

      // Auto-adjust commute time if weather is bad
      if (needsExtraTime) {
        setTasks(prev => prev.map(task => 
          task.name.toLowerCase().includes('commute') 
            ? { ...task, duration: task.duration + extraMinutes }
            : task
        ));
      }

    } catch (error) {
      console.error('Weather check error:', error);
      alert('Could not fetch weather. Please check your location and API key.');
    }

    setContextChecking(false);
  };

  const calculateSchedule = () => {
    // Parse event time
    const [hours, minutes] = eventTime.split(':').map(Number);
    let currentTime = hours * 60 + minutes; // Convert to minutes

    const blocks = [];
    
    // Work backward from event time
    blocks.unshift({
      task: eventName || 'Arrive at destination',
      time: `${String(Math.floor(currentTime / 60)).padStart(2, '0')}:${String(currentTime % 60).padStart(2, '0')}`,
      duration: 0,
      type: 'event'
    });

    // Add all tasks working backward
    [...tasks].reverse().forEach(task => {
      currentTime -= task.duration;
      blocks.unshift({
        task: task.name,
        time: `${String(Math.floor(currentTime / 60)).padStart(2, '0')}:${String(currentTime % 60).padStart(2, '0')}`,
        duration: task.duration,
        type: 'task'
      });
    });

    // The first block time is the wake-up time
    setSchedule({
      wakeUpTime: blocks[0].time,
      blocks: blocks
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            ⏰ TimeBlock AI
          </h1>
          <p className="text-gray-600 text-lg">
            Never be late again - Let AI plan your morning backwards
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          
          {/* AI Natural Language Input Panel */}
          {showAIPanel && (
            <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  ✨ Try AI: Just describe your event!
                </h3>
                <button
                  onClick={() => setShowAIPanel(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={nlInput}
                  onChange={(e) => setNlInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && processNaturalLanguage()}
                  placeholder='e.g., "I have class at 10am at university" or "Meeting at 2pm downtown"'
                  className="flex-1 px-4 py-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isProcessing}
                />
                <button
                  onClick={processNaturalLanguage}
                  disabled={!nlInput || isProcessing}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
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

              {aiSuggestions && (
                <div className={`text-sm p-3 rounded-lg ${aiSuggestions.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {aiSuggestions.message}
                </div>
              )}
              
              <p className="text-xs text-gray-600 mt-2">
                💡 The AI will extract your event details and suggest tasks automatically!
              </p>
            </div>
          )}

          {/* Weather/Context Panel */}
          {weatherInfo && (
            <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Cloud className="w-4 h-4" />
                Smart Context
              </h4>
              <div className="flex items-center gap-3">
                <img 
                  src={`http://openweathermap.org/img/w/${weatherInfo.icon}.png`} 
                  alt={weatherInfo.description}
                  className="w-12 h-12"
                />
                <div className="flex-1">
                  <div className="font-medium">{weatherInfo.condition} - {weatherInfo.temp}°C</div>
                  <div className="text-sm text-gray-600 capitalize">{weatherInfo.description}</div>
                  {weatherInfo.needsExtraTime && (
                    <div className="text-sm text-orange-700 font-medium mt-1">
                      ⚠️ Bad weather detected! Added {weatherInfo.extraMinutes} min to commute.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Event Details */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Event Details
            </h3>
            
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Event Name
                </label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g., Morning Class, Team Meeting"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Event Time
                  </label>
                  <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., University, Downtown Office"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={checkWeather}
                      disabled={!location || contextChecking}
                      className="px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      title="Check weather"
                    >
                      {contextChecking ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Cloud className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Tasks Before Event</h3>
            
            <div className="space-y-3 mb-4">
              {tasks.map(task => (
                <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{task.name}</div>
                    <div className="text-sm text-gray-600">{task.duration} minutes</div>
                  </div>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={newTask.name}
                onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="Task name (e.g., Shower, Breakfast)"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <input
                type="number"
                value={newTask.duration}
                onChange={(e) => setNewTask({...newTask, duration: parseInt(e.target.value) || 30})}
                min="5"
                max="180"
                className="w-24 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={addTask}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={calculateSchedule}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all"
          >
            <Zap className="w-6 h-6" />
            ⚡ Generate My Schedule
          </button>
        </div>

        {/* Schedule Display */}
        {schedule && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Your Schedule</h2>
              <div className="text-6xl font-bold text-green-600 mb-2">
                {schedule.wakeUpTime}
              </div>
              <p className="text-gray-600 text-lg">Wake-up time</p>
            </div>

            <div className="space-y-3">
              {schedule.blocks.map((block, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg ${
                    block.type === 'event' 
                      ? 'bg-purple-100 border-2 border-purple-400' 
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="text-2xl font-bold text-blue-600 min-w-[80px]">
                    {block.time}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{block.task}</div>
                    {block.duration > 0 && (
                      <div className="text-sm text-gray-600">{block.duration} minutes</div>
                    )}
                  </div>
                  {block.type === 'event' && (
                    <div className="text-2xl">🎯</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
