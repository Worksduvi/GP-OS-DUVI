
import React, { useMemo } from 'react';
import { AppState } from '../types';
// Fixed: Added missing Plus, Bot, and Library icons to the lucide-react import
import { TrendingUp, Target, Users, Zap, Quote, Plus, Bot, Library } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  state: AppState;
  t: any;
}

const Dashboard: React.FC<Props> = ({ state, t }) => {
  const navigate = useNavigate();

  const quotes = [
    "La obsesión vence al talento siempre.",
    "El mercado no paga por el esfuerzo, paga por el valor.",
    "No estás vendiendo un servicio, estás vendiendo libertad.",
    "Escalar es decir NO a casi todo.",
    "Tu red de contactos es tu red de ingresos.",
    "Growth es mentalidad, no solo herramientas."
  ];

  const dailyQuote = useMemo(() => quotes[Math.floor(Math.random() * quotes.length)], []);

  const stats = [
    { label: 'Estrategias', value: state.strategyFiles.length, icon: Target, color: 'text-blue-500' },
    { label: 'Recursos', value: state.resources.length, icon: Users, color: 'text-emerald-500' },
    { label: 'Notas Activas', value: state.notes.length, icon: Zap, color: 'text-amber-500' },
    { label: 'Nivel Growth', value: 'High Ticket', icon: TrendingUp, color: 'text-purple-500' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">{t.dashboard}</h1>
          <p className="text-slate-500 dark:text-slate-400">Bienvenido a tu centro de operaciones de alto nivel.</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Status</p>
          <p className="text-emerald-500 font-mono text-sm">Active Session / System OK</p>
        </div>
      </div>

      {/* Mindset Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-2xl shadow-emerald-500/20">
        <Quote className="absolute -top-4 -left-4 w-32 h-32 opacity-10 rotate-12" />
        <div className="relative z-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 opacity-80">{t.focusPhrase}</h2>
          <p className="text-3xl md:text-4xl font-light italic mb-2">"{dailyQuote}"</p>
          <p className="text-sm opacity-60">— Mentalidad Growth Partner</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-800 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t.quickLinks}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => navigate('/strategy')}
            className="group flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 transition-all text-left"
          >
            <div>
              <p className="font-bold dark:text-white">Nueva Estrategia</p>
              <p className="text-xs text-slate-500">Redactar plan de acción</p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Plus size={18} />
            </div>
          </button>
          <button 
            onClick={() => navigate('/ampelier')}
            className="group flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 transition-all text-left"
          >
            <div>
              <p className="font-bold dark:text-white">Hablar con Ampelier</p>
              <p className="text-xs text-slate-500">Consultoría de negocio IA</p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Bot size={18} />
            </div>
          </button>
          <button 
            onClick={() => navigate('/vault')}
            className="group flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 transition-all text-left"
          >
            <div>
              <p className="font-bold dark:text-white">Bóveda de Recursos</p>
              <p className="text-xs text-slate-500">Librería de conocimiento</p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Library size={18} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
