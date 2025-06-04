
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
        <h1 class="w-100 font-5 fw-bold pb-3 mb-3">{homeData.title}</h1>
        <div class="w-100">
          <img src={homeData.image.url} alt={homeData.image.alt} class="w-100"/>
        </div> 
        <hr class="mt-5 mb-0">
        <a href="/advertising" class="pill-link font-2 fw-bold text-black">Advertising</a>
        <hr class="mt-0 mb-0">
        <a href="/cases/sonic-id" class="pill-link font-2 fw-bold  text-black">Cases</a>
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
        <h1 class="w-100 font-5 fw-bold font-3-mob pb-3 mb-0">{homeData.title}</h1>
        <div class="d-flex flex-column flex-grow-1 justify-content-end">
          <div class="font-6 fw-bold">
            {@html renderBlocks(homeData.description, true)}
          </div>
          <hr class="mt-2 mb-0">
          <a href="/advertising" class="pill-link font-2 fw-bold text-black">Advertising</a>
          <hr class="mt-1 mb-1">
          <a href="/cases/sonic-id" class="pill-link font-2 fw-bold  text-black">Cases</a>
          <hr class="mt-1 mb-0">
        </div>
      </div>
    </div>
  </div>
</section>
