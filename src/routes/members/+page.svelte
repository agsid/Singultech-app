<script>
  import { onMount } from 'svelte';
  import {pb} from '$lib/pocketbase';
  import Cards from './Cards.svelte';


  let allMembers = $state([]);
  let loading = $state(true);
  let error = $state(null);

  // Derived filters that automatically arrange lists by count (Least -> Greatest)
  let mainMembers = $derived(
    allMembers
      .filter(m => m.section === 'main')
      .sort((a, b) => a.count - b.count)
  );

  let mentorMembers = $derived(
    allMembers
      .filter(m => m.section === 'mentor')
      .sort((a, b) => a.count - b.count)
  );

  onMount(async () => {
    try {
      // Pulling from collection
      const records = await pb.collection('members').getFullList();

      allMembers = records.map(record => ({
        id: record.id,
        name: record.name,
        grade: record.grade,
        title: record.title,
        description: record.description,
        section: record.section,
        count: Number(record.count) || 0, // Maps your 'count' field cleanly as a number
        imgUrl: pb.files.getUrl(record, record.img)
      }));
      
    } catch (err) {
      console.error('PocketBase fetch error:', err);
      error = 'Failed to sync database contents.';
    } finally {
      loading = false;
    }
  });
</script>

<div class="w-full max-w-7xl mx-auto px-6 py-12 text-white select-none">
  
  <header class="max-w-2xl mb-20 space-y-4">
    <span class="text-xs font-bold tracking-[0.2em] text-purple-500 uppercase">
      ABOUT OUR TEAM
    </span>
    <h1 class="text-4xl md:text-5xl font-normal tracking-tight">
      The minds behind SingulTech
    </h1>
  </header>

  {#if loading}
    <div class="w-full py-20 flex flex-col justify-center items-center gap-3">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      <p class="text-xs text-neutral-500">Connecting to PocketBase...</p>
    </div>
  {:else}
    {#if error}
      <div class="w-full p-4 mb-8 bg-red-950/20 border border-red-500/20 rounded-2xl text-center">
        <p class="text-sm text-red-400">{error}</p>
      </div>
    {/if}

    <section class="mb-24">
      <div class="flex items-center gap-4 mb-8">
        <h2 class="text-xs font-bold tracking-[0.2em] text-purple-400 uppercase whitespace-nowrap">Core Team</h2>
        <div class="w-full h-px bg-white/5"></div>
      </div>

      {#if mainMembers.length > 0}
        <Cards members={mainMembers} variant="main" />
      {:else if !error}
        <p class="text-xs text-neutral-500 italic">No core team records found.</p>
      {/if}
    </section>

    <section class="mb-24">
      <div class="flex items-center gap-4 mb-8">
        <h2 class="text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase whitespace-nowrap">Mentors & Advisors</h2>
        <div class="w-full h-px bg-white/5"></div>
      </div>

      {#if mentorMembers.length > 0}
        <Cards members={mentorMembers} variant="mentor" />
      {:else if !error}
        <p class="text-xs text-neutral-500 italic">No mentor records found.</p>
      {/if}
    </section>
  {/if}

</div>