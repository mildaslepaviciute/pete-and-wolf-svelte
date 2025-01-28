<!-- src/routes/+layout.svelte -->
<script>
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import '../lib/styles/style.scss';
  
  let mounted = false;

  function adjustContentHeight() {
    const innerHeight = window.innerHeight;
    const innerWidth = window.innerWidth;
    const minBottomPadding = 180;
    let ratio, minHeight;

    if (innerWidth > 992) {
      if (innerWidth < 1500) {
        ratio = 2.12;
        minHeight = 750;
      } else if (innerWidth < 1800) {
        ratio = 2.2;
        minHeight = 700;
      } else if (innerWidth < 2000) {
        ratio = 2.26;
        minHeight = 800;
      } else {
        ratio = 2.26;
        minHeight = 1000;
      }
      minHeight = innerHeight * 0.775
      console.log('innerWidth' + innerWidth)

      console.log('innerHeight' + innerHeight)

      let targetHeight = Math.min(minHeight, innerHeight - minBottomPadding);
      let targetWidth = targetHeight * ratio;
      console.log(targetWidth, targetHeight);

      if (targetWidth > (innerWidth - 96.5)) {
          targetWidth = (innerWidth - 96.5);
          targetHeight = targetWidth / ratio;
      }

      // Set CSS custom properties at the document root level
      document.documentElement.style.setProperty('--target-width', `${targetWidth}px`);
      document.documentElement.style.setProperty('--target-height', `${targetHeight}px`);
      console.log('ratio' + innerWidth /innerHeight)
      if (innerWidth > 2200 && (innerHeight - minBottomPadding) > 1000) {
        console.log('yes')
        let ptNav = 120 * 2.5*(innerHeight / innerWidth);
        document.documentElement.style.setProperty('--pt-below-nav', `${ptNav}px`); 
      } else if (innerWidth > 1600 ) {
        let ptNav = 120 * 2*(innerHeight / innerWidth);
        document.documentElement.style.setProperty('--pt-below-nav', `${ptNav}px`); 
      } else {
        let ptNav = 120
        document.documentElement.style.setProperty('--pt-below-nav', `${ptNav}px`);
      }

    
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