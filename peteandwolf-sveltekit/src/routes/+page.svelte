
<script>
  export let data;
  import { renderBlocks } from "$lib/helpers.js";
  const { homeData } = data;
</script>

<svelte:head>
  <title>Pete & Wolf - {homeData.title}</title>
  <meta name="description" content="We help you to unmute your brand">
</svelte:head>


<section class="d-lg-none h-100vh pt-3 overflow-hidden">
  <div class="container h-100 d-flex flex-column px-4">
    <div class="align-items-center scrolling-mob gy-4 gy-lg-0 gx-5 pb-4 pb-lg-0">
        <a href="/" class="navbar-brand">
          <img src="/img/logo.svg" alt="Pete & Wolf">
        </a>
        <hr class="mt-3 mb-2">
        <h1 class="w-100 font-6 fw-bold pb-3 mb-3">{homeData.title}</h1>
        <div class="w-100">
          <img src={homeData.image.url} alt={homeData.image.alt} class="w-100"/>
        </div> 
        <hr class="mt-5 mb-0">
          <a href="/advertising" class="pill-link font-2 fw-bold text-black">
            Advertising 
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-right ms-1 pulse-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </a>
          <hr class="mt-0 mb-0">
          <a href="/cases/sonic-id" class="pill-link font-2 fw-bold  text-black">
            Cases
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-right ms-1 pulse-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </a>
          <hr class="mt-0 mb-4">
        <div class="font-6 fw-bold">
          {@html renderBlocks(homeData.description, true)}
        </div>
    </div>
  </div>
</section>

<section class="d-none d-lg-block h-100vh pt-below-nav overflow-hidden">
  <div class="container h-100 d-flex flex-column">
    <div class="row align-items-center scrolling-mob gy-4 gy-lg-0 gx-5 pb-4 pb-lg-0">
      <div class="col-lg-6 h-lg-100 d-flex flex-column">
        <div class="w-100">
          <img src={homeData.image.url} alt={homeData.image.alt} class="w-100"/>
        </div> 
      </div>
      <div class="col-lg-6 h-lg-100 d-flex flex-column">
        <hr class="mt-0 mb-3">
        <a href="/" class="navbar-brand">
          <img src="/img/logo.svg" alt="Pete & Wolf">
        </a>
        <hr class="mt-3 mb-3">
        <h1 class="w-100 font-6 fw-bold font-3-mob pb-3 mb-0">{homeData.title}</h1>
        <div class="d-flex flex-column flex-grow-1 justify-content-end">
          <div class="font-6 fw-bold">
            {@html renderBlocks(homeData.description, true)}
          </div>
          <hr class="mt-2 mb-0">
          <a href="/advertising" class="pill-link font-2 fw-bold text-black">
            Advertising 
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-right ms-1 pulse-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </a>
          <hr class="mt-1 mb-1">
          <a href="/cases/sonic-id" class="pill-link font-2 fw-bold  text-black">
            Cases
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-right ms-1 pulse-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </a>
          <hr class="mt-1 mb-0">
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes pulse-right {
    0% { transform: translateX(0); }
    50% { transform: translateX(5px); }
    100% { transform: translateX(0); }
  }

  .pulse-right {
    animation: pulse-right 1.5s infinite ease-in-out;
  }
</style>