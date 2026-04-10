import { create } from 'zustand';
import { Project } from '@/hooks/use-projects';

interface LogLine {
    lineNumber: number;
    log: string;
    type?: 'info' | 'error' | 'success';
}

interface ProjectState {
    projects: Project[];
    currentProject: Project | null;
    searchTerm: string;
    
    setProjects: (projects: Project[]) => void;
    setCurrentProject: (project: Project | null) => void;
    getProjectById: (id: string | number) => Project | undefined;

    logs: Record<number, LogLine[]>; 
    addLog: (buildId: number, log: LogLine) => void;
    setInitialLogs: (buildId: number, logs: LogLine[]) => void;
    setSearchTerm: (term: string) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
    projects: [],
    currentProject: null,
    searchTerm: "",
    logs: {},

    setProjects: (projects) => set({ projects }),
    
    setCurrentProject: (currentProject) => set({ currentProject }),

    getProjectById: (id) => {
        return get().projects.find(p => p.id.toString() === id.toString());
    },
    setInitialLogs: (buildId, initialLogs) => set((state) => ({
        logs: { ...state.logs, [buildId]: initialLogs }
    })),

    addLog: (buildId, logLine) => set((state) => ({
        logs: {
            ...state.logs,
            [buildId]: [...(state.logs[buildId] || []), logLine]
        }
    })),
    setSearchTerm: (searchTerm) => set({ searchTerm }),
}));