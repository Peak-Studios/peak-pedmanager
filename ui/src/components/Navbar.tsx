import React from 'react';
import { Users, PlusCircle, Clapperboard, Settings, X } from 'lucide-react';

interface NavbarProps {
  activeTab: 'list' | 'create' | 'scenarios' | 'settings';
  setActiveTab: (tab: 'list' | 'create' | 'scenarios' | 'settings') => void;
  onClose: () => void;
  pedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onClose, pedCount }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d0f0e]">
      <div className="flex items-center space-x-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#b8ff65] shadow-[0_0_10px_rgba(184,255,101,0.6)]" />
        <div>
          <h1 className="text-sm font-bold text-[#f7f7f5] tracking-tight uppercase">
            Peak Ped Manager
          </h1>
          <p className="text-[10px] text-[#a7aaa5] uppercase tracking-wider font-mono">In-World Spawner & Customizer</p>
        </div>
      </div>

      <nav className="flex items-center space-x-1.5 bg-[#161917] p-1 rounded-xl border border-white/10">
        <button
          onClick={() => setActiveTab('list')}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
            activeTab === 'list'
              ? 'bg-[#b8ff65] text-[#0d0f0e] shadow-sm font-bold'
              : 'text-[#a7aaa5] hover:text-[#f7f7f5] hover:bg-white/5'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Active Peds ({pedCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('create')}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
            activeTab === 'create'
              ? 'bg-[#b8ff65] text-[#0d0f0e] shadow-sm font-bold'
              : 'text-[#a7aaa5] hover:text-[#f7f7f5] hover:bg-white/5'
          }`}
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Create Ped</span>
        </button>

        <button
          onClick={() => setActiveTab('scenarios')}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
            activeTab === 'scenarios'
              ? 'bg-[#b8ff65] text-[#0d0f0e] shadow-sm font-bold'
              : 'text-[#a7aaa5] hover:text-[#f7f7f5] hover:bg-white/5'
          }`}
        >
          <Clapperboard className="w-3.5 h-3.5" />
          <span>Library</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
            activeTab === 'settings'
              ? 'bg-[#b8ff65] text-[#0d0f0e] shadow-sm font-bold'
              : 'text-[#a7aaa5] hover:text-[#f7f7f5] hover:bg-white/5'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Backup</span>
        </button>
      </nav>

      <button
        onClick={onClose}
        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 text-[#a7aaa5] hover:text-red-400 flex items-center justify-center transition-all cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </header>
  );
};
