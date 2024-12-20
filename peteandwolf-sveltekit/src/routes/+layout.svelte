<script>
    import { onMount } from 'svelte';
    import Navbar from '$lib/components/Navbar.svelte';
    import '../lib/styles/style.scss';
    
    onMount(() => {
     
    });
  </script>
  
  <svelte:head>
    <link href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,800&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css"/>
    <script src="https://kit.fontawesome.com/e3336da53c.js" crossorigin="anonymous"></script>
  </svelte:head>
  
  <Navbar />
  
  <slot />