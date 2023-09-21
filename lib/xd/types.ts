import { Header,Rgba,Theme,Size,Position } from "../../bindings/bindings.ts";
export type {
  Position,
  Theme,
  Rgba,
  Header,
  Size
};

/**
 * Content may be an URL or html/text
 */
export type Content=string|URL;


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
  headers?: Array<Header>;
}

export interface MinSize {
  minWidth: number;
  minHeight: number;
}

export interface MaxSize {
  maxWidth: number;
  maxHeight: number;
}

export type SizeConstraints=MaxSize&MinSize;

export interface MonitorInfo {
  name?: string;
  position: Position;
  scaleFactor: number;
  size: Size;
  modes: VidMode[];
}

export interface VidMode {
  size: Size;
  bitDepth: number;
  refreshRate: number;
}



/**
 * serializes the Content enum
 */
export function toContent(content: Content): string {
  return JSON.stringify(isURL(content)? {
    Url: {
      url: content.toString()
    }
  }:{
    Html: {
      html: content
    }
  });
}

/**
 * checks if content is an URL
 */
export function isURL(content: Content): content is URL {
  return content instanceof URL||!content.trimStart().startsWith("<");
}
