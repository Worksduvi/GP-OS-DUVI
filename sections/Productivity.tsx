
import React, { useState, useRef } from 'react';
import { AppState, StickyNote } from '../types';
import { Plus, Trash2, Download, Upload, Save, MoreHorizontal } from 'lucide-react';

interface Props {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  t: any;
}

const Productivity: React.FC<Props> = ({ state, updateState, t }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colors = [
    'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200',
    'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200',
    'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200',
    'bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700 text-purple-800 dark:text-purple-200',
    'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200'
  ];

  const addNote = () => {
    const newNote: StickyNote = {
      id: Date.now().toString(),
      content: '',
      color: colors[Math.floor(Math.random() * colors.length)],
      x: 0,
      y: 0
    };
    updateState({ notes: [newNote, ...state.notes] });
  };

  const updateNote = (id: string, content: string) => {
    updateState({ 
      notes: state.notes.map(n => n.id === id ? { ...n, content } : n) 
    });
  };

  const deleteNote = (id: string) => {
    updateState({ notes: state.notes.filter(n => n.id !== id) });
  };

  const exportBrain = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `GP_OS_DigitalBrain_${new Date().toISOString().slice(0,10)}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        try {
          const content = JSON.parse(e.target?.result as string);
          updateState(content);
          alert('Digital Brain cargado con éxito.');
        } catch (err) {
          alert('Error al importar el archivo JSON.');
        }
      };
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">{t.productivity}</h1>
          <p className="text-slate-500">Libera espacio en tu mente, guárdalo aquí.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={exportBrain}
            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white px-4 py-2.5 rounded-xl transition-all font-medium border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <Download size={18} />
            {t.exportBrain}
          </button>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white px-4 py-2.5 rounded-xl transition-all font-medium border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <Upload size={18} />
            {t.importBrain}
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImport} 
            className="hidden" 
            accept=".json"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 bg-slate-200/50 dark:bg-slate-900/50 rounded-[2.5rem] border-4 border-white dark:border-slate-800 min-h-[500px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <button 
            onClick={addNote}
            className="h-64 border-4 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-emerald-500 hover:border-emerald-500 hover:bg-emerald-500/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus size={24} />
            </div>
            <span className="font-bold uppercase tracking-widest text-xs">Nueva Nota</span>
          </button>

          {state.notes.map((note) => (
            <div 
              key={note.id}
              className={`h-64 flex flex-col p-6 rounded-3xl border-b-4 shadow-lg transition-transform hover:-rotate-1 ${note.color}`}
            >
              <div className="flex items-center justify-between mb-3">
                <MoreHorizontal size={18} className="opacity-40" />
                <button 
                  onClick={() => deleteNote(note.id)}
                  className="p-1.5 hover:bg-black/10 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <textarea 
                className="flex-1 bg-transparent border-none outline-none resize-none font-medium placeholder:text-current placeholder:opacity-40 leading-relaxed text-sm"
                placeholder="Escribe algo brillante..."
                value={note.content}
                onChange={(e) => updateNote(note.id, e.target.value)}
              />
              <div className="flex items-center justify-end pt-2 opacity-50">
                <Save size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Productivity;
