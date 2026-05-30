<script>
  // --- Slideshow State & Configuration ---
  let currentSlide = 0;

  // Replace these with your actual local image paths
  const slideshowImages = [
    '/images/singultech-structure-1.jpg',
    '/images/singultech-award.jpg',
    '/images/cad-resources.jpg',
    '/images/opensource-projects.jpg'
  ];

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideshowImages.length;
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideshowImages.length) % slideshowImages.length;
  }
</script>

<div class="w-full flex flex-col items-center">

  <section class="relative w-full min-h-[75vh] flex flex-col items-center justify-center text-center px-4 mb-20 overflow-visible select-none">
    
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <div class="w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-purple-600/10 rounded-full blur-[120px] transform -translate-y-12 animate-pulse duration-4000"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8">
      <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[0.65rem] sm:text-xs font-bold tracking-[0.18em] text-purple-400 uppercase backdrop-blur-sm">
        INTRODUCING SINGULTECH
      </span>

      <h1 class="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-white leading-[1.1] max-w-3xl">
        Next-generation CAD workflows,
        <span class="block bg-gradient-to-r from-neutral-400 via-white to-purple-400 bg-clip-text text-transparent font-medium">
          built for open collaboration.
        </span>
      </h1>

      <p class="text-neutral-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed px-2">
        We are engineering high-fidelity structural architectures. Access open-source components, design seamlessly, and integrate secure CAD models with global distribution points.
      </p>

      <div class="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto px-6">
        <a href="#join" class="w-full sm:w-auto text-center bg-purple-600 hover:bg-purple-700 text-white font-bold tracking-wider text-xs px-8 py-4 rounded-full no-underline transition-all duration-200 hover:-translate-y-px active:translate-y-0 shadow-lg shadow-purple-600/20">
          Get Started
        </a>
        <a href="#cad" class="w-full sm:w-auto text-center bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold tracking-wider text-xs px-8 py-4 rounded-full no-underline transition-all duration-200 backdrop-blur-sm">
          Explore CAD Models
        </a>
      </div>
    </div>
  </section>


  <section class="relative w-full max-w-5xl mx-auto px-6 mb-32 group">
    <div class="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl">
      {#each slideshowImages as image, i}
        <img 
          src={image} 
          alt={`SingulTech slide ${i + 1}`} 
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out {i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}" 
        />
      {/each}

      <div class="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <button on:click={prevSlide} class="bg-black/50 hover:bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-colors">
          &#8592;
        </button>
        <button on:click={nextSlide} class="bg-black/50 hover:bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-colors">
          &#8594;
        </button>
      </div>
    </div>
    
    <div class="flex justify-center gap-2 mt-6">
      {#each slideshowImages as _, i}
        <button 
          on:click={() => currentSlide = i}
          class="w-2 h-2 rounded-full transition-all duration-300 {i === currentSlide ? 'bg-purple-500 w-6' : 'bg-white/20 hover:bg-white/50'}"
          aria-label={`Go to slide ${i + 1}`}
        ></button>
      {/each}
    </div>
  </section>


  <div class="w-full max-w-6xl mx-auto px-6 flex flex-col gap-24 mb-24">
    
    <section class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div class="space-y-6 order-2 md:order-1">
        <h4 class="text-xs font-bold tracking-widest text-purple-500 uppercase">About Us</h4>
        <h2 class="text-3xl md:text-4xl font-medium tracking-tight text-white">Members & Awards</h2>
        <p class="text-neutral-400 leading-relaxed font-light">
          Meet our brilliant engineers and see the recognized achievements driving our next-generation CAD workflows. We are a collective of designers and technologists pushing the boundaries of structural engineering.
        </p>
        <a href="#members" class="inline-block text-sm text-white font-medium hover:text-purple-400 transition-colors border-b border-purple-500 pb-1">
          Meet the team &rarr;
        </a>
      </div>
      <div class="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden border border-white/10 order-1 md:order-2">
        <div class="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-500 text-sm">
          Image: members-award.jpg
        </div>
      </div>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div class="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden border border-white/10 order-1">
        <div class="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-500 text-sm">
          Image: resources-cad.jpg
        </div>
      </div>
      <div class="space-y-6 order-2">
        <h4 class="text-xs font-bold tracking-widest text-purple-500 uppercase">Resources</h4>
        <h2 class="text-3xl md:text-4xl font-medium tracking-tight text-white">CAD & OpenSource</h2>
        <p class="text-neutral-400 leading-relaxed font-light">
          Explore our library of free-to-use, open-source structural architectures. Discover our unique CAD models designed for rapid deployment and seamless integration into your existing projects.
        </p>
        <div class="flex gap-4 pt-2">
          <a href="#cad" class="text-sm bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full transition-colors backdrop-blur-sm">Get CAD Files</a>
          <a href="#opensource" class="text-sm bg-transparent border border-white/20 hover:bg-white/5 text-white px-5 py-2.5 rounded-full transition-colors">GitHub Repo</a>
        </div>
      </div>
    </section>

  </div>
</div>