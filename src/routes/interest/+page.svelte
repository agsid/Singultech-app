<script lang="ts">
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    
    // Svelte 5 Runes Props
    let { form } = $props();
    
    let loading = $state(false);
    let currentSlide = $state(0);

    const slides = [
        {
            url: 'https://cdn.singultech.app/mainSlideshow/250111-FTC_Wolcott_Qualifier-131408A-Enhanced-NR-X3dd.jpg',
            title: 'Precision Engineering',
            desc: 'Design and assemble robot chassis systems.'
        },
        {
            url: 'https://cdn.singultech.app/mainSlideshow/robotinaction_1.jpg',
            title: 'Build and Code',
            desc: 'Code robots in Java utilizing advanced control systems and sensor integration.'
        },
        {
            url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
            title: 'Competitive Strategy',
            desc: 'Analyze game telemetry and optimize drive configurations for peak execution.'
        }
    ];

    // Form Enhancer Lifecycle Debugger
    function handleSubmit() {
        console.log('[FRONTEND] Submit clicked. Activating form progression loader...');
        loading = true;
        
        return async ({ result, update }) => {
            console.log('[FRONTEND] Form processed with action result data outcome:', result);
            
            // Execute default framework internal visual updates
            await update();
            loading = false;
            
            console.log('[FRONTEND] Form state processing completed. Loader disabled.');
        };
    }

    onMount(() => {
        const interval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
        }, 6000);

        return () => clearInterval(interval);
    });

    // Reactive statement tool to audit the exact state payload returned down from server
    $inspect(form).with((type, value) => {
        if (value) {
            console.log(`[FRONTEND INSPECT] Server action state response updated (${type}):`, value);
        }
    });
</script>
<div class="w-full bg-[#000000] text-zinc-100 flex items-center justify-center p-4 md:p-12 selection:bg-purple-500/40 selection:text-purple-100 antialiased relative overflow-hidden">
    
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[180px] pointer-events-none z-0"></div>

    <div class="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 bg-[#050508]/80 backdrop-blur-2xl border border-purple-500/30 rounded-2xl overflow-hidden shadow-[0_0_60px_-10px_rgba(147,51,234,0.25)] relative z-10">
        
        <div class="md:col-span-5 relative min-h-[350px] md:min-h-[700px] bg-black overflow-hidden group border-b border-zinc-900 md:border-b-0 md:border-r border-purple-500/20">
            {#each slides as slide, i}
                <div 
                    class="absolute inset-0 transition-all duration-1000 ease-in-out"
                    style="opacity: {currentSlide === i ? 1 : 0}; transform: scale({currentSlide === i ? 1.05 : 1});"
                >
                    <div class="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/40 to-transparent z-10"></div>
                    <img 
                        src={slide.url} 
                        alt={slide.title} 
                        class="w-full h-full object-cover filter saturate-[0.65] contrast-[1.1] brightness-[0.85]"
                    />
                    
                    <div class="absolute bottom-0 left-0 right-0 p-10 z-20 transition-all duration-700 {currentSlide === i ? 'translate-y-0' : 'translate-y-4'}">
                        <h3 class="text-xl font-bold text-white tracking-tight">{slide.title}</h3>
                        <p class="text-sm text-zinc-400 mt-2 leading-relaxed">{slide.desc}</p>
                    </div>
                </div>
            {/each}

            <div class="absolute bottom-10 right-10 z-30 flex gap-2">
                {#each slides as _, i}
                    <button 
                        on:click={() => currentSlide = i}
                        class="h-1 rounded-full transition-all duration-300 bg-purple-400"
                        style="width: {currentSlide === i ? '24px' : '8px'}; opacity: {currentSlide === i ? '1' : '0.2'};"
                        aria-label="Go to slide {i + 1}"
                    ></button>
                {/each}
            </div>
        </div>

        <div class="md:col-span-7 p-8 md:p-14 flex flex-col justify-center bg-black/20">
            
            <div class="mb-8">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-xs font-semibold text-purple-300 mb-4 tracking-wide uppercase">
                    <span class="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                    SingulTech Interest Form 
                </div>
                <h1 class="text-4xl font-extrabold tracking-tight text-white font-sans">
                    Build. Code. <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-400">Compete.</span>
                </h1>
                <p class="text-sm text-zinc-400 mt-2.5 leading-relaxed">
                    Complete the interest form below, we will contact you back shortly.
                </p>
            </div>

            {#if form?.success}
                <div class="mb-6 p-4 bg-purple-950/30 border border-purple-500/40 text-purple-200 rounded-xl text-sm flex items-start gap-3">
                    <span class="text-base mt-0.5">🚀</span>
                    <div>
                        <p class="font-semibold text-purple-300">Sent</p>
                        <p class="text-xs text-purple-400/80 mt-0.5">Thank you for showing interest!</p>
                    </div>
                </div>
            {:else if form?.error}
                <div class="mb-6 p-4 bg-red-950/20 border border-red-500/40 text-red-200 rounded-xl text-sm flex items-start gap-3">
                    <span class="text-base mt-0.5 text-red-400">❌</span>
                    <div>
                        <p class="font-semibold text-red-300">Submission Error</p>
                        <p class="text-xs text-red-400/80 mt-0.5">{form.message || 'Please verify your inputs and try again.'}</p>
                    </div>
                </div>
            {/if}

            <form method="POST" use:enhance={handleSubmit} class="space-y-6">
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div class="relative z-0 w-full group">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            disabled={loading}
                            placeholder=" " 
                            class="peer block w-full px-4 pt-6 pb-2 text-white bg-zinc-900/20 border border-zinc-800 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all disabled:opacity-50"
                        />
                        <label 
                            for="name" 
                            class="absolute text-sm text-zinc-500 duration-200 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-purple-400 font-medium pointer-events-none uppercase tracking-wider text-xs"
                        >
                            Full Name
                        </label>
                    </div>

                    <div class="relative z-0 w-full group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            disabled={loading}
                            placeholder=" "
                            class="peer block w-full px-4 pt-6 pb-2 text-white bg-zinc-900/20 border border-zinc-800 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all disabled:opacity-50"
                        />
                        <label 
                            for="email" 
                            class="absolute text-sm text-zinc-500 duration-200 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-purple-400 font-medium pointer-events-none uppercase tracking-wider text-xs"
                        >
                            Email Address
                        </label>
                    </div>
                </div>

                <div class="relative z-0 w-full group">
                    <input
                        type="number"
                        id="grade"
                        name="grade"
                        min="1"
                        max="12"
                        required
                        disabled={loading}
                        placeholder=" "
                        class="peer block w-full px-4 pt-6 pb-2 text-white bg-zinc-900/20 border border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <label 
                        for="grade" 
                        class="absolute text-sm text-zinc-500 duration-200 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-purple-400 font-medium pointer-events-none uppercase tracking-wider text-xs"
                    >
                        Grade Level
                    </label>
                </div>

                <div class="relative z-0 w-full group">
                    <textarea
                        id="statement"
                        name="statement"
                        rows="4"
                        required
                        disabled={loading}
                        placeholder=" "
                        class="peer block w-full px-4 pt-6 pb-2 text-white bg-zinc-900/20 border border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all disabled:opacity-50 resize-none font-sans"
                    ></textarea>
                    <label 
                        for="statement" 
                        class="absolute text-sm text-zinc-500 duration-200 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-5 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-purple-400 font-medium pointer-events-none uppercase tracking-wider text-xs"
                    >
                        Why do you want to join robotics?
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    class="w-full relative mt-2 group/btn overflow-hidden rounded-xl bg-white text-black font-bold py-3.5 px-4 hover:bg-zinc-100 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
                >
                    {#if loading}
                        <span class="flex items-center justify-center gap-2 text-zinc-700">
                            <svg class="animate-spin h-4 w-4 text-zinc-700" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                            </svg>
                            Submitting
                        </span>
                    {:else}
                        <span class="relative z-10 flex items-center justify-center gap-2 tracking-wide uppercase text-xs">
                            Submit
                            <svg class="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </span>
                    {/if}
                </button>
            </form>

        </div>
    </div>
</div>