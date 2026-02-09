import React, { useState, useEffect } from 'react';
import { CheckCircle2, Pencil, Trash2, Plus } from 'lucide-react';

export function Workspace() {
  const [note, setNote] = useState(() => localStorage.getItem('plain-note') || '');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('plain-tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Capture essential thoughts', completed: false },
      { id: 2, text: 'Simplify the routine', completed: true },
    ];
  });
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('plain-note', note);
  }, [note]);

  useEffect(() => {
    localStorage.setItem('plain-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([{ id: Date.now(), text: newTask, completed: false }, ...tasks]);
    setNewTask('');
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-4xl mx-auto px-8 py-20">
        <header className="mb-12">
          <p className="text-[10px] font-bold tracking-[0.3em] text-gray-300 uppercase mb-2">Workspace</p>
          <div className="flex items-baseline justify-between border-b border-gray-50 pb-4">
            <h1 className="text-xl font-medium text-gray-400">{today}</h1>
            <span className="text-xs text-gray-300 italic">Clear your mind.</span>
          </div>
        </header>

        <main className="space-y-16">
          {/* Main Writing Surface */}
          <section className="relative group">
            <div className="absolute -left-8 top-3 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
              <Pencil className="w-4 h-4 text-gray-200" />
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind? Start typing..."
              className="w-full min-h-[450px] text-2xl text-gray-800 placeholder-gray-100 bg-transparent border-none focus:ring-0 outline-none resize-none leading-[1.6] font-light"
              spellCheck={false}
            />
          </section>

          {/* Minimalist Task Stream */}
          <section className="pt-12">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1 h-1 bg-blue-400 rounded-full" />
              <h2 className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                Focus
              </h2>
            </div>
            
            <form onSubmit={addTask} className="mb-8">
              <div className="group flex items-center gap-4 py-3 border-b border-gray-50 focus-within:border-blue-100 transition-all">
                <Plus className="w-4 h-4 text-gray-200 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a priority..."
                  className="flex-1 bg-transparent text-xl text-gray-600 placeholder-gray-100 focus:outline-none font-light"
                />
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between py-3 group hover:bg-gray-50/50 px-4 -mx-4 rounded-lg transition-all"
                >
                  <div
                    className="flex items-center gap-4 cursor-pointer flex-1"
                    onClick={() => toggleTask(task.id)}
                  >
                    <div className="relative flex items-center justify-center">
                      {task.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gray-100 group-hover:border-blue-100" />
                      )}
                    </div>
                    <span className={`text-base transition-all duration-300 ${task.completed ? 'text-gray-300 line-through' : 'text-gray-600'}`}>
                      {task.text}
                    </span>
                  </div>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-200 hover:text-red-300 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="mt-40 pb-12 flex justify-center">
          <div className="flex items-center gap-6 text-[9px] font-bold tracking-[0.4em] text-gray-200 uppercase">
            <span>Focus</span>
            <div className="w-1 h-1 bg-gray-200 rounded-full" />
            <span>Write</span>
            <div className="w-1 h-1 bg-gray-200 rounded-full" />
            <span>Execute</span>
          </div>
        </footer>
      </div>
    </div>
  );
}