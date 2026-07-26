export interface PedData {
  id?: number;
  title: string;
  model: string;
  x: number;
  y: number;
  z: number;
  h: number;
  scenario?: string;
  anim_dict?: string;
  anim_name?: string;
  prop_model?: string;
  prop_bone?: number;
  freeze: boolean;
  invincible: boolean;
  block_events: boolean;
  collision: boolean;
  interaction_type: 'none' | 'client_event' | 'server_event' | 'command' | 'dialogue';
  interaction_label: string;
  interaction_icon: string;
  interaction_payload?: string | Record<string, any>;
}

export interface ScenarioItem {
  id: string;
  label: string;
  category: string;
}

export interface AnimationItem {
  dict: string;
  anim: string;
  label: string;
  category: string;
}

export interface PropItem {
  model: string;
  bone: number;
  label: string;
}
