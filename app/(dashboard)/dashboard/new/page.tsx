"use client";
import { useState } from 'react';

import LeftSection from '@/components/dashboard/new/left-section';
import RightSection from '@/components/dashboard/new/right-section';
import DeploymentBar from '@/components/dashboard/new/deployment-bar';
import { useRouter } from 'next/navigation';
import { Repo, useCreateProject } from '@/hooks/use-projects';

interface LocalEnvVar {
    id: string;
    key: string;
    value: string;
}

export default function NewProjectPage() {
    const router = useRouter();
    const createProjectMutation = useCreateProject();

    const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
    const [config, setConfig] = useState({
        installCommand: 'npm install',
        buildCommand: 'npm run build',
        outputDirectory: 'dist'
    });
    const [envVars, setEnvVars] = useState<LocalEnvVar[]>([]);

    const handleDeploy = async () => {
        if (!selectedRepo) return alert("Please select a repository");

        try {
            const secretsForBackend = envVars
                .filter(ev => ev.key.trim() !== '' && ev.value.trim() !== '')
                .map(({ key, value }) => ({ key, value }));

            const projectResponse = await createProjectMutation.mutateAsync({
                name: selectedRepo.name,
                branch: selectedRepo.branch,
                repoUrl: selectedRepo.repoUrl,
                installCommand: config.installCommand,
                buildCommand: config.buildCommand,
                outputDirectory: config.outputDirectory,
                secrets: secretsForBackend
            });
            if (projectResponse.initialBuildId) {
                router.push(`/dashboard/deployments/${projectResponse.initialBuildId}`);
            }
        } catch (err: any) {
            alert(err.response?.data?.message || "Deployment failed");
        }
    };


    return (
        <div className="max-w-6xl mx-auto pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <LeftSection
                    selectedRepo={selectedRepo}
                    setSelectedRepo={setSelectedRepo}
                />
                <RightSection
                    selectedRepo={selectedRepo}
                    config={config}
                    setConfig={setConfig}
                    envVars={envVars}
                    setEnvVars={setEnvVars}
                />
            </div>
            <DeploymentBar
                deploy={handleDeploy}
                isPending={createProjectMutation.isPending}
            />
        </div>
    );
}

