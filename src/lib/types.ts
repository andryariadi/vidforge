export interface VideoScriptData {
  contentText: string;
  imagePrompt: string;
}

export interface VideoDataStore {
  videoScripts?: VideoScriptData[];
  audioFileUrl?: string;
  caption?: string;
  imageLists?: string[];
}

export type Caption = {
  text: string;
  start: number; // in milliseconds
  end: number; // in milliseconds
  confidence: number;
  speaker: string;
};

export interface VideoData {
  id: number;
  script: Record<string, unknown>;
  audioFileUrl: string;
  captions: Caption[];
  imageLists?: string[];
  createdBy: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  imageUrl?: string | null;
  subscription: boolean;
  credits: number;
}
