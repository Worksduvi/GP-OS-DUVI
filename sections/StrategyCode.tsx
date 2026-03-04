
import React, { useState } from 'react';
import { AppState, StrategyFile } from '../types';
import { FileCode, Plus, Save, Terminal as TerminalIcon, FileText, ChevronRight } from 'lucide-react';

interface Props {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  t: any;
}

const StrategyCode: React.FC<Props> = ({ state, updateState, t }) => {
  const [activeFileId, setActiveFileId] = useState(state.strategyFiles[0]?.id || '');
  const [logs, setLogs] = useState<string[]>(['[SYSTEM] Core Strategy Module Ready.', '[AUTH] High-Ticket encryption enabled.']);

  const activeFile = state.strategyFiles.find(f => f.id === activeFileId);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-10), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleContentChange = (content: string) => {
    const updatedFiles = state.strategyFiles.map(f => 
      f.id === activeFileId ? { ...f, content } : f
    );
    updateState({ strategyFiles: updatedFiles });
  };

  const saveFile = () => {
    addLog(`File ${activeFile?.name} saved successfully to local disk.`);
  };

  const createNewFile = () => {
    const name = prompt('Nombre del archivo (ej: Plan_Nuevo.md):');
    if (!name) return;
    const newFile: StrategyFile = {
      id: Date.now().toString(),
      name,
      content: '// Redacta tu estrategia aquí...',
      language: name.endsWith('.md') ? 'markdown' : 'text'
    };
    updateState({ strategyFiles: [...state.strategyFiles, newFile] });
    setActiveFileId(newFile.id);
    addLog(`New file created: ${name}`);
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] rounded-xl overflow-hidden border border-[#333] shadow-2xl">
      {/* VS Code-like Header */}
      <div className="h-9 bg-[#333333] flex items-center justify-between px-4 border-b border-black">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-[11px] text-[#cccccc] font-medium tracking-wide">
          Growth Partner OS - {activeFile?.name || 'Untitled'}
        </div>
        <div className="w-12" />
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* VS Code Sidebar */}
        <div className="w-48 bg-[#252526] border-r border-black flex flex-col">
          <div className="p-3 text-[11px] font-bold text-[#858585] uppercase tracking-wider flex items-center justify-between">
            {t.files}
            <button onClick={createNewFile} className="hover:text-white">
              <Plus size={14} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {state.strategyFiles.map(file => (
              <button
                key={file.id}
                onClick={() => setActiveFileId(file.id)}
                className={`w-full flex items-center gap-2 px-4 py-1.5 text-xs text-left transition-colors ${
                  activeFileId === file.id ? 'bg-[#37373d] text-white' : 'text-[#858585] hover:bg-[#2a2d2e] hover:text-[#cccccc]'
                }`}
              >
                {file.name.endsWith('.md') ? <FileText size={14} className="text-blue-400" /> : <FileCode size={14} className="text-emerald-400" />}
                <span className="truncate">{file.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e] relative">
          {/* Tabs */}
          <div className="h-9 bg-[#252526] flex overflow-x-auto border-b border-black">
            {activeFile && (
              <div className="px-4 h-full flex items-center bg-[#1e1e1e] border-t border-t-emerald-500 text-xs text-white gap-2">
                <FileCode size={14} className="text-emerald-400" />
                {activeFile.name}
              </div>
            )}
          </div>

          <div className="flex-1 flex relative overflow-hidden">
            {/* Line Numbers */}
            <div className="w-10 bg-[#1e1e1e] py-4 text-right pr-3 font-mono text-xs text-[#858585] select-none border-r border-[#333]">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            
            {/* Real Textarea */}
            <textarea
              className="flex-1 bg-transparent p-4 font-mono text-sm text-[#d4d4d4] outline-none resize-none leading-relaxed"
              value={activeFile?.content || ''}
              onChange={(e) => handleContentChange(e.target.value)}
              spellCheck={false}
            />

            {/* Float Action */}
            <button 
              onClick={saveFile}
              className="absolute bottom-6 right-6 bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-full shadow-lg transition-all active:scale-95"
            >
              <Save size={20} />
            </button>
          </div>

          {/* Terminal */}
          <div className="h-40 bg-[#1e1e1e] border-t border-[#333] flex flex-col">
            <div className="flex gap-4 px-4 h-9 items-center border-b border-[#333]">
              <button className="text-[11px] text-white border-b border-white pb-2.5 mt-2 flex items-center gap-1.5 uppercase font-bold tracking-tighter">
                <TerminalIcon size={12} /> {t.terminal}
              </button>
            </div>
            <div className="flex-1 p-3 font-mono text-xs text-[#cccccc] overflow-y-auto space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-emerald-500">➜</span>
                  <span>{log}</span>
                </div>
              ))}
              <div className="flex gap-2 animate-pulse">
                <span className="text-emerald-500">➜</span>
                <span className="w-2 h-4 bg-emerald-500"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VS Code Footer */}
      <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-[10px] font-medium">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <ChevronRight size={10} /> main*
          </div>
          <div className="flex items-center gap-1">
            UTF-8
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>Growth Script Mode</div>
          <div>Line {activeFile?.content.split('\n').length || 1}, Col 1</div>
        </div>
      </div>
    </div>
  );
};

export default StrategyCode;
