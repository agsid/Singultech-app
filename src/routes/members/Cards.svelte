<script>
  let { 
    members = [], 
    variant = 'main' 
  } = $props();
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
  {#each members as member (member.id)}
    <div class="group flex flex-col w-full bg-neutral-950/40 border border-white/5 rounded-3xl p-4 transition-all duration-300 hover:border-white/10 hover:bg-neutral-900/40">
      
      <div class="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 mb-5">
        <img 
          src={member.imgUrl} 
          alt={member.name} 
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div class="hidden md:flex absolute inset-0 bg-black/85 backdrop-blur-sm p-6 flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <p class="text-md leading-relaxed font-light {variant === 'main' ? 'text-neutral-300' : 'text-neutral-400'}">
            {member.description}
          </p>
        </div>
      </div>

      <div class="space-y-1 px-1">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium transition-colors {variant === 'main' ? 'text-white group-hover:text-purple-400' : 'text-neutral-300 group-hover:text-white'}">
            {member.name}
          </h3>
        </div>
        
        <p class="text-xs font-semibold tracking-wide uppercase {variant === 'main' ? 'text-neutral-400' : 'text-neutral-500'}">
          {member.grade} 
          {#if member.title}
            <span class="text-neutral-700 mx-1.5">•</span> {member.title}
          {/if}
        </p>
        
        <p class="block md:hidden text-xs font-light leading-relaxed pt-2.5 border-t border-white/5 mt-2 {variant === 'main' ? 'text-neutral-400' : 'text-neutral-500'}">
          {member.description}
        </p>
      </div>

    </div>
  {/each}
</div>