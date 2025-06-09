<script>
  import { page } from "$app/stores";
  import { onMount, tick } from "svelte";
  import { gsap } from "gsap";
  import Column from "$lib/components/Column.svelte";

  export let data;
  const caseItems = data.caseItems;

  let wrapper;
  let mainContent;
  let previousSlug;
  let isFirstLoad = true;
  let isTransitioning = false;

  // Initialize currentProject directly
  let currentProject = caseItems.find(
    (item) => $page.params.slug && item.slug === $page.params.slug
  );

  // Watch for route changes and handle transitions
  $: {
    const newSlug = $page.params.slug;
    const newProject = caseItems.find(item => newSlug && item.slug === newSlug);
    
    if (newSlug !== previousSlug) {
      if (previousSlug && !isFirstLoad && newProject && !isTransitioning) {
        // Start transition
        animateContentTransition(newProject);
      } else if (newProject) {
        // First load or no previous slug
        currentProject = newProject;
        isFirstLoad = false;
      }
      previousSlug = newSlug;
    }
  }

  async function animateContentTransition(targetProject) {
    if (!mainContent || isTransitioning) return;
    
    console.log('Starting transition from', currentProject?.slug, 'to', targetProject?.slug);
    isTransitioning = true;
    
    // Fade out OLD content (currentProject is still the old one)
    await gsap.to(mainContent, {
      opacity: 0,
      duration: 0.5,
      ease: 'none'
    });
    
    console.log('Faded out, resetting scroll');
    
    // Reset scroll while invisible
    const mainContentArea = document.querySelector(".scrolling");
    if (mainContentArea) {
      mainContentArea.style.scrollBehavior = 'auto';
      mainContentArea.scrollTop = 0;
    }
    
    // Small delay to ensure scroll reset completes
    await new Promise(resolve => setTimeout(resolve, 50));
    
    console.log('Updating to new content');
    
    // NOW update to new content
    currentProject = targetProject;
    
    await tick(); // Wait for new content to render
    
    console.log('Fading in new content');
    
    // Fade in NEW content
    await gsap.to(mainContent, {
      opacity: 1,
      duration: 0.5,
      ease: 'none'
    });
    
    console.log('Transition complete');
    isTransitioning = false;
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
        zIndex: 1
      });
    }
  });
</script>

{#if currentProject}
  <div bind:this={wrapper} class="single-case-wrapper">
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
</style>