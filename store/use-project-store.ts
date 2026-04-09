import { create } from 'zustand';
import { Project } from '@/hooks/use-projects';

interface ProjectState {
    projects: Project[];
    currentProject: Project | null;
    
    setProjects: (projects: Project[]) => void;
    setCurrentProject: (project: Project | null) => void;
    getProjectById: (id: string | number) => Project | undefined;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
    projects: [],
    currentProject: null,

    setProjects: (projects) => set({ projects }),
    
    setCurrentProject: (currentProject) => set({ currentProject }),

    getProjectById: (id) => {
        return get().projects.find(p => p.id.toString() === id.toString());
    }
}));