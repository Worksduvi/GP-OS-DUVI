
import React, { useState } from 'react';
import { AppState, Resource } from '../types';
import { FileText, Video, ExternalLink, Plus, Trash2, X } from 'lucide-react';

interface Props {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  t: any;
}

const Vault: React.FC<Props> = ({ state, updateState, t }) => {
  const [showModal, setShowModal] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    type: 'Link' as Resource['type'],
    url: '',
    description: ''
  });

  const handleAdd = () => {
    if (!newResource.title || !newResource.url) return;
    const resource: Resource = {
      id: Date.now().toString(),
      ...newResource
    };
    updateState({ resources: [...state.resources, resource] });
    setShowModal(false);
    setNewResource({ title: '', type: 'Link', url: '', description: '' });
  };

  const removeResource = (id: string) => {
    updateState({ resources: state.resources.filter(r => r.id !== id) });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="text-red-500" />;
      case 'Video': return <Video className="text-blue-500" />;
      default: return <ExternalLink className="text-emerald-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">{t.vault}</h1>
          <p className="text-slate-500">Recursos de alto valor para tu crecimiento.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl transition-colors font-medium"
        >
          <Plus size={20} />
          {t.addResource}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.resources.map((res) => (
          <div 
            key={res.id} 
            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                {getIcon(res.type)}
              </div>
              <div className="flex gap-2">
                <a 
                  href={res.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-emerald-500 bg-slate-50 dark:bg-slate-800 rounded-lg"
                >
                  <ExternalLink size={16} />
                </a>
                <button 
                  onClick={() => removeResource(res.id)}
                  className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 dark:bg-slate-800 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <h3 className="font-bold text-lg dark:text-white mb-2">{res.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">{res.description}</p>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
              {res.type}
            </span>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-8 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold dark:text-white">Añadir Recurso</h2>
              <button onClick={() => setShowModal(false)}><X /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Título</label>
                <input 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 focus:ring-2 ring-emerald-500 outline-none dark:text-white"
                  value={newResource.title}
                  onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Tipo</label>
                <select 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 focus:ring-2 ring-emerald-500 outline-none dark:text-white"
                  value={newResource.type}
                  onChange={(e) => setNewResource({...newResource, type: e.target.value as Resource['type']})}
                >
                  <option value="Link">Link</option>
                  <option value="Video">Video</option>
                  <option value="PDF">PDF</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">URL</label>
                <input 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 focus:ring-2 ring-emerald-500 outline-none dark:text-white"
                  value={newResource.url}
                  onChange={(e) => setNewResource({...newResource, url: e.target.value})}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Descripción</label>
                <textarea 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 focus:ring-2 ring-emerald-500 outline-none dark:text-white min-h-[100px]"
                  value={newResource.description}
                  onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                />
              </div>
              <button 
                onClick={handleAdd}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-colors mt-4"
              >
                Crear Recurso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vault;
