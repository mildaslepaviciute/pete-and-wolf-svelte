<script>
  import { renderBlocks } from "$lib/helpers.js";
  import Column from "$lib/components/Column.svelte";
  import { onMount } from "svelte";
  import { on } from "svelte/events";
  import { gsap } from "gsap";

  export let data;
  const { aboutData } = data;

  onMount(() => {
    // Set initial state for fade-up elements (text/content)
    gsap.set('.fade-up', {
      opacity: 0,
      y: 30
    });

    // Set initial state for fade-in elements (main image with blur)
    gsap.set('.fade-in', {
      opacity: 0,
      filter: 'blur(20px)'
    });

    // Create timeline for about page animations
    const aboutTl = gsap.timeline();
    
    // Start with main image fade-in with blur
    aboutTl.to('.fade-in', {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.4,
      ease: "power2.out"
    })
    // Then stagger the text content
    .to('.fade-up', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out"
    }, 0.3); // Start text elements with slight delay after image starts
  });
</script>

<svelte:head>
  <title>{aboutData.title} - Pete & Wolf</title>
  <meta name="description" content="We help you to unmute your brand" />
</svelte:head>

<section class="h-100vh pt-below-nav overflow-hidden">
  <div class="container h-100 d-flex flex-column">
    <div class="row align-items-stretch scrolling-mob gy-4 gy-lg-0 pb-4 pb-lg-0" id="aboutRow">
      <div class="col-lg-7 h-lg-100 d-flex flex-column">
        <div class="w-100 fade-in">
          <img id="about-image" src={aboutData.mainImage.url} alt={aboutData.mainImage.alt || ""} class="w-100"/>
        </div>
      </div>
      <div class="col-lg-5 h-lg-100 d-flex flex-column scrolling-lg">
        <hr class="mt-0 mb-2 mb-lg-0 fade-up">
        
        <h1 id="about-title" class="w-100 sticky-top bg-white font-2 font-3-mob mb-0 pb-0 fade-up">
          <b>{aboutData.title}</b>
        </h1>
        
        <hr class="mb-3 mt-2 mt-lg-0 fade-up">

        <div class="col-12 mb-4 fade-up">
          {@html renderBlocks(aboutData.textContent, true)}
        </div>
        
        <div class="flex-grow-1 d-flex flex-column justify-content-end">
          <hr class="mb-2 mt-0 d-none d-lg-block fade-up">
          
          <div class="row g-0">
            <hr class="my-3 d-lg-none fade-up">
            
            <div class="col-lg-6 d-flex flex-column justify-content-end font-6-mob fade-up">
                {@html renderBlocks(aboutData.col_1, true, true)}
            </div>
            
            <hr class="my-3 d-lg-none fade-up">
            
            <div class="col-lg-6 d-flex flex-column justify-content-end font-6-mob fade-up">
                {@html renderBlocks(aboutData.col_2, true, true)}
            </div>
            
            <hr class="my-3 my-lg-2 fade-up">
            
            <div class="col-lg-6 d-flex flex-column justify-content-end font-6-mob fade-up">
                {@html renderBlocks(aboutData.col_3, true, true)}
            </div>
            
            <hr class="my-3 d-lg-none fade-up">
            
            <div class="col-lg-6 d-flex flex-column justify-content-end font-6-mob fade-up">
                {@html renderBlocks(aboutData.col_4, true, true)}
            </div>
            
            <hr class="my-3 d-lg-none fade-up">
          </div>
          
          <hr class="d-none d-lg-block mt-2 mb-0 fade-up">
        </div>
      </div>
    </div>
  </div>
</section>