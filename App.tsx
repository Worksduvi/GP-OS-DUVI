
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Library, 
  Code2, 
  Bot, 
  StickyNote as NoteIcon, 
  ChevronLeft, 
  ChevronRight, 
  Moon, 
  Sun,
  Linkedin,
  Plus,
  Settings as SettingsIcon,
  Sparkles
} from 'lucide-react';
import { Language, AppState } from './types';
import { translations } from './translations';

// Sections
import Dashboard from './sections/Dashboard';
import Vault from './sections/Vault';
import StrategyCode from './sections/StrategyCode';
import Ampelier from './sections/Ampelier';
import Productivity from './sections/Productivity';
import Settings from './sections/Settings';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem('gp_os_state_v2');
    if (saved) return JSON.parse(saved);
    return {
      language: Language.ES,
      theme: 'dark',
      resources: [
        { id: '1', title: 'Manual del Growth Partner', type: 'PDF', url: '#', description: 'Metodología completa de escalado.' },
        { id: '2', title: 'Estrategias High Ticket', type: 'Video', url: 'https://youtube.com', description: 'Cómo cerrar deals de 5 cifras.' },
        { id: '3', title: 'Embudos de Venta', type: 'Link', url: 'https://google.com', description: 'Guía visual de funnels efectivos.' },
      ],
      strategyFiles: [
        { id: '1', name: 'Plan_Q1.md', content: '# Plan de Crecimiento Q1\n\n1. Identificar nichos rentables.\n2. Crear oferta irresistible.', language: 'markdown' },
        { id: '2', name: 'Oferta_Irresistible.txt', content: 'Nuestra solución ahorra 10h/semana...', language: 'text' }
      ],
      notes: [],
      aiProvider: 'gemini'
    };
  });

  const t = translations[appState.language];

  // Sync state to localstorage
  useEffect(() => {
    localStorage.setItem('gp_os_state_v2', JSON.stringify(appState));
    if (appState.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [appState]);

  const toggleTheme = () => {
    setAppState(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  };

  const setLanguage = (lang: Language) => {
    setAppState(prev => ({ ...prev, language: lang }));
  };

  const updateState = (updates: Partial<AppState>) => {
    setAppState(prev => ({ ...prev, ...updates }));
  };

  const menuItems = [
    { icon: LayoutDashboard, label: t.dashboard, path: '/' },
    { icon: Library, label: t.vault, path: '/vault' },
    { icon: Code2, label: t.strategy, path: '/strategy' },
    { icon: Bot, label: t.ampelier, path: '/ampelier' },
    { icon: NoteIcon, label: t.productivity, path: '/productivity' },
    { icon: SettingsIcon, label: t.settings, path: '/settings' },
  ];

  const languages = [
    { code: Language.ES, flag: '🇪🇸' },
    { code: Language.US, flag: '🇺🇸' },
    { code: Language.CN, flag: '🇨🇳' },
    { code: Language.IN, flag: '🇮🇳' },
    { code: Language.RU, flag: '🇷🇺' },
    { code: Language.MY, flag: '🇲🇾' },
    { code: Language.JP, flag: '🇯🇵' },
    { code: Language.PH, flag: '🇵🇭' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col z-20 shadow-xl`}
      >
        <div className="p-4 flex items-center justify-between overflow-hidden">
          {isSidebarOpen && (
            <div 
              onClick={() => navigate('/')}
              className="group cursor-pointer flex items-center gap-3 select-none"
            >
              {/* Logo en forma de pensamiento creativo e iluminado */}
              <div className="relative flex items-center justify-center">
                {/* Efecto de resplandor trasero */}
                <div className="absolute inset-0 bg-emerald-400 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500 scale-125"></div>
                
                {/* Contenedor principal del logo (forma de pensamiento) */}
                <div className="relative w-10 h-10 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-emerald-400/50">
                  <span className="font-black text-xl italic tracking-tighter group-hover:animate-pulse">G</span>
                  
                  {/* Pequeñas burbujas de pensamiento adicionales */}
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 transform transition-all duration-500 group-hover:scale-125 group-hover:-translate-x-1 group-hover:translate-y-1"></div>
                  <div className="absolute -bottom-2.5 -left-2.5 w-2 h-2 bg-emerald-400 rounded-full border border-white dark:border-slate-900 transform transition-all duration-700 group-hover:scale-150 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
                  
                  {/* Destello de creatividad */}
                  <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce" />
                </div>
              </div>

              <span className="font-bold text-lg tracking-tighter text-slate-800 dark:text-slate-100 flex flex-col leading-none transition-transform duration-300 group-hover:translate-x-1">
                <span className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em] mb-0.5">Growth</span>
                GP OS DUVI
              </span>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive 
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <item.icon size={22} className={isActive ? 'text-emerald-500' : ''} />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer in Sidebar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          {isSidebarOpen ? (
            <div className="text-[10px] text-slate-400 leading-relaxed font-medium">
              <p>© 2026 Growth Partner OS. {t.rights}</p>
              <div className="flex items-center gap-1 mt-1">
                <span>{t.created}</span>
                <a 
                  href="https://www.linkedin.com/in/jaime-andrés-dueñas-vicuña" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-500 hover:underline flex items-center gap-0.5 font-bold"
                >
                  Jaime Andrés <Linkedin size={10} />
                </a>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
               <a href="https://www.linkedin.com/in/jaime-andrés-dueñas-vicuña" target="_blank" rel="noopener noreferrer">
                <Linkedin size={16} className="text-emerald-500" />
               </a>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-end px-6 gap-4 z-10 shadow-sm transition-colors">
          <div className="flex items-center bg-slate-100/50 dark:bg-slate-800/50 rounded-full p-1 border border-slate-200 dark:border-slate-700">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all hover:scale-110 ${
                  appState.language === l.code ? 'bg-white dark:bg-slate-600 shadow-md scale-110 z-10' : 'opacity-40 grayscale hover:grayscale-0'
                }`}
                title={l.code.toUpperCase()}
              >
                {l.flag}
              </button>
            ))}
          </div>
          
          <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-sm"
          >
            {appState.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        {/* Section Wrapper */}
        <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-950 transition-colors">
          <div className="max-w-[1600px] mx-auto p-4 md:p-8">
            <Routes>
              <Route path="/" element={<Dashboard state={appState} t={t} />} />
              <Route path="/vault" element={<Vault state={appState} updateState={updateState} t={t} />} />
              <Route path="/strategy" element={<StrategyCode state={appState} updateState={updateState} t={t} />} />
              <Route path="/ampelier" element={<Ampelier state={appState} updateState={updateState} t={t} />} />
              <Route path="/productivity" element={<Productivity state={appState} updateState={updateState} t={t} />} />
              <Route path="/settings" element={<Settings state={appState} updateState={updateState} t={t} />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
