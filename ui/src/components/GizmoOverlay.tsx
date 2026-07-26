import React from 'react';
import { PedData } from '../types';
import { Check, X, RotateCw, ArrowUp, ArrowDown, Move } from 'lucide-react';

interface GizmoOverlayProps {
  pedData: PedData;
  coords: { x: number; y: number; z: number; h: number };
  onChangeCoords: (newCoords: { x: number; y: number; z: number; h: number }) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export const GizmoOverlay: React.FC<GizmoOverlayProps> = ({
  pedData,
  coords,
  onChangeCoords,
  onConfirm,
  onCancel,
}) => {
  const handleSliderChange = (axis: 'x' | 'y' | 'z' | 'h', delta: number) => {
    onChangeCoords({
      ...coords,
      [axis]: coords[axis] + delta,
    });
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xl bg-[#0d0f0e] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-4 z-50 pointer-events-auto">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div className="flex items-center space-x-2.5">
          <Move className="w-4 h-4 text-[#b8ff65] animate-pulse" />
          <div>
            <h3 className="text-xs font-bold text-[#f7f7f5] uppercase tracking-wider">Live 3D Placement & Alignment</h3>
            <p className="text-[10px] text-[#a7aaa5] font-mono">Model: {pedData.model}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onCancel}
            className="px-3 py-1.2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#a7aaa5] hover:text-[#f7f7f5] flex items-center space-x-1 cursor-pointer transition-colors"
          >
            <X className="w-3.5 h-3.5 text-red-400" />
            <span>Cancel</span>
          </button>
          <button
            onClick={onConfirm}
            className="px-3.5 py-1.2 rounded-lg bg-[#b8ff65] hover:bg-[#a3f547] text-xs font-bold text-[#0d0f0e] flex items-center space-x-1 cursor-pointer transition-colors shadow-sm"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Confirm Placement</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        {/* Fine Adjust X & Y */}
        <div className="bg-[#161917] p-2.5 rounded-xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[#a7aaa5]">
            <span>X / Y Shift</span>
            <span className="font-mono text-[#f7f7f5] text-[10px]">
              X: {coords.x.toFixed(2)} | Y: {coords.y.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => handleSliderChange('x', -0.1)}
              className="flex-1 py-1 bg-[#0d0f0e] hover:bg-white/10 border border-white/10 rounded text-[10px] font-mono text-[#f7f7f5]"
            >
              X -0.1
            </button>
            <button
              onClick={() => handleSliderChange('x', 0.1)}
              className="flex-1 py-1 bg-[#0d0f0e] hover:bg-white/10 border border-white/10 rounded text-[10px] font-mono text-[#f7f7f5]"
            >
              X +0.1
            </button>
            <button
              onClick={() => handleSliderChange('y', -0.1)}
              className="flex-1 py-1 bg-[#0d0f0e] hover:bg-white/10 border border-white/10 rounded text-[10px] font-mono text-[#f7f7f5]"
            >
              Y -0.1
            </button>
            <button
              onClick={() => handleSliderChange('y', 0.1)}
              className="flex-1 py-1 bg-[#0d0f0e] hover:bg-white/10 border border-white/10 rounded text-[10px] font-mono text-[#f7f7f5]"
            >
              Y +0.1
            </button>
          </div>
        </div>

        {/* Height Z & Heading H */}
        <div className="bg-[#161917] p-2.5 rounded-xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[#a7aaa5]">
            <span className="flex items-center space-x-1">
              <RotateCw className="w-3 h-3 text-[#b8ff65]" />
              <span>Heading & Z</span>
            </span>
            <span className="font-mono text-[#f7f7f5] text-[10px]">
              Z: {coords.z.toFixed(2)} | H: {coords.h.toFixed(1)}°
            </span>
          </div>
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => handleSliderChange('z', -0.05)}
              className="px-2 py-1 bg-[#0d0f0e] hover:bg-white/10 border border-white/10 rounded text-[10px] font-mono text-[#f7f7f5] flex items-center space-x-0.5"
            >
              <ArrowDown className="w-3 h-3" />
              <span>Z -0.05</span>
            </button>
            <button
              onClick={() => handleSliderChange('z', 0.05)}
              className="px-2 py-1 bg-[#0d0f0e] hover:bg-white/10 border border-white/10 rounded text-[10px] font-mono text-[#f7f7f5] flex items-center space-x-0.5"
            >
              <ArrowUp className="w-3 h-3" />
              <span>Z +0.05</span>
            </button>
            <input
              type="range"
              min="0"
              max="360"
              value={coords.h}
              onChange={(e) => onChangeCoords({ ...coords, h: parseFloat(e.target.value) })}
              className="flex-1 h-1.5 bg-[#0d0f0e] rounded-lg appearance-none cursor-pointer accent-[#b8ff65]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
