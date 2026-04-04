"use client";
import { useState } from 'react';

import LeftSection from '@/components/dashboard/new/left-section';
import RightSection from '@/components/dashboard/new/right-section';
import DeploymentBar from '@/components/dashboard/new/deployment-bar';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
        const router = useRouter();
        const navigateToNewDeployment = () => {
        router.push(`/dashboard/deployments/${selectedRepo.project}-${selectedRepo.branch}`);
    };

    const [selectedRepo, setSelectedRepo] = useState({ project: 'shipyard-core-engine', branch: 'main' });

    return (
        <div className="max-w-6xl mx-auto pb-24">
            

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                <LeftSection selectedRepo={selectedRepo} setSelectedRepo={setSelectedRepo} />

                <RightSection project={selectedRepo.project} branch={selectedRepo.branch} />
            </div>

            {/* Persistent Bottom Deployment Bar */}
            <DeploymentBar deploy={navigateToNewDeployment} />
        </div>
    );
}
