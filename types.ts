
export enum Language {
  ES = 'es',
  US = 'en',
  CN = 'zh',
  IN = 'hi',
  RU = 'ru',
  MY = 'ms',
  JP = 'ja',
  PH = 'tl'
}

export interface Resource {
  id: string;
  title: string;
  type: 'PDF' | 'Video' | 'Link';
  url: string;
  description: string;
}

export interface StrategyFile {
  id: string;
  name: string;
  content: string;
  language: string;
}

export interface StickyNote {
  id: string;
  content: string;
  color: string;
  x: number;
  y: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface AppState {
  language: Language;
  theme: 'light' | 'dark';
  resources: Resource[];
  strategyFiles: StrategyFile[];
  notes: StickyNote[];
  aiProvider: 'gemini' | 'openai';
  apiKey?: string;
}
