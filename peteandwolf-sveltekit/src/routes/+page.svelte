<script>
  export let data;
  import { renderBlocks } from "$lib/helpers.js";
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  
  const { homeData } = data;

  onMount(() => {
    // Set initial state for fade-up elements (text/links)
    gsap.set('.fade-up', {
      opacity: 0,
      y: 30
    });

    // Set initial state for fade-in elements (images with blur)
    gsap.set('.fade-in', {
      opacity: 0,
      // filter: 'blur(20px)'
    });

    // Create timeline for mobile animations
    const mobileTl = gsap.timeline();
    mobileTl.to('.fade-up-mobile', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out"
    })
    .to('.fade-in-mobile', {
      opacity: 1,
      // filter: 'blur(0px)',
      duration: 1.4,
      // ease: "power2.out"
    }, 0.6); // Start image fade after a short delay

    // Create timeline for desktop animations
    const desktopTl = gsap.timeline();
    desktopTl.to('.fade-in-desktop', {
      opacity: 1,
      // filter: 'blur(0px)',
      duration: 2,
      // ease: "power2.out"
    })
    .to('.fade-up-desktop', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out"
    }, 0.3); // Start text elements with slight delay after image starts
  });
</script>

<svelte:head>
  <title>Pete & Wolf - {homeData.title}</title>
  <meta name="description" content="We help you to unmute your brand">
  <meta name="google-site-verification" content="YOdbV_KUTiiUnLNlWbjRhxsD9vGh1mjxVobbLEvPIek" />
</svelte:head>

<section class="d-sm-none h-100vh pt-4 overflow-hidden">
  <div class="container h-100 d-flex flex-column" style="padding-top: 0.28rem;">
      <a href="/" class="navbar-brand fade-up fade-up-mobile">
        <img src="/img/logo.svg" alt="Pete & Wolf">
      </a>
      
      <hr class="mt-3 mb-2 fade-up fade-up-mobile">
      
      <h1 class="w-100 font-6 fw-bold mb-0 fade-up fade-up-mobile">{homeData.title}</h1>

      <div class="flex-grow-1"></div>

      <div class="w-100 fade-in fade-in-mobile">
        <img src={homeData.image.url} alt={homeData.image.alt} class="w-100"/>
      </div> 

      <div class="flex-grow-1"></div>

      <hr class="mt-1 mb-0 fade-up fade-up-mobile">

      <a href="/advertising" class="d-flex justify-content-between align-items-center pill-link font-2 fw-bold text-black text-decoration-none arrow-link-hover fade-up fade-up-mobile">
        <span>Advertising</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-left ms-1 font-3 arrow-move" viewBox="0 0 16 16" style="width: 1em; height: 1em;">
          <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5a.5.5 0 0 0 .5-.5z"/>
        </svg>
      </a>

      <hr class="mt-0 mb-0 fade-up fade-up-mobile">

      <a href="/cases/sonic-id" class="d-flex justify-content-between align-items-center pill-link font-2 fw-bold text-black text-decoration-none arrow-link-hover fade-up fade-up-mobile">
        <span>Cases</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-left ms-1 font-3 arrow-move" viewBox="0 0 16 16" style="width: 1em; height: 1em;">
          <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5a.5.5 0 0 0 .5-.5z"/>
        </svg>
      </a>

      <hr class="mt-0 mb-4 fade-up fade-up-mobile">
  </div>
</section>

<section class="d-none d-sm-block h-100vh pt-below-nav overflow-hidden">
  <div class="container h-100 d-flex flex-column">
    <div class="row align-items-center gy-4 gy-lg-0 gx-5 pb-4 pb-lg-0">
      <div class="col-sm-6 h-lg-100 d-flex flex-column">
        <div class="w-100 fade-in fade-in-desktop">
          <img src={homeData.image.url} alt={homeData.image.alt} class="w-100"/>
        </div> 
      </div>
      <div class="col-sm-6 h-lg-100 d-flex flex-column">
        <hr class="mt-0 mb-3 fade-up fade-up-desktop">
        
        <a href="/" class="navbar-brand fade-up fade-up-desktop">
          <img src="/img/logo.svg" alt="Pete & Wolf">
        </a>
        
        <hr class="mt-3 mb-3 fade-up fade-up-desktop">
        
        <h1 class="w-100 font-6 fw-bold font-3-mob pb-3 mb-0 fade-up fade-up-desktop">{homeData.title}</h1>
        
        <div class="d-flex flex-column flex-grow-1 justify-content-end">
          <div class="font-6 fw-bold fade-up fade-up-desktop">
            {@html renderBlocks(homeData.description, true)}
          </div>

          <hr class="mt-2 mb-0 fade-up fade-up-desktop">

          <a href="/advertising" class="d-flex justify-content-between align-items-center pill-link font-2 fw-bold text-black text-decoration-none arrow-link-hover fade-up fade-up-desktop">
            <span>Advertising</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-left ms-1 font-3 arrow-move" viewBox="0 0 16 16" style="width: 1em; height: 1em;">
              <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5a.5.5 0 0 0 .5-.5z"/>
            </svg>
          </a>
        
          <hr class="mt-1 mb-1 fade-up fade-up-desktop">

          <a href="/cases/sonic-id" class="d-flex justify-content-between align-items-center pill-link font-2 fw-bold text-black text-decoration-none arrow-link-hover fade-up fade-up-desktop">
            <span>Cases</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-left ms-1 font-3 arrow-move" viewBox="0 0 16 16" style="width: 1em; height: 1em;">
              <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5a.5.5 0 0 0 .5-.5z"/>
            </svg>
          </a>

          <hr class="mt-1 mb-0 fade-up fade-up-desktop">
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .arrow-move {
    transition: transform 0.3s ease;
  }

  .arrow-link-hover:hover .arrow-move {
    transform: translateX(-0.25rem);
  }
</style>