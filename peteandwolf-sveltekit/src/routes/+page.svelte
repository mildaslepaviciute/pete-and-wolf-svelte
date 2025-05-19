
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

.filled-stroked-text {
  color: #0022f7;                        /* teksto užpildymo spalva */
  -webkit-text-stroke: 1px black;     /* kontūro storis ir spalva */
  text-stroke: 3px #0022f7;             /* fallback kitiems naršyklėms */
}
</style>

<section class="h-100vh overflow-hidden" style="background-image: url('{homeData.backgroundImage.url}'); background-size: cover; background-position: center;">
  <div class="container h-100 d-flex flex-column justify-content-center" >
    <h1 class="w-lg-80 font-1 fw-bold filled-stroked-text">{homeData.title}</h1>
    <!-- commented links remain here -->
      <div class="d-flex mt-5rem d-none">
        <a href="/advertising" class="pill-link bg-blue font-3 fw-bold text-white me-4">Advertising</a>
        <a href="/sonic-id" class="pill-link font-3 fw-bold bg-blue text-white text-black">Sonic-ID</a>
      </div>
  </div>
</section>
