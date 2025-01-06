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

export interface VideoData {
  id: number;
  script: Record<string, unknown>;
  audioFileUrl: string;
  captions: Record<string, unknown>;
  imageLists?: string[];
  createdBy: string;
}

// [
//   videoScripts: []
//   audioFileUrl: 'blabla'
//   caption: 'blabla'
//   imageLists: ['blabla', 'blabla'];
// ]
