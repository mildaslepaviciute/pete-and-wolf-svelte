<script>
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  
  import '../lib/styles/style.scss';
  // Add this to prevent FOUC
  let mounted = false;

  onMount(() => {
      mounted = true;
  });
</script>

<svelte:head>
  <!-- Add critical CSS inline -->
  <!-- <style>
      /* Hide content until styles are loaded */
      .content-wrapper:not(.mounted) {
          opacity: 0;
      }
      .content-wrapper.mounted {
          opacity: 1;
          transition: opacity 0.2s;
      }
  </style> -->
</svelte:head>

<!-- Wrap your content -->
<div class="content-wrapper {mounted ? 'mounted' : ''}">
  <Navbar />
  <slot />
</div>