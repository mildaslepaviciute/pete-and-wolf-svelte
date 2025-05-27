<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import Column from "$lib/components/Column.svelte";

  export let data;
  const caseItems = data.caseItems;

  $: currentProject = caseItems.find(
    (item) => $page.params.slug && item.slug === $page.params.slug
  );

  let wrapper;
  let previousSlug;
  let isFirstLoad = true;

  // Animate on every slug change
  $: if ($page.params.slug !== previousSlug) {
    previousSlug = $page.params.slug;
    animateContentIn();
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

  function animateContentIn() {
    if (isFirstLoad) {
      isFirstLoad = false;
      gsap.set(wrapper, { opacity: 1, filter: 'blur(0px)' });
      return;
    }

    gsap.fromTo(
      wrapper,
      { opacity: 0, filter: 'blur(20px)' },
      {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.75,
        ease: 'power2.out'
      }
    );
  }
</script>

{#if currentProject}
  <div bind:this={wrapper}>
    <div id={currentProject.slug.current}>
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
{/if}
