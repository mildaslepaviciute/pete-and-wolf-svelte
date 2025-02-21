<script>
  import { renderBlocks } from "$lib/helpers.js";
  import Column from "$lib/components/Column.svelte";
  export let data;
  const { aboutData } = data;
</script>

<svelte:head>
  <title>Pete & Wolf - {aboutData.title}</title>
  <meta name="description" content="We help you to unmute your brand" />
</svelte:head>

<section class="h-100vh pt-below-nav overflow-hidden">
  <div class="container h-100 d-flex flex-column">
    <div
      class="row align-items-stretch scrolling-mob gy-4 gy-lg-0 pb-4 pb-lg-0"
      id="aboutRow"
    >
      <div class="col-lg-6 h-lg-100 d-flex flex-column">
        <div class="w-lg-100 h-lg-100 ratio ratio-1x1-mob">
          <img
            src={aboutData.mainImage.url}
            alt={aboutData.mainImage.alt || ""}
            class="object-fit-contain bg-for-image"
          />
        </div>
      </div>
      <div class="col-lg-6 h-lg-100 d-flex flex-column scrolling-lg">
        <h1 class="w-100 sticky-top bg-white font-2 pb-3 mb-0">
          <b>{aboutData.title}</b>
        </h1>

        <!-- src/routes/about/+page.svelte -->
        {#each aboutData.blocks as block}
          <div class="row gy-3 gy-lg-0 mb-4">
            {#if block.grid === 1}
                <Column columnData={block.col_1} grid={block.grid} />
            {:else if block.grid === 2}
                <Column columnData={block.col_1} grid={block.grid} />
                <Column columnData={block.col_2} grid={block.grid} />
            {:else if block.grid === 3}
                <Column columnData={block.col_1} grid={block.grid} />
                <Column columnData={block.col_2} grid={block.grid} />
                <Column columnData={block.col_3} grid={block.grid} />
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
