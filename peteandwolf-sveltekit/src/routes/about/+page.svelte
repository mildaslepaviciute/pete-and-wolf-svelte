<script>
  import { renderBlocks } from "$lib/helpers.js";
  import Column from "$lib/components/Column.svelte";
  export let data;
  const { aboutData } = data;
</script>

<svelte:head>
  <title>{aboutData.title} - Pete & Wolf</title>
  <meta name="description" content="We help you to unmute your brand" />
</svelte:head>

<section class="h-100vh pt-below-nav overflow-hidden">
  <div class="container h-100 d-flex flex-column">
    <div class="row align-items-stretch scrolling-mob gy-4 gy-lg-0 pb-4 pb-lg-0" id="aboutRow">
      <div class="col-lg-6 h-lg-100 d-flex flex-column">
        <div class="w-100">
          <img src={aboutData.mainImage.url} alt={aboutData.mainImage.alt || ""} class="w-100"/>
        </div>
      </div>
      <div class="col-lg-6 h-lg-100 d-flex flex-column scrolling-lg">
        <hr class="mt-0 mb-2 mb-lg-0">
        <h1 class="w-100 sticky-top bg-white font-2 font-3-mob mb-0 pb-0">
          <b>{aboutData.title}</b>
        </h1>
        <hr class="mb-3 mt-2 mt-lg-0">

        <div class="col-12 mb-4">
          {@html renderBlocks(aboutData.textContent, true)}
        </div>
        <div class="flex-grow-1 d-flex flex-column justify-content-end">
        <hr class="mb-2 d-none d-lg-block">
        <div class="row">
          <hr class="my-2 d-lg-none">
          <div class="col-lg-4 d-flex flex-column  justify-content-end ">
              {@html renderBlocks(aboutData.col_1, true, true)}

          </div>
          <hr class="my-2 d-lg-none">
          <div class="col-lg-3 d-flex flex-column  justify-content-end ">
              {@html renderBlocks(aboutData.col_2, true, true)}
          </div>
          <hr class="my-2 d-lg-none">
          <div class="col-lg-3 d-flex flex-column  justify-content-end ">
              {@html renderBlocks(aboutData.col_3, true, true)}
          </div>
          <hr class="my-2 d-lg-none">
          <div class="col-lg-2 d-flex flex-column  justify-content-end">
              {@html renderBlocks(aboutData.col_4, true, true)}
          </div>
          <hr class="my-2 d-lg-none">
        </div>
        <hr class="d-none d-lg-block mt-2 mb-0">
      </div>


        <!-- {#each aboutData.blocks as block}
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
        {/each} -->
      </div>
    </div>
  </div>
</section>
