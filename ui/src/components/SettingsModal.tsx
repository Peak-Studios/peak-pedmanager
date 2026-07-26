import React, { useState } from 'react';
import { PedData } from '../types';
import { Download, Upload, FileCode, CheckCircle, Info } from 'lucide-react';

interface SettingsModalProps {
  peds: PedData[];
  onImport: (importedPeds: PedData[]) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ peds, onImport }) => {
  const [importJson, setImportJson] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(peds, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'peak_peds_config.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportSubmit = () => {
    try {
      setErrorMsg('');
      const parsed = JSON.parse(importJson);
      if (!Array.isArray(parsed)) {
        throw new Error('Imported data must be a JSON array of ped objects.');
      }
      onImport(parsed);
      setImportSuccess(true);
      setTimeout(() => setImportSuccess(false), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid JSON format.');
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto space-y-5">
      <div className="bg-[#161917] p-5 rounded-xl border border-white/10 space-y-3">
        <h3 className="text-xs font-bold text-[#f7f7f5] flex items-center space-x-2 uppercase tracking-wider">
          <Download className="w-4 h-4 text-[#b8ff65]" />
          <span>Export Configuration</span>
        </h3>
        <p className="text-[11px] text-[#a7aaa5]">
          Download all currently configured static peds as a JSON backup to share or migrate to another server.
        </p>
        <button
          onClick={handleExport}
          className="px-3.5 py-1.5 bg-[#b8ff65] hover:bg-[#a3f547] text-xs font-bold text-[#0d0f0e] rounded-lg flex items-center space-x-2 cursor-pointer transition-colors"
        >
          <FileCode className="w-4 h-4" />
          <span>Download peak_peds_config.json ({peds.length} items)</span>
        </button>
      </div>

      <div className="bg-[#161917] p-5 rounded-xl border border-white/10 space-y-3">
        <h3 className="text-xs font-bold text-[#f7f7f5] flex items-center space-x-2 uppercase tracking-wider">
          <Upload className="w-4 h-4 text-[#b8ff65]" />
          <span>Import Configuration</span>
        </h3>
        <p className="text-[11px] text-[#a7aaa5]">Paste JSON array of ped configurations below to bulk import.</p>
        <textarea
          value={importJson}
          onChange={(e) => setImportJson(e.target.value)}
          rows={4}
          placeholder='[{"title":"Bank Security","model":"s_m_y_cop_01","x":150.2,"y":-1040.5,"z":29.3,"h":180.0}]'
          className="w-full p-3 bg-[#0d0f0e] border border-white/10 rounded-lg text-xs font-mono text-[#f7f7f5] focus:outline-none focus:border-[#b8ff65]"
        />
        {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
        {importSuccess && (
          <p className="text-xs text-[#b8ff65] flex items-center space-x-1 font-mono">
            <CheckCircle className="w-4 h-4" />
            <span>Peds imported successfully!</span>
          </p>
        )}
        <button
          onClick={handleImportSubmit}
          disabled={!importJson.trim()}
          className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 disabled:opacity-50 text-xs font-bold text-[#f7f7f5] border border-white/15 rounded-lg flex items-center space-x-2 cursor-pointer transition-colors"
        >
          <Upload className="w-4 h-4 text-[#b8ff65]" />
          <span>Import Peds</span>
        </button>
      </div>

      <div className="bg-[#161917]/50 p-4 rounded-xl border border-white/10 flex items-center space-x-3">
        <Info className="w-4 h-4 text-[#a7aaa5] flex-shrink-0" />
        <div className="text-[11px] text-[#a7aaa5]">
          <p className="font-semibold text-[#f7f7f5]">Peak Ped Manager v1.0.0 — Peak Studios</p>
          <p className="mt-0.5">Standalone FiveM resource with oxmysql, ox_target, qb-target, ESX, QBCore support.</p>
        </div>
      </div>
    </div>
  );
};
