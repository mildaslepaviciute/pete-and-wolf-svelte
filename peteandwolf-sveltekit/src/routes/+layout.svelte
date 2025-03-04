<!-- src/routes/+layout.svelte -->
<script>
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import '../lib/styles/style.scss';
  
  let mounted = false;

  function adjustContentHeight() {
    const innerHeight = window.innerHeight;
    const innerWidth = window.innerWidth;
    let ratio, minHeight, perfectWidth, perfectHeight, targetHeight, targetWidth;

    if (innerWidth > 992) {
      perfectHeight = innerHeight * 0.75;
      perfectWidth = innerWidth * 0.9;
      ratio = 2;

      targetWidth = perfectHeight * ratio;
      targetHeight = perfectHeight;

      if (targetWidth > perfectWidth) {
        targetWidth = perfectWidth;
        targetHeight = targetWidth / ratio;
      } 

      let ptNav = Math.max(innerHeight * 0.15, 110);
      document.documentElement.style.setProperty('--pt-below-nav', `${ptNav}px`);
      document.documentElement.style.setProperty('--target-width', `${targetWidth}px`);
      document.documentElement.style.setProperty('--target-height', `${targetHeight}px`);
    }
}

onMount(() => {
    mounted = true;
    adjustContentHeight();
    window.addEventListener('resize', adjustContentHeight);
    return () => window.removeEventListener('resize', adjustContentHeight);
});
  
</script>

<svelte:head>
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
</svelte:head>

<!-- Wrap your content -->
<div class="content-wrapper {mounted ? 'mounted' : ''}">
  <Navbar />
  <slot />
</div>

<style>
    :global(.container) {
        transition: padding 0.3s ease-out;
    }
</style>