import React from 'react'
import RepoItem from './repo-item'
import OrgSelector from './organization-select'
import { RefreshCw, Search } from 'lucide-react'

function LeftSection({ selectedRepo, setSelectedRepo }: { selectedRepo: { project: string; branch: string; }; setSelectedRepo: (repo: { project: string; branch: string; }) => void }) {
    return (
        <div className="space-y-8">
            <div>
                <p className="text-[10px] font-mono text-brand uppercase tracking-widest mb-2">Step 01</p>
                <h2 className="text-4xl font-bold tracking-tight mb-4">Import Repository</h2>
                <p className="text-gray-400 text-sm">Select a GitHub repository to begin your deployment journey.</p>
            </div>

            <div className="space-y-4">
                <OrgSelector />

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search repositories..."
                        className="w-full bg-transparent border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-brand/50"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Recent Repositories</span>
                        <RefreshCw size={12} className="text-gray-500 cursor-pointer hover:rotate-180 transition-transform duration-500" />
                    </div>

                    <RepoItem
                        name="shipyard-core-engine"
                        branch="main"
                        time="Last commit 2h ago"
                        selected={selectedRepo.project === 'shipyard-core-engine'}
                        onClick={() => setSelectedRepo({ project: 'shipyard-core-engine', branch: 'main' })}
                    />
                    <RepoItem
                        name="documentation-portal"
                        branch="prod"
                        time="Updated yesterday"
                        selected={selectedRepo.project === 'documentation-portal'}
                        onClick={() => setSelectedRepo({ project: 'documentation-portal', branch: 'prod' })}
                    />
                    <RepoItem
                        name="auth-service-v3"
                        branch="develop"
                        time="Last commit 4d ago"
                        selected={selectedRepo.project === 'auth-service-v3'}
                        onClick={() => setSelectedRepo({ project: 'auth-service-v3', branch: 'develop' })}
                    />
                    <RepoItem
                        name="analytics-worker"
                        branch="master"
                        time="Updated 2w ago"
                        selected={selectedRepo.project === 'analytics-worker'}
                        onClick={() => setSelectedRepo({ project: 'analytics-worker', branch: 'master' })}
                    />
                </div>
            </div>
        </div>
    )
}

export default LeftSection