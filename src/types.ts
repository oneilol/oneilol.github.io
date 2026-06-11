export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  borderColor: string; // 'green' | 'blue' | 'purple'
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  badge?: string;
  description?: string;
}

export interface Skill {
  name: string;
  percentage: number;
  category: 'grc' | 'tech' | 'tools';
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
}
