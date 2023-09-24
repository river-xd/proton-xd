import { Theme,Position,Size } from "./mod.ts";


export interface WindowAttributes {
  innerSize?: Size;
  minHeight?: number;
  maxHeight?: number;
  minWidth?: number;
  maxWidth?: number;
  resizable?: boolean;
  minimizable?: boolean;
  maximizable?: boolean;
  closable?: boolean;
  title?: string;
  maximized?: boolean;
  visible?: boolean;
  transparent?: boolean;
  decorations?: boolean;
  alwaysOnTop?: boolean;
  alwaysOnBottom?: boolean;
  theme?: Theme;
  focused?: boolean;
  contentProtection?: boolean;
  visibleOnAllWorkspaces?: boolean;
  windowIcon?: string;
  position?: Position;
}


export interface WebViewAttributes {
  userAgent?: string;
  visible?: boolean;
  transparent?: boolean;
  backgroundColor?: Rgba;
  zoomHotkeysEnabled?: boolean;
  initializationScripts?: string[];
  clipboard?: boolean;
  devtools?: boolean;
  acceptFirstMouse?: boolean;
  backForwardNavigationGestures?: boolean;
  incognito?: boolean;
  autoplay?: boolean;
  html?: string;
  url?: string|URL;
  headers?: Array<Record<string,string>>;
}

export interface Rgba {
  r: number;
  g: number;
  b: number;
}


export type FileOpenerType="SingleFile"|"SingleDir"|"MultipleFile";
export type MessageType="Info"|"Warning"|"Error";

export interface FileOpenerOptions {
  filename?: string;
  location?: string;
  type?: FileOpenerType
}


export interface SaveFileOptions {
  filename?: string;
  location?: string;
}

