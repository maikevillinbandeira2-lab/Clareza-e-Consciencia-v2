import { ComponentType, SVGProps } from 'react';

export enum Frequency {
  DIARIO = 'Diário',
  SEMANAL = 'Semanal',
  MENSAL = 'Mensal',
}

export interface Activity {
  id: string;
  name: string;
  frequency: Frequency;
  target?: number; // Ex: 3 vezes por semana
}

export interface Category {
  id: string;
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  activities: Activity[];
  color: string;
  description?: string;
  examples?: string[];
}

export type CheckedState = {
  [activityId: string]: string[];
};

// Types for the new Vision Board feature (Mood Board style)
export interface VisionBoardItem {
  id:string;
  src: string; // Base64 image data url
  x: number; // position from left in pixels
  y: number; // position from top in pixels
  width: number; // width in pixels
  height: number; // height in pixels
  rotation: number; // rotation in degrees
  zIndex: number; // stacking order
}

export type VisionBoardState = VisionBoardItem[];


// Types for the new Calendar feature
export type CalendarEventType = 'image' | 'audio' | 'link' | 'note';

export interface CalendarEventItem {
  id: string;
  type: CalendarEventType;
  content: string; // Base64 for image/audio, URL for link, Text for note
  title?: string; // For links, audio file names, or note titles
}

export type CalendarState = {
  [dateKey: string]: CalendarEventItem[]; // Key is 'YYYY-MM-DD'
};

// Types for Conquistas feature
export type ConquistaAttachment = CalendarEventItem;
export type StarImportance = 1 | 2 | 3;

export interface ConquistaEntry {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  attachments: ConquistaAttachment[];
  color: string;
  importance?: StarImportance;
}

export type ConquistasState = ConquistaEntry[];

// Types for Mantras feature
export interface MantraEntry {
  id: string;
  text: string;
  color: string;
}

export type MantrasState = MantraEntry[];

// Types for Metas feature
export interface MetaEntry {
  id: string;
  text: string;
  color: string;
  importance?: StarImportance;
}
export type MetasState = MetaEntry[];


// Types for the new Mystical View
export interface MoonPhase {
    name: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    emoji: string;
}

// Types for Mood Tracker
export type MoodLevel = 1 | 2 | 3 | 4 | 5;
export type Period = 'morning' | 'afternoon' | 'night';

export interface PeriodMood {
  level: MoodLevel;
}

export interface MoodEntry {
  morning?: PeriodMood;
  afternoon?: PeriodMood;
  night?: PeriodMood;
}

export type MoodState = {
  [dateKey: string]: MoodEntry; // Key is 'YYYY-MM-DD'
};

// Types for Sleep Tracker
export type SleepType = 'uninterrupted' | 'interrupted' | 'difficult' | 'sleepless';
export type DreamQualityLevel = 1 | 2 | 3 | 4 | 5;

export interface DreamEntry {
  hadDream: boolean;
  dreamQuality?: DreamQualityLevel;
}

export interface SleepEntry {
  type: SleepType;
  dream?: DreamEntry;
}

export type SleepState = {
  [dateKey: string]: SleepEntry; // Key is 'YYYY-MM-DD'
};