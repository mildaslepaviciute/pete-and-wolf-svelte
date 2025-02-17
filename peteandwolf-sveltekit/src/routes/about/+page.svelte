<script>
  import { renderBlocks } from "$lib/helpers.js";
  export let data;
  const { aboutData } = data;
  console.log(aboutData.blocks);
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
          <div class="row gy-3 gy-lg-0 mb-3 mb-last-0">
            {#if block.grid === 1}
              <div class="col-12">
                {#if block.col_1.type === "text"}
                  {@html renderBlocks(block.col_1.textContent, true)}
                {:else if block.col_1.type === "image"}
                  <img
                    src={block.col_1.imageContent.url}
                    alt={block.col_1.imageContent.alt || ""}
                    class="w-100"
                  />
                {/if}
              </div>
            {:else if block.grid === 2}
              <div class="col-lg-6">
                {#if block.col_1.type === "text"}
                  {@html renderBlocks(block.col_1.textContent, true)}
                {:else if block.col_1.type === "image"}
                  <img
                    src={block.col_1.imageContent.url}
                    alt={block.col_1.imageContent.alt || ""}
                    class="w-100"
                  />
                {/if}
              </div>
              <div class="col-lg-6">
                {#if block.col_2.type === "text"}
                  {@html renderBlocks(block.col_2.textContent, true)}
                {:else if block.col_2.type === "image"}
                  <img
                    src={block.col_2.imageContent.url}
                    alt={block.col_2.imageContent.alt || ""}
                    class="w-100"
                  />
                {/if}
              </div>
            {:else if block.grid === 3}
              <div class="col-lg-4">
                {#if block.col_1.type === "text"}
                  {@html renderBlocks(block.col_1.textContent, true)}
                {:else if block.col_1.type === "image"}
                  <img
                    src={block.col_1.imageContent.url}
                    alt={block.col_1.imageContent.alt || ""}
                    class="w-100"
                  />
                {/if}
              </div>
              <div class="col-lg-4">
                {#if block.col_2.type === "text"}
                  {@html renderBlocks(block.col_2.textContent, true)}
                {:else if block.col_2.type === "image"}
                  <img
                    src={block.col_2.imageContent.url}
                    alt={block.col_2.imageContent.alt || ""}
                    class="w-100"
                  />
                {/if}
              </div>
              <div class="col-lg-4">
                {#if block.col_3.type === "text"}
                  {@html renderBlocks(block.col_3.textContent, true)}
                {:else if block.col_3.type === "image"}
                  <img
                    src={block.col_3.imageContent.url}
                    alt={block.col_3.imageContent.alt || ""}
                    class="w-100"
                  />
                {/if}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
