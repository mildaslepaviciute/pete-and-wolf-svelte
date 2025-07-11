<script>
  import { renderBlocks } from "$lib/helpers.js";
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  export let data;
  const { aboutData } = data;

  onMount(() => {
    // Set initial states for mobile
    gsap.set('.fade-up-mobile', { opacity: 0, y: 30 });
    gsap.set('.fade-in-mobile', { opacity: 0, 
      // filter: 'blur(20px)'
     });

    // Set initial states for desktop
    gsap.set('.fade-up-desktop', { opacity: 0, y: 30 });
    gsap.set('.fade-in-desktop', { opacity: 0, 
      // filter: 'blur(20px)'
     });

    // Detect viewport
    const isDesktop = window.innerWidth >= 992;

    if (isDesktop) {
      // Desktop: image first, then staggered text
      gsap.timeline()
        .to('.fade-in-desktop', {
          opacity: 1,
          // filter: 'blur(0px)',
          duration: 2,
          // ease: "power2.out"
        })
        .to('.fade-up-desktop', {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power2.out"
        }, 0.3); // Text starts after a short delay
    } else {
      gsap.timeline()
        .to('.fade-in-mobile', {
            opacity: 1,
            // filter: 'blur(0px)',
            duration: 1.4,
            // ease: "power2.out"
          }) 
        .to('.fade-up-mobile', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out"
        }, 0.6)
    }
  });
</script>

<svelte:head>
  <title>{aboutData.title} - Pete & Wolf</title>
  <meta name="description" content="From custom compositions to immersive sonic identities, we bring creative visions to life with precision, passion, and purpose." />
</svelte:head>

<section class="h-100vh pt-below-nav overflow-hidden">
  <div class="container h-100 d-flex flex-column">
    <div class="row align-items-stretch scrolling-mob gy-4 gy-lg-0 pb-4 pb-lg-0" id="aboutRow">
      <div class="col-lg-7 h-lg-100 d-flex flex-column">
        <!-- Both desktop & mobile classes -->
        <div class="w-100 fade-in-mobile fade-in-desktop">
          <img id="about-image" src={aboutData.mainImage.url} alt={aboutData.mainImage.alt || ""} class="w-100"/>
        </div>
      </div>
      <div class="col-lg-5 h-lg-100 d-flex flex-column">
        <hr class="mt-0 mb-2 mb-lg-0 fade-up-mobile fade-up-desktop">
        
        <h1 id="about-title" class="w-100 sticky-top bg-white font-2 font-3-mob mb-0 pb-0 fade-up-mobile fade-up-desktop">
          <b>{aboutData.title}</b>
        </h1>
        
        <hr class="mb-3 mt-2 mt-lg-0 fade-up-mobile fade-up-desktop">

        <div class="col-12 mb-lg-4 fade-up-mobile fade-up-desktop">
          {@html renderBlocks(aboutData.textContent, true)}
        </div>
        
        <div class="flex-grow-1 d-flex flex-column justify-content-end">
          <hr class="mb-2 mt-0 d-none d-lg-block fade-up-desktop">
          <div class="row g-0">
            <hr class="my-3 d-lg-none fade-up-mobile">
            
            <div class="col-lg-6 d-flex flex-column justify-content-end font-6-mob fade-up-mobile fade-up-desktop">
                {@html renderBlocks(aboutData.col_1, true, true)}
            </div>
            
            <hr class="my-3 d-lg-none fade-up-mobile">
            
            <div class="col-lg-6 d-flex flex-column justify-content-end font-6-mob fade-up-mobile fade-up-desktop">
                {@html renderBlocks(aboutData.col_2, true, true)}
            </div>
            
            <hr class="my-3 my-lg-2 fade-up-mobile fade-up-desktop">
            
            <div class="col-lg-6 d-flex flex-column justify-content-end font-6-mob fade-up-mobile fade-up-desktop">
                {@html renderBlocks(aboutData.col_3, true, true)}
            </div>
            
            <hr class="my-3 d-lg-none fade-up-mobile">
            
            <div class="col-lg-6 d-flex flex-column justify-content-end font-6-mob fade-up-mobile fade-up-desktop">
                {@html renderBlocks(aboutData.col_4, true, true)}
            </div>
            
            <hr class="my-3 d-lg-none fade-up-mobile">
          </div>
          <hr class="d-none d-lg-block mt-2 mb-0 fade-up-desktop">
        </div>
      </div>
    </div>
  </div>
</section>
