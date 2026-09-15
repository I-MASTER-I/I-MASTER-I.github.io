export type ContentType = "home" | "career" | "project" | "expertise" | "education" | "certification" | "award" | "military" | "training" | "archive";

export interface ContentMeta {
  id: string;
  type: ContentType;
  title?: string;
  startDate?: string;
  endDate?: string | null;
  status?: string;
  enabled?: boolean;
  sample?: boolean;
  featured?: boolean;
  skills?: string[];
  projects?: string[];
  [key: string]: unknown;
}

export interface ContentDocument { slug: string; meta: ContentMeta; content: string; }

export interface AreaConfig {
  directory: string; index: number; navLabel: string; href: string; enabled: boolean;
  pageEyebrow?: string; pageTitle?: string; pageDescription?: string; terminalPath?: string; counterLabel?: string;
  [key: string]: unknown;
}
