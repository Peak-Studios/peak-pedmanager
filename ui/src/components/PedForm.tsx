import React, { useState } from 'react';
import { PedData, ScenarioItem, AnimationItem, PropItem } from '../types';
import { Save, MapPin, Eye, Box, Shield, MessageSquare, Play, Sparkles } from 'lucide-react';

interface PedFormProps {
  initialData?: PedData | null;
  scenarios: ScenarioItem[];
  animations: AnimationItem[];
  propsList: PropItem[];
  pedModels: Record<string, string[]>;
  onSave: (ped: PedData) => void;
  onStartPlacement: (ped: PedData) => void;
  onCancel: () => void;
}

export const PedForm: React.FC<PedFormProps> = ({
  initialData,
  scenarios,
  animations,
  propsList,
  pedModels,
  onSave,
  onStartPlacement,
  onCancel,
}) => {
  const [formData, setFormData] = useState<PedData>(
    initialData || {
      title: 'New Static Ped',
      model: 'a_m_y_business_01',
      x: 0.0,
      y: 0.0,
      z: 0.0,
      h: 0.0,
      scenario: 'WORLD_HUMAN_CLIPBOARD',
      anim_dict: '',
      anim_name: '',
      prop_model: '',
      prop_bone: 60309,
      freeze: true,
      invincible: true,
      block_events: true,
      collision: true,
      interaction_type: 'client_event',
      interaction_label: 'Talk to NPC',
      interaction_icon: 'fas fa-comments',
      interaction_payload: '{"event":"qb-clothing:client:openMenu"}',
    }
  );

  const handleChange = (field: keyof PedData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-6 overflow-y-auto space-y-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h2 className="text-sm font-bold text-[#f7f7f5] flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#b8ff65]" />
            <span>{formData.id ? `Edit Ped #${formData.id}` : 'Create New Static Ped'}</span>
          </h2>
          <p className="text-[11px] text-[#a7aaa5]">Configure ped model, animation, interaction target, and placement</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => onStartPlacement(formData)}
            className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-[#f7f7f5] flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#b8ff65]" />
            <span>Live 3D Placement</span>
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 rounded-lg bg-[#b8ff65] hover:bg-[#a3f547] text-xs font-bold text-[#0d0f0e] flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Ped</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Settings */}
        <div className="space-y-3.5 bg-[#161917] p-4 rounded-xl border border-white/10">
          <h3 className="text-[11px] font-bold text-[#f7f7f5] uppercase tracking-wider flex items-center space-x-2">
            <Box className="w-3.5 h-3.5 text-[#b8ff65]" />
            <span>General Info</span>
          </h3>

          <div>
            <label className="block text-[11px] font-medium text-[#a7aaa5] mb-1">Ped Label / Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-1.5 bg-[#0d0f0e] border border-white/10 rounded-lg text-xs text-[#f7f7f5] focus:outline-none focus:border-[#b8ff65]"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#a7aaa5] mb-1">Ped Model Name</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => handleChange('model', e.target.value)}
              placeholder="e.g. a_m_y_business_01"
              className="w-full px-3 py-1.5 bg-[#0d0f0e] border border-white/10 rounded-lg text-xs text-[#f7f7f5] focus:outline-none focus:border-[#b8ff65]"
              required
            />
          </div>
        </div>

        {/* Location & Coordinates */}
        <div className="space-y-3.5 bg-[#161917] p-4 rounded-xl border border-white/10">
          <h3 className="text-[11px] font-bold text-[#f7f7f5] uppercase tracking-wider flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-[#b8ff65]" />
            <span>Coordinates & Heading</span>
          </h3>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[10px] text-[#a7aaa5]">Position X</label>
              <input
                type="number"
                step="0.01"
                value={formData.x}
                onChange={(e) => handleChange('x', parseFloat(e.target.value) || 0)}
                className="w-full px-2.5 py-1.5 bg-[#0d0f0e] border border-white/10 rounded-lg text-xs text-[#f7f7f5] font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#a7aaa5]">Position Y</label>
              <input
                type="number"
                step="0.01"
                value={formData.y}
                onChange={(e) => handleChange('y', parseFloat(e.target.value) || 0)}
                className="w-full px-2.5 py-1.5 bg-[#0d0f0e] border border-white/10 rounded-lg text-xs text-[#f7f7f5] font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#a7aaa5]">Position Z</label>
              <input
                type="number"
                step="0.01"
                value={formData.z}
                onChange={(e) => handleChange('z', parseFloat(e.target.value) || 0)}
                className="w-full px-2.5 py-1.5 bg-[#0d0f0e] border border-white/10 rounded-lg text-xs text-[#f7f7f5] font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#a7aaa5]">Heading (H)</label>
              <input
                type="number"
                step="0.1"
                value={formData.h}
                onChange={(e) => handleChange('h', parseFloat(e.target.value) || 0)}
                className="w-full px-2.5 py-1.5 bg-[#0d0f0e] border border-white/10 rounded-lg text-xs text-[#f7f7f5] font-mono"
              />
            </div>
          </div>
        </div>

        {/* Animation & Scenario */}
        <div className="space-y-3.5 bg-[#161917] p-4 rounded-xl border border-white/10">
          <h3 className="text-[11px] font-bold text-[#f7f7f5] uppercase tracking-wider flex items-center space-x-2">
            <Play className="w-3.5 h-3.5 text-[#b8ff65]" />
            <span>Scenario & Animation</span>
          </h3>

          <div>
            <label className="block text-[11px] font-medium text-[#a7aaa5] mb-1">Scenario Preset</label>
            <select
              value={formData.scenario || ''}
              onChange={(e) => handleChange('scenario', e.target.value)}
              className="w-full px-3 py-1.5 bg-[#0d0f0e] border border-white/10 rounded-lg text-xs text-[#f7f7f5] focus:outline-none focus:border-[#b8ff65]"
            >
              <option value="">None / Custom Animation</option>
              {scenarios.map((sc) => (
                <option key={sc.id} value={sc.id}>
                  {sc.label} ({sc.id})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[10px] text-[#a7aaa5]">Anim Dict</label>
              <input
                type="text"
                value={formData.anim_dict || ''}
                onChange={(e) => handleChange('anim_dict', e.target.value)}
                placeholder="Dictionary"
                className="w-full px-2.5 py-1.5 bg-[#0d0f0e] border border-white/10 rounded-lg text-xs text-[#f7f7f5]"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#a7aaa5]">Anim Name</label>
              <input
                type="text"
                value={formData.anim_name || ''}
                onChange={(e) => handleChange('anim_name', e.target.value)}
                placeholder="Name"
                className="w-full px-2.5 py-1.5 bg-[#0d0f0e] border border-white/10 rounded-lg text-xs text-[#f7f7f5]"
              />
            </div>
          </div>
        </div>

        {/* Interaction Target */}
        <div className="space-y-3.5 bg-[#161917] p-4 rounded-xl border border-white/10">
          <h3 className="text-[11px] font-bold text-[#f7f7f5] uppercase tracking-wider flex items-center space-x-2">
            <MessageSquare className="w-3.5 h-3.5 text-[#b8ff65]" />
            <span>Target Interaction</span>
          </h3>

          <div>
            <label className="block text-[11px] font-medium text-[#a7aaa5] mb-1">Action Type</label>
            <select
              value={formData.interaction_type}
              onChange={(e) => handleChange('interaction_type', e.target.value)}
              className="w-full px-3 py-1.5 bg-[#0d0f0e] border border-white/10 rounded-lg text-xs text-[#f7f7f5]"
            >
              <option value="none">None (Static Decor)</option>
              <option value="client_event">Client Event</option>
              <option value="server_event">Server Event</option>
              <option value="command">Command</option>
              <option value="dialogue">Dialogue / Notification</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[10px] text-[#a7aaa5]">Target Label</label>
              <input
                type="text"
                value={formData.interaction_label}
                onChange={(e) => handleChange('interaction_label', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-[#0d0f0e] border border-white/10 rounded-lg text-xs text-[#f7f7f5]"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#a7aaa5]">Icon Class</label>
              <input
                type="text"
                value={formData.interaction_icon}
                onChange={(e) => handleChange('interaction_icon', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-[#0d0f0e] border border-white/10 rounded-lg text-xs text-[#f7f7f5]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-[#a7aaa5]">Payload / Event / Text</label>
            <input
              type="text"
              value={typeof formData.interaction_payload === 'string' ? formData.interaction_payload : JSON.stringify(formData.interaction_payload)}
              onChange={(e) => handleChange('interaction_payload', e.target.value)}
              placeholder='e.g. {"event":"custom:trigger"}'
              className="w-full px-2.5 py-1.5 bg-[#0d0f0e] border border-white/10 rounded-lg text-xs text-[#f7f7f5] font-mono"
            />
          </div>
        </div>
      </div>

      {/* Checkboxes & Flags */}
      <div className="p-4 bg-[#161917] rounded-xl border border-white/10">
        <h3 className="text-[11px] font-bold text-[#f7f7f5] uppercase tracking-wider mb-2.5 flex items-center space-x-2">
          <Shield className="w-3.5 h-3.5 text-[#b8ff65]" />
          <span>Entity Flags & Behavior</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <label className="flex items-center space-x-2 text-xs text-[#f7f7f5] cursor-pointer">
            <input
              type="checkbox"
              checked={formData.freeze}
              onChange={(e) => handleChange('freeze', e.target.checked)}
              className="rounded bg-[#0d0f0e] border-white/20 text-[#b8ff65] focus:ring-0 accent-[#b8ff65]"
            />
            <span>Freeze Position</span>
          </label>

          <label className="flex items-center space-x-2 text-xs text-[#f7f7f5] cursor-pointer">
            <input
              type="checkbox"
              checked={formData.invincible}
              onChange={(e) => handleChange('invincible', e.target.checked)}
              className="rounded bg-[#0d0f0e] border-white/20 text-[#b8ff65] focus:ring-0 accent-[#b8ff65]"
            />
            <span>Invincible</span>
          </label>

          <label className="flex items-center space-x-2 text-xs text-[#f7f7f5] cursor-pointer">
            <input
              type="checkbox"
              checked={formData.block_events}
              onChange={(e) => handleChange('block_events', e.target.checked)}
              className="rounded bg-[#0d0f0e] border-white/20 text-[#b8ff65] focus:ring-0 accent-[#b8ff65]"
            />
            <span>Block Events</span>
          </label>

          <label className="flex items-center space-x-2 text-xs text-[#f7f7f5] cursor-pointer">
            <input
              type="checkbox"
              checked={formData.collision}
              onChange={(e) => handleChange('collision', e.target.checked)}
              className="rounded bg-[#0d0f0e] border-white/20 text-[#b8ff65] focus:ring-0 accent-[#b8ff65]"
            />
            <span>Enable Collision</span>
          </label>
        </div>
      </div>
    </form>
  );
};
