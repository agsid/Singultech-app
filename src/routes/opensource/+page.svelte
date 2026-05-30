<script lang="ts">
    import { pb } from '$lib/pocketbase';
    import Opensourcecard from './opensourcecard.svelte';
    import { onMount } from 'svelte';

    let opensourceItems = $state<any[]>([]);
    let selectedIndex = $state(0);
    let isLoading = $state(true);

    const brandColors = [
        { glow: 'from-purple-600/25', accent: 'text-purple-400', border: 'hover:border-purple-500/50', tracking: 'bg-purple-500', button: 'bg-purple-600 hover:bg-purple-500 focus:ring-purple-500/50' },
        { glow: 'from-blue-600/25', accent: 'text-blue-400', border: 'hover:border-blue-500/50', tracking: 'bg-blue-500', button: 'bg-blue-600 hover:bg-blue-500 focus:ring-blue-500/50' },
        { glow: 'from-fuchsia-600/25', accent: 'text-fuchsia-400', border: 'hover:border-fuchsia-500/50', tracking: 'bg-fuchsia-500', button: 'bg-fuchsia-600 hover:bg-fuchsia-500 focus:ring-fuchsia-500/50' },
        { glow: 'from-cyan-600/25', accent: 'text-cyan-400', border: 'hover:border-cyan-500/50', tracking: 'bg-cyan-500', button: 'bg-cyan-600 hover:bg-cyan-500 focus:ring-cyan-500/50' }
    ];

    onMount(async () => {
        try {
            // Sorted by itemNum ascending so item 1 shows up first
            const records = await pb.collection('openSource').getFullList({
                sort: 'itemNum',
            });

            opensourceItems = records.slice(0, 4).map((record) => {
                return {
                    id: record.id,
                    name: record.name, // Matches 'name' field
                    description: record.description,
                    downloadLink: record.downloadLink,
                    itemNum: record.itemNum,
                    // Resolves the file upload field tokens to full direct asset links
                    imgUrl: record.img ? pb.files.getUrl(record, record.img) : '' 
                };
            });
        } catch (error) {
            console.error('Failed to query PocketBase openSource collection:', error);
        } finally {
            isLoading = false;
        }
    });

    function nextItem() {
        if (opensourceItems.length > 0) {
            selectedIndex = (selectedIndex + 1) % opensourceItems.length;
        }
    }
</script>


<div class="relative min-h-screen w-full bg-black text-white font-sans overflow-x-hidden flex flex-col justify-between select-none">
    
    <div class="pt-6"></div>

    <main class="flex-1 relative flex items-center justify-center px-6 py-4 md:px-16 lg:px-24 z-10">
        
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] rounded-full bg-gradient-to-b {isLoading ? 'from-zinc-800/10' : brandColors[selectedIndex]?.glow} to-transparent blur-[160px] pointer-events-none transition-all duration-700 ease-in-out"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-zinc-950/40 border border-zinc-900/20 blur-[2px] pointer-events-none"></div>

        {#if isLoading}
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full max-w-7xl mx-auto animate-pulse">
                <div class="lg:col-span-6 flex flex-col justify-center text-left z-20 order-2 lg:order-1 space-y-6">
                    <div class="h-4 w-48 bg-zinc-800 rounded-md"></div>
                    <div class="space-y-3">
                        <div class="h-16 w-full max-w-xl bg-zinc-800 rounded-xl"></div>
                        <div class="h-16 w-3/4 bg-zinc-800 rounded-xl"></div>
                    </div>
                    <div class="h-5 w-32 bg-zinc-900 rounded-md"></div>
                    <div class="space-y-3 pt-4">
                        <div class="h-4 w-full max-w-lg bg-zinc-900 rounded"></div>
                        <div class="h-4 w-5/6 bg-zinc-900 rounded"></div>
                        <div class="flex gap-3 max-w-md pt-2">
                            <div class="h-12 flex-1 bg-zinc-900 rounded-lg"></div>
                            <div class="h-12 w-36 bg-zinc-800 rounded-lg"></div>
                        </div>
                    </div>
                </div>
                <div class="lg:col-span-6 flex flex-col items-center justify-center relative order-1 lg:order-2 py-2 gap-6">
                    <div class="w-full max-w-md aspect-square bg-zinc-900/60 rounded-full flex items-center justify-center border border-zinc-800/30">
                        <div class="w-2/3 h-2/3 bg-zinc-800/50 rounded-xl transform rotate-12"></div>
                    </div>
                    <div class="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800"></div>
                </div>
            </div>
        {:else if opensourceItems.length > 0}
            {@const currentItem = opensourceItems[selectedIndex]}
            {@const activeStyle = brandColors[selectedIndex]}
            
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full max-w-7xl mx-auto">
                <div class="lg:col-span-6 flex flex-col justify-center text-left z-20 order-2 lg:order-1">
                   
                    
                    <h1 class="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-[0.95] mb-6 break-words">
                        {currentItem.name}
                    </h1>
                    
                    <div class="text-sm font-mono text-zinc-500 mb-8 flex items-center gap-2">
                      
                        <span class="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded font-sans uppercase font-bold tracking-wider text-xs">OpenSource <br>	Free Download</span>
                    </div>

                    <Opensourcecard
                        id={currentItem.id}
                        name={currentItem.title}
                        description={currentItem.description}
                        downloadUrl={currentItem.downloadLink}
                        accentColor={activeStyle.accent}
                    />
                </div>

                <div class="lg:col-span-6 flex flex-col items-center justify-center relative order-1 lg:order-2 py-2 gap-6">
                    <div class="relative w-full max-w-md sm:max-w-2xl aspect-square flex items-center justify-center">
                        <img 
                            src={currentItem.imgUrl} 
                            alt={currentItem.name} 
                            class="max-h-[95%] max-w-[95%] w-full object-contain filter drop-shadow-[0_35px_35px_rgba(147,51,234,0.08)] animate-[float_6s_ease-in-out_infinite]"
                        />
                    </div>

                    <button 
                        onclick={nextItem}
                        aria-label="Next item"
                        class="w-25 h-12 rounded-full flex items-center justify-center text-white shadow-xl shadow-black/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black active:scale-95 {activeStyle.button}"
                    >Next
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        {/if}
    </main>

    <footer class="w-full max-w-7xl mx-auto px-6 pb-10 z-30">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            {#if isLoading}
                {#each Array(4) as _}
                    <div class="w-full h-32 rounded-xl bg-zinc-950/40 border border-zinc-900/60 p-4 space-y-3 animate-pulse">
                        <div class="h-2.5 w-6 bg-zinc-900 rounded"></div>
                        <div class="h-10 w-full bg-zinc-900/60 rounded-md"></div>
                        <div class="h-3 w-16 bg-zinc-900 rounded"></div>
                    </div>
                {/each}
            {:else}
                {#each opensourceItems as item, index}
                    {@const isSelected = selectedIndex === index}
                    {@const itemTheme = brandColors[index]}
                    
                    <button 
                        onclick={() => selectedIndex = index}
                        class="w-full text-left rounded-xl bg-zinc-950/40 backdrop-blur-md p-4 border transition-all duration-300 relative group
                            {isSelected ? 'border-purple-500 bg-zinc-900/50 shadow-2xl scale-[1.01]' : 'border-zinc-900/60 ' + itemTheme.border}"
                    >
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-[9px] font-mono font-bold tracking-widest text-zinc-500">
                                {item.itemNum !== undefined ? String(item.itemNum).padStart(2, '0') : '0' + (index + 1)}
                            </span>
                            {#if isSelected}
                                <span class="w-1.5 h-1.5 rounded-full {itemTheme.tracking}"></span>
                            {/if}
                        </div>

                        <div class="h-16 w-full flex items-center justify-center p-2 mb-3 bg-black/40 rounded-lg border border-zinc-900/40 overflow-hidden">
                            <img 
                                src={item.imgUrl} 
                                alt={item.name} 
                                class="max-h-full max-w-full object-contain"
                            />
                        </div>

                        <h3 class="text-xs font-bold uppercase tracking-tight text-white truncate">
                            {item.name}
                        </h3>
                    </button>
                {/each}
            {/if}
        </div>
    </footer>

</div>

<style>
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-14px); }
    }
</style>