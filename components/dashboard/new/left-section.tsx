import React, { useMemo, useState } from 'react'
import RepoItem from './repo-item'
import OrgSelector from './organization-select'
import { RefreshCw, Search } from 'lucide-react'
import { Oragnization, Repo, useRepos } from '@/hooks/use-projects';
import { formatDistanceToNow } from 'date-fns';
import RepoSkeleton from './repo-skeleton';

function LeftSection({ selectedRepo, setSelectedRepo }: { selectedRepo: Repo | null; setSelectedRepo: (repo: Repo) => void }) {
    const [selectedOrg, setSelectedOrg] = useState<Oragnization | null>(null);
    const { data: repos, isLoading, isFetching, refetch } = useRepos(selectedOrg?.login);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredRepos = useMemo(() => {
        if (!repos) return [];

        const filtered = repos.filter(repo =>
            repo.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (searchTerm.trim() === "") {
            return filtered.slice(0, 5);
        }

        return filtered;
    }, [repos, searchTerm]);
    return (
        <div className="space-y-8">
            <div>
                <p className="text-[10px] font-mono text-brand uppercase tracking-widest mb-2">Step 01</p>
                <h2 className="text-4xl font-bold tracking-tight mb-4">Import Repository</h2>
                <p className="text-gray-400 text-sm">Select a GitHub repository to begin your deployment journey.</p>
            </div>

            <div className="space-y-4">
                <OrgSelector selected={selectedOrg && selectedOrg} onSelect={setSelectedOrg} />

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search repositories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-brand/50"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Recent Repositories</span>
                        <RefreshCw size={12} className="text-gray-500 cursor-pointer hover:rotate-180 transition-transform duration-500" />
                    </div>

                    {isLoading ? (
                        <RepoSkeleton />
                    ) : (
                        <div className="space-y-2 animate-in fade-in duration-500">
                            {filteredRepos?.map((repo) => (
                                <RepoItem
                                    key={repo.repoUrl}
                                    name={repo.name}
                                    branch={repo.branch}
                                    time={`Updated ${formatDistanceToNow(new Date(repo.updatedAt))} ago`}
                                    selected={selectedRepo?.repoUrl === repo.repoUrl}
                                    onClick={() => setSelectedRepo(repo)}
                                />
                            ))}

                            {filteredRepos.length === 0 && !isLoading && (
                                <div className="p-8 text-center border border-dashed border-white/5 rounded-xl">
                                    <p className="text-xs text-gray-600 font-mono">No repositories found for this search.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LeftSection