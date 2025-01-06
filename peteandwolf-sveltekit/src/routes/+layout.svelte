<script>
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  
  // import '../lib/styles/style.scss';


  // Add this to prevent FOUC
  let mounted = false;
  
  onMount(() => {
      mounted = true;
  });
</script>

<svelte:head>
  <!-- Add critical CSS inline -->
  <style>
      /* Hide content until styles are loaded */
      .content-wrapper:not(.mounted) {
          opacity: 0;
      }
      .content-wrapper.mounted {
          opacity: 1;
          transition: opacity 0.2s;
      }
  </style>

  <!-- Pre-load your fonts -->
  <link 
      rel="preload" 
      href="/fonts/PeteWolfDiatype-Regular.woff" 
      as="font" 
      type="font/woff" 
      crossorigin
  >
  <link 
      rel="preload" 
      href="/fonts/PeteWolfDiatype-Bold.woff" 
      as="font" 
      type="font/woff" 
      crossorigin
  >

 
  
  <!-- Your existing links -->
  <link href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,800&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css"/>
  
  <style>
    @import '../lib/styles/style.scss';
</style>

  <script src="https://kit.fontawesome.com/e3336da53c.js" crossorigin="anonymous"></script>
</svelte:head>

<!-- Wrap your content -->
<div class="content-wrapper {mounted ? 'mounted' : ''}">
  <Navbar />
  <slot />
</div>