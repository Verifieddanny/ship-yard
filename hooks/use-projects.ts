import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

interface Secret {
  id: number;
  createdAt: Date | null;
  projectId: number | null;
  key: string;
  value: string;
}

export interface Deployment {
  id: number;
  status: "live" | "rolled_back";
  buildId: number | null;
  createdAt: Date;
}

interface Logs {
  id: number;
  lineNumber: number;
  log: string;
  buildId: number;
  createdAt: Date;
}

interface Build {
  id: number;
  branch: string;
  status: "queued" | "running" | "passed" | "failed";
  commit: string;
  commitAuthor: string;
  exitCode: number | null;
  projectId: number;
  startedAt: Date;
  finishedAt: Date | null;
  deployment: Deployment;
  logs: Logs[];
}

export interface Project {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  branch: string;
  installCommand: string | null;
  buildCommand: string | null;
  outputDirectory: string | null;
  repoUrl: string;
  webhookId: string;
  productionUrl: string;
  userId: number;
  secrets?: Secret[];
  builds?: Build[];
}

export interface Oragnization {
  login: string;
  avatar_url: string;

}

export interface Repo {
  name: string;
  branch: string;
  repoUrl: string;
  owner: string;
  updatedAt: string;
}

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await api.get("/project/projects");
      return data.projects as Project[];
    },
  });
};


export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await api.put(`/project/projects/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useDeleteSecret = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (secretId: number) => {
      const response = await api.delete(`/project/secret/${secretId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useRollback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { latestDeploymentId: number, previousDeploymentId: number }) => {
      const response = await api.put(`/deploy/rollback?latest=${data.latestDeploymentId}&prev=${data.previousDeploymentId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useRebuild = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (buildId: number) => {
      const response = await api.post(`/build/rebuild/${buildId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};


export const useOrganizations = () => {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      const { data } = await api.get("/repo/orgs");
      return data.organizations as Oragnization[];
    },
  });
};

export const useRepos = (org?: string) => {
  return useQuery({
    queryKey: ["repos", org],
    queryFn: async () => {
      const { data } = await api.get(`/repo/repos${org ? `?org=${org}` : ""}`);
      return data.repos as Repo[];
    },
    enabled: !!org,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post("/project", data);
      return response.data.project as Project;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};