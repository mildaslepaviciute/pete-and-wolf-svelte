
<script>
  export let data;
  const { homeData } = data;
</script>

<svelte:head>
  <title>Pete & Wolf - {homeData.title}</title>
  <meta name="description" content="We help you to unmute your brand">
</svelte:head>

<style>
.pill-link {
  border: 2px solid #000;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  padding: 0.25rem 2rem;
  display: inline-block;
}

.pill-link:hover {
  background-color: #0022f7;
  color: #fff !important;
  border-color: #0022f7;
}
</style>

<section class="h-100vh overflow-hidden" >
  <div class="container h-100 d-flex flex-column justify-content-center" >
    <h1 class="w-lg-80 font-1 fw-bold">{homeData.title}</h1>
    <!-- commented links remain here -->
        <!-- <div class="d-flex mt-5rem">
      <a href="/advertising" class="pill-link font-3 fw-bold text-black me-4">Advertising</a>
      <a href="/sonic-id" class="pill-link font-3 fw-bold text-black">Sonic-ID</a>
    </div>
    <div class="d-flex mt-5">
      <a href="/advertising" class="pill-link rounded-pill font-3 fw-bold text-black me-4">Advertising</a>
      <a href="/sonic-id" class="pill-link rounded-pill font-3 fw-bold text-black">Sonic-ID</a>
    </div> -->
  </div>
</section>
