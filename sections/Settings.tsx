
import React from 'react';
import { AppState } from '../types';
import { Settings as SettingsIcon, Coffee, Heart, ShieldCheck, Key, CreditCard, ExternalLink } from 'lucide-react';

interface Props {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  t: any;
}

const Settings: React.FC<Props> = ({ state, updateState, t }) => {
  const donateUrl = "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=proyectosduvi@gmail.com&item_name=Support+Growth+Partner+OS&currency_code=USD";

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold dark:text-white flex items-center gap-3">
          <SettingsIcon className="text-emerald-500" />
          {t.settings}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Configura tu entorno de alto rendimiento.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* API Key Config */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Key className="text-emerald-500" size={20} />
            </div>
            <h2 className="text-xl font-bold dark:text-white">{t.configKey}</h2>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            Ampelier requiere una llave de acceso (Gemini API Key) de Google AI Studio para procesar tus estrategias.
          </p>
          <div className="space-y-2">
            <input 
              type="password"
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 focus:ring-2 ring-emerald-500 outline-none dark:text-white transition-all shadow-inner"
              placeholder="Introducir API Key..."
              value={state.apiKey || ''}
              onChange={(e) => updateState({ apiKey: e.target.value })}
            />
            <div className="flex items-center gap-2 text-[10px] text-slate-400 px-2 uppercase tracking-widest font-bold">
              <ShieldCheck size={12} className="text-emerald-500" />
              Encriptación Local Activa
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-700 p-8 rounded-3xl text-white shadow-xl shadow-amber-500/20 relative overflow-hidden group">
          <Coffee className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
          <div className="relative z-10 space-y-6">
            <div className="flex items-start justify-between">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm border border-white/20">
                <Coffee size={24} />
              </div>
              <div className="flex -space-x-2">
                <Heart size={20} className="text-white fill-white animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black mb-2 tracking-tight">{t.supportDev}</h2>
              <p className="text-amber-50 text-sm leading-relaxed opacity-90">
                {t.supportDesc}
              </p>
            </div>
            <a 
              href={donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-white text-amber-700 py-4 rounded-2xl font-bold hover:bg-amber-50 transition-all transform active:scale-95 shadow-lg group"
            >
              <CreditCard size={20} />
              {t.donateBtn}
              <ExternalLink size={14} className="opacity-50 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Credits inside Settings */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-4">
        <div className="text-center space-y-1">
          <p className="text-xs text-slate-400 uppercase tracking-[0.3em] font-bold">Growth Partner OS DUVI</p>
          <p className="text-[10px] text-slate-500 opacity-60">System Version 3.0.4-Stable • {t.rights}</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
