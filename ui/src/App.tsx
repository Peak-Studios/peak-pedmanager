import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PedList } from './components/PedList';
import { PedForm } from './components/PedForm';
import { ScenarioLibrary } from './components/ScenarioLibrary';
import { SettingsModal } from './components/SettingsModal';
import { GizmoOverlay } from './components/GizmoOverlay';
import { PedData, ScenarioItem, AnimationItem, PropItem } from './types';
import { fetchNui } from './utils/nui';

export const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'create' | 'scenarios' | 'settings'>('list');
  const [peds, setPeds] = useState<PedData[]>([]);
  const [scenarios, setScenarios] = useState<ScenarioItem[]>([]);
  const [animations, setAnimations] = useState<AnimationItem[]>([]);
  const [propsList, setPropsList] = useState<PropItem[]>([]);
  const [pedModels, setPedModels] = useState<Record<string, string[]>>({});
  const [editingPed, setEditingPed] = useState<PedData | null>(null);

  // Placement Gizmo state
  const [isPlacing, setIsPlacing] = useState(false);
  const [placementPed, setPlacementPed] = useState<PedData | null>(null);
  const [placementCoords, setPlacementCoords] = useState({ x: 0, y: 0, z: 0, h: 0 });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || !data.action) return;

      if (data.action === 'open') {
        setVisible(true);
        if (data.scenarios) setScenarios(data.scenarios);
        if (data.animations) setAnimations(data.animations);
        if (data.props) setPropsList(data.props);
        if (data.pedModels) setPedModels(data.pedModels);
      } else if (data.action === 'close') {
        setVisible(false);
      } else if (data.action === 'updatePeds') {
        setPeds(data.peds || []);
      } else if (data.action === 'placementStarted') {
        setIsPlacing(true);
        if (data.coords) setPlacementCoords(data.coords);
      } else if (data.action === 'placementCancelled') {
        setIsPlacing(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleClose = () => {
    setVisible(false);
    fetchNui('closeUI');
  };

  const handleSavePed = (pedData: PedData) => {
    fetchNui('savePed', pedData);
    setEditingPed(null);
    setActiveTab('list');
  };

  const handleDeletePed = (id: number) => {
    fetchNui('deletePed', { id });
  };

  const handleTeleport = (ped: PedData) => {
    fetchNui('teleportPed', { id: ped.id, coords: { x: ped.x, y: ped.y, z: ped.z } });
  };

  const handleEdit = (ped: PedData) => {
    setEditingPed(ped);
    setActiveTab('create');
  };

  const handleStartPlacement = (pedData: PedData) => {
    setPlacementPed(pedData);
    fetchNui('startPlacementMode', pedData);
  };

  const handleUpdatePlacementCoords = (newCoords: { x: number; y: number; z: number; h: number }) => {
    setPlacementCoords(newCoords);
    fetchNui('updatePlacement', { model: placementPed?.model, coords: newCoords });
  };

  const handleConfirmPlacement = () => {
    if (placementPed) {
      const updatedPed = {
        ...placementPed,
        x: placementCoords.x,
        y: placementCoords.y,
        z: placementCoords.z,
        h: placementCoords.h,
      };
      fetchNui('confirmPlacement', updatedPed);
      setIsPlacing(false);
    }
  };

  const handleCancelPlacement = () => {
    fetchNui('cancelPlacement');
    setIsPlacing(false);
  };

  if (isPlacing && placementPed) {
    return (
      <GizmoOverlay
        pedData={placementPed}
        coords={placementCoords}
        onChangeCoords={handleUpdatePlacementCoords}
        onConfirm={handleConfirmPlacement}
        onCancel={handleCancelPlacement}
      />
    );
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center p-6 z-40">
      <div className="pointer-events-auto w-full max-w-4xl h-[80vh] bg-[#0d0f0e] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            if (tab === 'create' && activeTab !== 'create') setEditingPed(null);
            setActiveTab(tab);
          }}
          onClose={handleClose}
          pedCount={peds.length}
        />

        <main className="flex-1 flex overflow-hidden">
          {activeTab === 'list' && (
            <PedList peds={peds} onEdit={handleEdit} onDelete={handleDeletePed} onTeleport={handleTeleport} />
          )}

          {activeTab === 'create' && (
            <PedForm
              initialData={editingPed}
              scenarios={scenarios}
              animations={animations}
              propsList={propsList}
              pedModels={pedModels}
              onSave={handleSavePed}
              onStartPlacement={handleStartPlacement}
              onCancel={() => setActiveTab('list')}
            />
          )}

          {activeTab === 'scenarios' && (
            <ScenarioLibrary
              scenarios={scenarios}
              animations={animations}
              onSelectScenario={(scId) => {
                setEditingPed((prev) => (prev ? { ...prev, scenario: scId } : null));
              }}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsModal
              peds={peds}
              onImport={(imported) => {
                imported.forEach((p) => fetchNui('savePed', p));
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
};
