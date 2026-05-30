<script lang="ts">
    import { pb } from '$lib/pocketbase';

    // Updated props to destructure 'name' based on your schema
    let { id, name, description, downloadUrl, accentColor = 'text-purple-400' } = $props();

    let teamNumInput = $state('');

    function handleTeamNumInput(e: any) {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            teamNumInput = value;
        }
    }

    async function handleDownload() {
        if (teamNumInput !== '') {
            try {
                await fetch(
                    'https://discord.com/api/webhooks/1328164483691970620/AY-xh4anddgqRoO5yRox_mvOKvWUGOb7v4DW5D1h-99P7AlGXYLf82Q5Hl_--ZU72d',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ content: `Team #${teamNumInput} downloaded "${name}" configuration.` })
                    }
                );

                // Matches 'count' precisely from your database collection
                if (id) {
                    await pb.collection('openSource').update(id, {
                        'count+': 1 
                    });
                }
                
                window.open(downloadUrl, '_blank');
            } catch (err) {
                console.error("Tracking update bypassed safely:", err);
                window.open(downloadUrl, '_blank');
            }
        } else {
            alert('Please input your team number.\nThis tracks configuration telemetry for our community outreach reports!');
        }
    }

    function formatDescription(text: string) {
        if (!text) return '';
        return text.replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
    }

    let formattedDescription = $derived(formatDescription(description));
</script>

<div class="w-full space-y-6">
    <p class="text-sm md:text-base leading-relaxed text-zinc-400 max-w-2xl font-medium tracking-wide">
        {@html formattedDescription}
    </p>

    <div class="flex flex-col sm:flex-row items-stretch gap-3 max-w-md pt-2">
        <div class="relative flex-1">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold font-mono {accentColor}">#</span>
            <input
                class="w-full h-12 rounded-lg bg-zinc-900/60 border border-zinc-800/80 pl-8 pr-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all"
                type="text"
                placeholder="Enter Team #"
                value={teamNumInput}
                oninput={handleTeamNumInput}
            />
        </div>
        <button
            class="h-12 px-6 rounded-lg bg-white hover:bg-zinc-200 text-black font-bold text-xs tracking-widest uppercase shadow-lg active:scale-[0.98] transition-all whitespace-nowrap"
            onclick={handleDownload}
        >
            Download Module
        </button>
    </div>
</div>