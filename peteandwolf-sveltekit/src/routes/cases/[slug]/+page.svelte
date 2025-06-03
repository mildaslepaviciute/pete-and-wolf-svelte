<script>
  import { page } from "$app/stores";
  import { onMount, tick } from "svelte";
  import { gsap } from "gsap";
  import Column from "$lib/components/Column.svelte";

  export let data;
  const caseItems = data.caseItems;

  $: currentProject = caseItems.find(
    (item) => $page.params.slug && item.slug === $page.params.slug
  );

  let wrapper;
  let mainContent;
  let previousSlug;
  let isFirstLoad = true;

  // Store the previous project data for shadow content
  let shadowProject = null;
  let showShadow = false;

  // Watch for project changes and trigger animation
  $: if (currentProject && currentProject.slug !== previousSlug) {
    if (previousSlug && !isFirstLoad) {
      // Store current project as shadow before it changes
      shadowProject = caseItems.find(item => item.slug === previousSlug);
      animateContentTransition();
    } else {
      isFirstLoad = false;
    }
    previousSlug = currentProject.slug;
  }

  async function animateContentTransition() {
    if (!wrapper || !mainContent) return;

    // Show shadow content
    showShadow = true;
    
    await tick(); // Wait for shadow to render

    const shadowElement = wrapper.querySelector('.content-shadow');
    
    if (!shadowElement) return;

    // Position shadow content on top
    gsap.set(shadowElement, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 2,
      opacity: 1,
      filter: 'blur(0px)',
      pointerEvents: 'none'
    });

    // Set main content below and hidden initially
    gsap.set(mainContent, {
      opacity: 0,
      filter: 'blur(20px)',
      zIndex: 1
    });

    await tick(); // Wait for new content to render

    // Animate shadow content out and main content in
    const tl = gsap.timeline();
    
    tl.to(shadowElement, {
      opacity: 0,
      filter: 'blur(20px)',
      duration: 1.5,
      ease: 'power2.inOut'
    })
    .to(mainContent, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.inOut'
    }, 0)
    .call(() => {
      // Hide shadow content
      showShadow = false;
      shadowProject = null;
    });
  }

  function getTitleAlignmentClass(alignment) {
    switch (alignment) {
      case "center":
        return "text-center";
      case "right":
        return "offset-md-6 text-start ps-md-23";
      default:
        return "text-start";
    }
  }

  onMount(() => {
    if (mainContent) {
      gsap.set(mainContent, {
        opacity: 1,
        filter: 'blur(0px)',
        zIndex: 1
      });
    }
  });
</script>

{#if currentProject}
  <div bind:this={wrapper} class="single-case-wrapper">
    <!-- Shadow content (previous project) -->
    {#if showShadow && shadowProject}
      <div class="content-shadow">
        <div id={shadowProject.slug}>
          {#each shadowProject.sections as section, sectionIndex}
            <div
              id={section.title.replace(/\s+/g, '-').toLowerCase()}
              class="mb-last-0"
            >
              {#if sectionIndex === 0}
                <h1
                  class="{section.titleSize ? section.titleSize : 'font-2'} fw-bold pt-2 {getTitleAlignmentClass(section.titleAlignment)}"
                >
                  {section.title}
                </h1>
              {:else}
                <h2
                  class="{section.titleSize ? section.titleSize : 'font-2'} fw-bold pt-2 {getTitleAlignmentClass(section.titleAlignment)}"
                >
                  {section.title}
                </h2>
              {/if}
              <hr class="my-4" />
              {#each section.blocks as block, blockIndex}
                <div class="row gy-3 gy-lg-0">
                  {#if block.grid === 1}
                    <Column columnData={block.col_1} grid={block.grid} block_id={`shadow_${sectionIndex}_${blockIndex}_1`} />
                  {:else if block.grid === 2}
                    <Column columnData={block.col_1} grid={block.grid} block_id={`shadow_${sectionIndex}_${blockIndex}_1`} />
                    <Column columnData={block.col_2} grid={block.grid} block_id={`shadow_${sectionIndex}_${blockIndex}_2`} />
                  {:else if block.grid === 3}
                    <Column columnData={block.col_1} grid={block.grid} block_id={`shadow_${sectionIndex}_${blockIndex}_1`} />
                    <Column columnData={block.col_2} grid={block.grid} block_id={`shadow_${sectionIndex}_${blockIndex}_2`} />
                    <Column columnData={block.col_3} grid={block.grid} block_id={`shadow_${sectionIndex}_${blockIndex}_3`} />
                  {/if}
                </div>
                {#if !(sectionIndex === shadowProject.sections.length - 1 && blockIndex === section.blocks.length - 1)}
                  <hr class="my-4" />
                {/if}
              {/each}
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Main content (current project) -->
    <div bind:this={mainContent} class="main-content">
      <div id={currentProject.slug}>
        {#each currentProject.sections as section, sectionIndex}
          <div
            id={section.title.replace(/\s+/g, '-').toLowerCase()}
            class="mb-last-0"
          >
            {#if sectionIndex === 0}
              <h1
                class="{section.titleSize ? section.titleSize : 'font-2'} fw-bold pt-2 {getTitleAlignmentClass(section.titleAlignment)}"
              >
                {section.title}
              </h1>
            {:else}
              <h2
                class="{section.titleSize ? section.titleSize : 'font-2'} fw-bold pt-2 {getTitleAlignmentClass(section.titleAlignment)}"
              >
                {section.title}
              </h2>
            {/if}
            <hr class="my-4" />
            {#each section.blocks as block, blockIndex}
              <div class="row gy-3 gy-lg-0">
                {#if block.grid === 1}
                  <Column columnData={block.col_1} grid={block.grid} block_id={`${sectionIndex}_${blockIndex}_1`} />
                {:else if block.grid === 2}
                  <Column columnData={block.col_1} grid={block.grid} block_id={`${sectionIndex}_${blockIndex}_1`} />
                  <Column columnData={block.col_2} grid={block.grid} block_id={`${sectionIndex}_${blockIndex}_2`} />
                {:else if block.grid === 3}
                  <Column columnData={block.col_1} grid={block.grid} block_id={`${sectionIndex}_${blockIndex}_1`} />
                  <Column columnData={block.col_2} grid={block.grid} block_id={`${sectionIndex}_${blockIndex}_2`} />
                  <Column columnData={block.col_3} grid={block.grid} block_id={`${sectionIndex}_${blockIndex}_3`} />
                {/if}
              </div>
              {#if !(sectionIndex === currentProject.sections.length - 1 && blockIndex === section.blocks.length - 1)}
                <hr class="my-4" />
              {/if}
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .single-case-wrapper {
    position: relative;
    width: 100%;
    min-height: 100vh;
  }

  .main-content {
    width: 100%;
    min-height: 100vh;
  }

  .content-shadow {
    width: 100%;
    min-height: 100vh;
  }
</style>