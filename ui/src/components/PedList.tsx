import React, { useState } from 'react';
import { PedData } from '../types';
import { Search, Navigation, Edit2, Trash2, Tag, Play, Radio } from 'lucide-react';

interface PedListProps {
  peds: PedData[];
  onEdit: (ped: PedData) => void;
  onDelete: (id: number) => void;
  onTeleport: (ped: PedData) => void;
}

export const PedList: React.FC<PedListProps> = ({ peds, onEdit, onDelete, onTeleport }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPeds = peds.filter((ped) => {
    const term = searchTerm.toLowerCase();
    return (
      ped.title.toLowerCase().includes(term) ||
      ped.model.toLowerCase().includes(term) ||
      (ped.id && ped.id.toString().includes(term)) ||
      (ped.scenario && ped.scenario.toLowerCase().includes(term)) ||
      (ped.interaction_label && ped.interaction_label.toLowerCase().includes(term))
    );
  });

  return (
    <div className="flex-1 flex flex-col p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#a7aaa5]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, title, model, scenario..."
            className="w-full pl-9 pr-4 py-1.5 bg-[#161917] border border-white/10 rounded-xl text-xs text-[#f7f7f5] placeholder-[#a7aaa5]/60 focus:outline-none focus:border-[#b8ff65]/60 transition-colors"
          />
        </div>
        <div className="text-[11px] text-[#a7aaa5]">
          Peds Registered: <span className="font-mono font-bold text-[#b8ff65]">{filteredPeds.length}</span>
        </div>
      </div>

      {filteredPeds.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl p-10 text-center bg-[#161917]/40">
          <Tag className="w-10 h-10 text-[#a7aaa5]/40 mb-2" />
          <h3 className="text-xs font-semibold text-[#f7f7f5]">No Peds Configured</h3>
          <p className="text-[11px] text-[#a7aaa5] mt-1 max-w-xs">
            {searchTerm ? 'No peds match your query.' : 'Click "Create Ped" above to add your first in-world static ped.'}
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
          {filteredPeds.map((ped) => (
            <div
              key={ped.id}
              className="flex items-center justify-between p-3.5 bg-[#161917] border border-white/10 hover:border-white/20 rounded-xl transition-all duration-150"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#0d0f0e] border border-white/10 flex items-center justify-center text-[#b8ff65] font-mono font-bold text-xs">
                  #{ped.id}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xs font-bold text-[#f7f7f5]">{ped.title}</h3>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#0d0f0e] text-[#b8ff65] border border-[#b8ff65]/20">
                      {ped.model}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 mt-1 text-[11px] text-[#a7aaa5]">
                    <span className="flex items-center space-x-1">
                      <Play className="w-3 h-3 text-[#b8ff65]" />
                      <span>{ped.scenario || ped.anim_name || 'Idle Stand'}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Radio className="w-3 h-3 text-slate-400" />
                      <span>{ped.interaction_type !== 'none' ? ped.interaction_label : 'No Target'}</span>
                    </span>
                    <span className="font-mono text-[10px] text-[#a7aaa5]/80">
                      [{ped.x.toFixed(1)}, {ped.y.toFixed(1)}, {ped.z.toFixed(1)}]
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => onTeleport(ped)}
                  title="Teleport to Ped"
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-[#f7f7f5] flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3 h-3 text-[#b8ff65]" />
                  <span>TP</span>
                </button>
                <button
                  onClick={() => onEdit(ped)}
                  title="Edit Ped"
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-[#f7f7f5] flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3 h-3 text-amber-300" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => ped.id && onDelete(ped.id)}
                  title="Delete Ped"
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-[11px] font-semibold text-red-400 flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
