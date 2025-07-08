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
    
    // Only trigger animations if the slug actually changed (not just hash/anchor changes)
    if (newSlug !== previousSlug && newSlug) {
      if (previousSlug && !isFirstLoad && newProject && !isTransitioning && newProject.slug !== currentProject?.slug) {
        // Start transition only if it's actually a different project
        animateContentTransition(newProject);
      } else if (newProject && (isFirstLoad || !currentProject)) {
        // First load or no current project
        currentProject = newProject;
        if (isFirstLoad) {
          // Add entrance animation for first load - much faster now
          setTimeout(() => {
            animateContentEntrance();
          }, 200);
        }
        isFirstLoad = false;
      } else if (newProject && newProject.slug === currentProject?.slug) {
        // Same project, just update reference but don't animate
        currentProject = newProject;
      }
      previousSlug = newSlug;
    }
  }

  function animateContentEntrance() {
    if (!mainContent) return;
    
    // Stagger animate content elements with faster timing
    gsap.to('.content-fade-up', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08, // Faster stagger
      ease: "power2.out"
    });
  }

  async function animateContentTransition(targetProject) {
    if (!mainContent || isTransitioning) return;
    
    console.log('Starting transition from', currentProject?.slug, 'to', targetProject?.slug);
    isTransitioning = true;
    
    // Reset scroll immediately
    const mainContentArea = document.querySelector(".scrolling");
    if (mainContentArea) {
      mainContentArea.style.scrollBehavior = 'auto';
      mainContentArea.scrollTop = 0;
      setTimeout(() => {
        mainContentArea.style.scrollBehavior = 'smooth';
      }, 50);
    }
    
    // Update to new content immediately
    currentProject = targetProject;
    
    await tick(); // Wait for new content to render
    
    // Reset content elements to hidden state
    gsap.set('.content-fade-up', {
      opacity: 0,
      y: 20
    });
    
    // Small delay then animate in new content
    setTimeout(() => {
      animateContentEntrance();
    }, 100);
    
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
    // Set initial state for all content elements immediately
    gsap.set('.content-fade-up', {
      opacity: 0,
      y: 20
    });
    
    // If we have a current project, animate it in
    if (currentProject) {
      setTimeout(() => {
        animateContentEntrance();
      }, 100);
    }

    console.log(caseItems)
  });
</script>

{#if currentProject}
  <div bind:this={wrapper} class="single-case-wrapper">
    <!-- Main content (current project) -->
    <div bind:this={mainContent} class="main-content">
      <!-- KEY CHANGE: Force recreation of entire content when project changes -->
      {#key currentProject.slug}
        <div id={currentProject.slug}>
          {#each currentProject.sections as section, sectionIndex}
            <div
              id={section.title.replace(/\s+/g, '-').toLowerCase()}
              class="mb-last-0 content-fade-up"
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
                <div class="row gy-3 gy-lg-0 content-fade-up">
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
                  <hr class="my-4 content-fade-up" />
                {/if}
              {/each}
            </div>
          {/each}
        </div>
      {/key}
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

  /* Set initial state for animated elements */
  :global(.content-fade-up) {
    opacity: 0;
    transform: translateY(20px);
  }
</style>