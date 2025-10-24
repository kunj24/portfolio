export interface Project {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'image' | '3d-model' | 'interactive';
  category: string;
  thumbnailUrl: string;
  mediaUrl: string;
  technologies: string[];
  date: string;
  featured: boolean;
  links?: {
    demo?: string;
    github?: string;
    behance?: string;
  };
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | '3d' | 'animation' | 'design' | 'tools';
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Theme {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface Animation {
  name: string;
  duration: number;
  delay?: number;
  ease?: string;
}