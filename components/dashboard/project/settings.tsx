import { Play, Save, Trash2, Loader2, AlertTriangle } from "lucide-react"
import { Project, useUpdateProject, useDeleteSecret, useDeleteProject } from "@/hooks/use-projects"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function ProjectSettings({ currentProject, addSecretField, newSecrets, updateNewSecret, removeNewSecret, setNewSecrets }: {
    currentProject: Project, addSecretField: () => void, newSecrets: {
        key: string;
        value: string;
    }[], updateNewSecret: (index: number, field: "key" | "value", val: string) => void,
    removeNewSecret: (index: number) => void,
    setNewSecrets: Dispatch<SetStateAction<{ key: string; value: string; }[]>>
}) {

    const updateMutation = useUpdateProject();
    const deleteSecretMutation = useDeleteSecret();
    const deleteProjectMutation = useDeleteProject();

    const router = useRouter();

    const [formData, setFormData] = useState({
        name: currentProject.name || '',
        branch: currentProject.branch || '',
        buildCommand: currentProject.buildCommand || '',
        installCommand: currentProject.installCommand || '',
        outputDirectory: currentProject.outputDirectory || ''
    });

    useEffect(() => {
        if (currentProject) {
            setFormData({
                name: currentProject.name || '',
                branch: currentProject.branch || '',
                buildCommand: currentProject.buildCommand || '',
                installCommand: currentProject.installCommand || '',
                outputDirectory: currentProject.outputDirectory || ''
            });
        }
    }, [currentProject]);

    const handleSave = async () => {
        try {
            await updateMutation.mutateAsync({
                id: currentProject.id,
                data: {
                    ...formData,
                    secrets: newSecrets
                }
            });

            setNewSecrets([]);
            // alert("Project settings updated!");
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to update project");
        }
    };


    const handleDeleteSecret = async (secretId: number) => {
        if (confirm("Are you sure you want to delete this secret? This cannot be undone.")) {
            try {
                await deleteSecretMutation.mutateAsync(secretId);
            } catch (err: any) {
                alert(err.response?.data?.message || "Failed to delete secret");
            }
        }
    };

    const handleDeleteProject = async () => {
        const confirmName = confirm(
            "Are you sure you want to delete this project? This will remove all builds, logs, and the GitHub webhook. This action is irreversible."
        );

        if (confirmName) {
            try {
                await deleteProjectMutation.mutateAsync(currentProject.id);
                router.push("/dashboard");
            } catch (err: any) {
                alert(err.response?.data?.message || "Failed to delete project");
            }
        }
    };

    return (
        <div className="bg-[#111] border border-white/5 rounded-2xl p-8 space-y-8 animate-in slide-in-from-top-1">
            <div className="space-y-2">
                <h3 className="text-xl font-bold">Project Settings</h3>
                <p className="text-gray-500 text-sm">Update your environment and build triggers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">PROJECT NAME</label>
                    <input
                        id="name"
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm font-mono text-gray-300 outline-none focus:border-brand/40"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="branch" className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">BRANCH</label>
                    <input
                        id="branch"
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm font-mono text-gray-300 outline-none focus:border-brand/40"
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="buildCommand" className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">BUILD COMMAND</label>
                    <input
                        id="buildCommand"
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm font-mono text-gray-300 outline-none focus:border-brand/40"
                        value={formData.buildCommand}
                        onChange={(e) => setFormData({ ...formData, buildCommand: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="outputDirectory" className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">OUTPUT DIRECTORY</label>
                    <input
                        id="outputDirectory"
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm font-mono text-gray-300 outline-none focus:border-brand/40"
                        value={formData.outputDirectory}
                        onChange={(e) => setFormData({ ...formData, outputDirectory: e.target.value })}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="installCommand" className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">INSTALL COMMAND</label>
                <input
                    id="installCommand"
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm font-mono text-gray-300 outline-none focus:border-brand/40"
                    value={formData.installCommand}
                    onChange={(e) => setFormData({ ...formData, installCommand: e.target.value })}
                />
            </div>

            <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Environment Variables</span>
                    <button
                        type='button'
                        onClick={addSecretField}
                        className="text-[10px] font-bold text-brand hover:underline flex items-center gap-1 cursor-pointer"
                    >
                        <Plus size={12} /> ADD VARIABLE
                    </button>
                </div>

                {currentProject.secrets?.map((s: any) => (
                    <div key={s.id} className="flex gap-2 animate-in fade-in">
                        <input
                            className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-2 text-xs font-mono text-gray-400"
                            title="Secret key"
                            aria-label="Secret key"
                            value={s.key}
                            readOnly
                        />
                        <input
                            className="flex-2 bg-black border border-white/10 rounded-lg px-4 py-2 text-xs font-mono"
                            title="Secret value"
                            aria-label="Secret value"
                            value="••••••••••••"
                            readOnly
                        />
                        <button
                            title='Delete Secret'
                            type='button'
                            disabled={deleteSecretMutation.isPending}
                            onClick={() => handleDeleteSecret(s.id)}
                            className="p-2.5 text-gray-600 hover:text-red-400 cursor-pointer disabled:opacity-50 transition-colors"
                        >
                            {deleteSecretMutation.isPending && deleteSecretMutation.variables === s.id ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <Trash2 size={16} />
                            )}
                        </button>
                    </div>
                ))}

                {newSecrets.map((s, index) => (
                    <div key={index} className="flex gap-2 animate-in zoom-in-95">
                        <input
                            className="flex-1 bg-black border border-brand/30 rounded-lg px-4 py-2 text-xs font-mono text-white outline-none focus:border-brand"
                            placeholder="KEY_NAME"
                            value={s.key}
                            onChange={(e) => updateNewSecret(index, 'key', e.target.value)}
                        />
                        <input
                            className="flex-2 bg-black border border-brand/30 rounded-lg px-4 py-2 text-xs font-mono text-white outline-none focus:border-brand"
                            placeholder="value"
                            type="password"
                            value={s.value}
                            onChange={(e) => updateNewSecret(index, 'value', e.target.value)}
                        />
                        <button
                            title='trash'
                            type='button'
                            onClick={() => removeNewSecret(index)}
                            className="p-2.5 text-red-500/50 hover:text-red-500 cursor-pointer"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={updateMutation.isPending}
                    className="bg-brand text-black text-xs font-bold px-8 py-2.5 rounded-md hover:opacity-90 transition-all cursor-pointer flex items-center gap-2"
                >
                    {updateMutation.isPending ? (
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : <Save size={14} />}
                    {updateMutation.isPending ? 'SAVING...' : 'SAVE CHANGES'}
                </button>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-500/2 border border-red-500/10 rounded-2xl p-8 space-y-6">
                <div className="flex items-center gap-3 text-red-400">
                    <AlertTriangle size={20} />
                    <h3 className="font-bold">Danger Zone</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
                    Deleting your project is permanent and cannot be undone. All pipeline data, projects, and secrets will be lost forever.
                </p>
                <button
                    type="button"
                    disabled={deleteProjectMutation.isPending}
                    onClick={handleDeleteProject}
                    className="border border-red-500/20 text-red-500 font-bold px-6 py-2.5 rounded-lg hover:bg-red-500/10 transition-all cursor-pointer flex items-center gap-2"
                >
                    {deleteProjectMutation.isPending ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            DELETING...
                        </>
                    ) : (
                        "Delete Project"
                    )}
                </button>
            </div>
        </div>
    )
}

export default ProjectSettings;

function Plus({ size }: { size: number }) {
    return <Play size={size} className="-rotate-90" />;
}