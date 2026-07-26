import React, { useState } from 'react';
import { ScenarioItem, AnimationItem } from '../types';
import { Clapperboard, Film, Search, Check } from 'lucide-react';

interface ScenarioLibraryProps {
  scenarios: ScenarioItem[];
  animations: AnimationItem[];
  onSelectScenario: (scenarioId: string) => void;
}

export const ScenarioLibrary: React.FC<ScenarioLibraryProps> = ({
  scenarios,
  animations,
  onSelectScenario,
}) => {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'animations'>('scenarios');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredScenarios = scenarios.filter(
    (s) => s.label.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAnimations = animations.filter(
    (a) => a.label.toLowerCase().includes(search.toLowerCase()) || a.dict.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col p-6 overflow-hidden space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5 bg-[#161917] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all ${
              activeTab === 'scenarios' ? 'bg-[#b8ff65] text-[#0d0f0e] font-bold' : 'text-[#a7aaa5] hover:text-[#f7f7f5]'
            }`}
          >
            <Clapperboard className="w-3.5 h-3.5" />
            <span>GTAV Scenarios ({scenarios.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('animations')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all ${
              activeTab === 'animations' ? 'bg-[#b8ff65] text-[#0d0f0e] font-bold' : 'text-[#a7aaa5] hover:text-[#f7f7f5]'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Animations Catalog ({animations.length})</span>
          </button>
        </div>

        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#a7aaa5]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter presets..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#161917] border border-white/10 rounded-xl text-xs text-[#f7f7f5] placeholder-[#a7aaa5]/60 focus:outline-none focus:border-[#b8ff65]"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {activeTab === 'scenarios'
          ? filteredScenarios.map((sc) => (
              <div
                key={sc.id}
                onClick={() => {
                  setSelectedId(sc.id);
                  onSelectScenario(sc.id);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedId === sc.id
                    ? 'bg-[#161917] border-[#b8ff65] text-[#f7f7f5]'
                    : 'bg-[#161917]/70 border-white/10 hover:border-white/20 text-[#a7aaa5]'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-[#f7f7f5]">{sc.label}</h4>
                  <p className="text-[10px] font-mono text-[#a7aaa5] mt-0.5">{sc.id}</p>
                  <span className="inline-block mt-1.5 text-[9px] uppercase px-2 py-0.5 rounded bg-[#0d0f0e] text-[#b8ff65] border border-[#b8ff65]/20 font-mono">
                    {sc.category}
                  </span>
                </div>
                {selectedId === sc.id && <Check className="w-4 h-4 text-[#b8ff65]" />}
              </div>
            ))
          : filteredAnimations.map((anim, idx) => (
              <div
                key={idx}
                onClick={() => {
                  const key = `${anim.dict}:${anim.anim}`;
                  setSelectedId(key);
                  onSelectScenario(anim.dict);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedId === `${anim.dict}:${anim.anim}`
                    ? 'bg-[#161917] border-[#b8ff65] text-[#f7f7f5]'
                    : 'bg-[#161917]/70 border-white/10 hover:border-white/20 text-[#a7aaa5]'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-[#f7f7f5]">{anim.label}</h4>
                  <p className="text-[10px] font-mono text-[#a7aaa5] mt-0.5">{anim.dict}</p>
                  <p className="text-[10px] font-mono text-[#b8ff65]">{anim.anim}</p>
                </div>
                {selectedId === `${anim.dict}:${anim.anim}` && <Check className="w-4 h-4 text-[#b8ff65]" />}
              </div>
            ))}
      </div>
    </div>
  );
};
