
import React, { useState, useRef, useEffect } from 'react';
import { AppState, ChatMessage } from '../types';
import { Bot, Send, User, Sparkles, BrainCircuit, Settings as SettingsIcon } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';

interface Props {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  t: any;
}

const Ampelier: React.FC<Props> = ({ state, updateState, t }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Soy Ampelier. ¿Vas a escalar hoy o vas a seguir perdiendo el tiempo? Muéstrame qué tienes en mente.', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!state.apiKey) {
      alert("Configura tu API Key en los Ajustes primero.");
      navigate('/settings');
      return;
    }

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getGeminiResponse(input);
    
    const aiMsg: ChatMessage = { role: 'assistant', content: response, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-10rem)] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Bot size={22} />
          </div>
          <div>
            <h2 className="font-bold text-lg dark:text-white leading-tight">Ampelier</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Global Strategist AI</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
            <BrainCircuit size={12} className="text-emerald-500" />
            Thinking Active
          </div>
          <button 
            onClick={() => navigate('/settings')}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors"
            title={t.settings}
          >
            <SettingsIcon size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-white dark:bg-slate-700'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                ? 'bg-emerald-500 text-white rounded-tr-none' 
                : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-lg bg-slate-800 dark:bg-slate-700 flex items-center justify-center text-white">
                <Sparkles size={16} className="animate-spin duration-700" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 border border-slate-200 dark:border-slate-700">
                <div className="flex gap-1.5 items-center">
                  <span className="text-xs text-slate-400 font-medium animate-pulse italic">Ampelier is analyzing your weak points...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="relative flex items-center max-w-3xl mx-auto">
          <input 
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 pl-4 pr-14 shadow-sm focus:ring-2 ring-emerald-500 outline-none dark:text-white placeholder-slate-400 transition-all"
            placeholder={t.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl transition-all active:scale-90 shadow-lg shadow-emerald-500/20"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[9px] text-center text-slate-400 mt-3 uppercase tracking-[0.2em] font-bold">
          Ultimate Business Intelligence Engine • v3.0 Alpha
        </p>
      </div>
    </div>
  );
};

export default Ampelier;
