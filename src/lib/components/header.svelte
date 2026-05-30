<script>
  // Centralized configuration matching your brand and menu structure
  const brand = {
    nameFirstPart: 'Singul', // Styled White
    nameSecondPart: 'Tech',  // Styled Purple
    url: '#'
  };

  const routes = [
    { 
      name: 'ABOUT US',
      url: 'members',
      dropdownItems: [
        { name: 'Members', url: '/members/' },
        { name: 'Award', url: '/awards/' }
      ]
    },
    { 
      name: 'RESOURCES', 
      url: '#',
      dropdownItems: [
        { name: 'CAD', url: '#cad' },
        { name: 'OpenSource', url: '#opensource' }
      ]
    },
    { name: 'CONTACT', url: '#contact' }
  ];

  const cta = {
    name: 'JOIN',
    url: '#join'
  };

  let openDropdownIndex = null;
</script>

<nav class="flex items-center justify-between w-full p-6 md:px-10 select-none overflow-visible">
  
  <div class="flex items-center px-6 py-3 bg-white/5 border border-white/10 rounded-full shadow-xl backdrop-blur-md">
    <a href={brand.url} class="flex items-center gap-2.5 font-medium tracking-tight text-[1.1rem] no-underline">
      <img class="w-10 h-10" src="/logo.png" alt="Logo" />
      
      
      <span class="text-white font-semibold text-3-xl">
        {brand.nameFirstPart}<span class="text-purple-500">{brand.nameSecondPart}</span>
      </span>
    </a>
  </div>

  <div class="flex items-center p-1.5 pl-7 bg-neutral-800/30 border border-white/10 rounded-full shadow-2xl backdrop-blur-md relative overflow-visible z-50">
    
    <ul class="flex items-center gap-7 m-0 p-0 list-none mr-5 overflow-visible">
      {#each routes as route, index}
        <li 
          class="relative py-3 overflow-visible"
          on:mouseenter={() => openDropdownIndex = index}
          on:mouseleave={() => openDropdownIndex = null}
        >
          {#if route.dropdownItems}
            <button 
              class="flex items-center gap-1 text-[0.75rem] font-bold tracking-widest text-neutral-300 hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none p-0 focus:outline-none"
            >
              {route.name}
              <svg 
                class="w-3 h-3 transform transition-transform duration-200 {openDropdownIndex === index ? 'rotate-180' : ''}" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {#if openDropdownIndex === index}
              <div class="absolute left-0 top-full pt-2 w-48 z-[99] block">
                <div class="bg-neutral-900/95 border border-white/10 rounded-2xl shadow-2xl py-2 backdrop-blur-md">
                  {#each route.dropdownItems as item}
                    <a 
                      href={item.url}
                      class="block px-4 py-2 text-xs font-semibold text-neutral-300 hover:bg-white/5 hover:text-purple-400 transition-colors"
                      on:click={() => openDropdownIndex = null}
                    >
                      {item.name}
                    </a>
                  {/each}
                </div>
              </div>
            {/if}

          {:else}
            <a 
              href={route.url} 
              class="text-[0.75rem] font-bold tracking-widest text-neutral-300 hover:text-white no-underline transition-colors duration-200"
            >
              {route.name}
            </a>
          {/if}
        </li>
      {/each}
    </ul>

    <a 
      href={cta.url} 
      class="bg-purple-600 hover:bg-purple-700 text-white text-[0.75rem] font-bold tracking-widest px-6 py-3.5 rounded-full no-underline transition-all duration-200 hover:-translate-y-px active:translate-y-0 whitespace-nowrap"
    >
      {cta.name}
    </a>
    
  </div>
</nav>