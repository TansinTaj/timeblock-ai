import React, { useState } from 'react';
import { Clock, Calendar, MapPin, Plus, Trash2, Zap } from 'lucide-react';

export default function TimeBlocker() {
  const [eventTime, setEventTime] = useState('10:00');
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Get ready & shower', duration: 60 },
    { id: 2, name: 'Make breakfast', duration: 30 },
  ]);
  const [newTask, setNewTask] = useState({ name: '', duration: 30 });
  const [schedule, setSchedule] = useState(null);

  const addTask = () => {
    if (newTask.name.trim()) {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
      setNewTask({ name: '', duration: 30 });
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
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

    // Add buffer for leaving/commute
    currentTime -= 30; // 30 min commute buffer
    blocks.unshift({
      task: 'Leave home / Commute',
      time: `${String(Math.floor(currentTime / 60)).padStart(2, '0')}:${String(currentTime % 60).padStart(2, '0')}`,
      duration: 30,
      type: 'commute'
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

    // Wake up time is the first block
    const wakeUpTime = blocks[0].time;

    setSchedule({
      wakeUpTime,
      blocks,
      totalPrepTime: tasks.reduce((sum, t) => sum + t.duration, 0) + 30
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Zap className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">TimeBlock AI</h1>
          </div>
          <p className="text-gray-600">Never be late again. AI-powered reverse time planning.</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Event Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              What's your event?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                <input
                  type="text"
                  placeholder="e.g., Class, Meeting"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Time</label>
                <input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="e.g., University, Office"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Tasks List */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              What do you need to do before?
            </h2>

            {/* Existing Tasks */}
            <div className="space-y-3 mb-4">
              {tasks.map(task => (
                <div key={task.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <div className="flex-1">
                    <span className="font-medium text-gray-800">{task.name}</span>
                  </div>
                  <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-md">
                    {task.duration} min
                  </div>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Task */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Task name (e.g., Review notes)"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
              <input
                type="number"
                placeholder="Minutes"
                value={newTask.duration}
                onChange={(e) => setNewTask({ ...newTask, duration: parseInt(e.target.value) || 0 })}
                className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={addTask}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateSchedule}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            ⚡ Generate My Schedule
          </button>
        </div>

        {/* Results */}
        {schedule && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Time-Blocked Schedule</h2>
              <div className="inline-block bg-indigo-100 px-6 py-3 rounded-full">
                <span className="text-sm text-gray-600">Wake up at </span>
                <span className="text-3xl font-bold text-indigo-600">{schedule.wakeUpTime}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Total prep time: {schedule.totalPrepTime} minutes
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              {schedule.blocks.map((block, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg border-l-4 ${
                    block.type === 'event'
                      ? 'bg-green-50 border-green-500'
                      : block.type === 'commute'
                      ? 'bg-blue-50 border-blue-500'
                      : 'bg-purple-50 border-purple-500'
                  }`}
                >
                  <div className="text-2xl font-bold text-gray-800 w-20">
                    {block.time}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{block.task}</div>
                    {block.duration > 0 && (
                      <div className="text-sm text-gray-600">{block.duration} minutes</div>
                    )}
                  </div>
                  {block.type === 'event' && (
                    <div className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
                      🎯 Event
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* AI Placeholder Section */}
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-800 mb-1">🚀 AI Features Coming:</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✨ Natural language input: "I have class at 10am"</li>
                    <li>🌤️ Weather-aware time adjustments</li>
                    <li>🚗 Real-time traffic integration</li>
                    <li>📊 Learn from your patterns over time</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
