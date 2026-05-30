<script>
  import Navbar from '$lib/components/header.svelte';
  import Footer from '$lib/components/footer.svelte';
  import './layout.css';

</script>
<svelte:head>
  <title>SingulTech - Building the Future of Web Experiences</title>
  <meta name="description" content="Discover SingulTech, where we craft cutting-edge web experiences with clean code, dark themes, and vibrant purple accents. Explore our platform, resources, and newsroom to stay ahead in the digital world." />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" href="/favicon.ico" />
</svelte:head>
<div class="flex flex-col min-h-screen text-white selection:bg-[#2b362f] bg-black">
  
  <header class="w-full max-w-7xl mx-auto z-50">
    <Navbar />  
  </header>

  <main class="w-full">
    
    <slot />
  </main>

  <footer class="w-full border-t border-white/10 bg-[#121d14] mt-auto">
    <Footer />
  </footer>

</div>