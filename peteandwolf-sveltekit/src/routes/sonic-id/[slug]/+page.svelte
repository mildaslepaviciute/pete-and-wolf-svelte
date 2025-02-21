<script>
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    import { renderBlocks } from "$lib/helpers.js";
    import AudioPlayer from "$lib/components/AudioPlayer.svelte";
    import { on } from "svelte/events";
    import { onMount } from "svelte";
    import Column from "$lib/components/Column.svelte";

    export let data;
    const caseItems = data.caseItems;
    
    $: currentProject = caseItems.find(item =>  $page.params.slug && item.slug === $page.params.slug);

</script>

{#if currentProject}
    <div id={currentProject.slug.current}>
        {#each currentProject.sections as section, index}
            <div id={section.title.replace(/\s+/g, '-').toLowerCase()} class="mb-4 mb-last-0">
                {#if index === 0}
                    <h1 class="font-2 mb-3 fw-bold">{section.title}</h1>
                {:else}
                    <h2 class="font-2 mb-3 fw-bold">{section.title}</h2>
                {/if}
                {#each section.blocks as block}
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
        {/each}
    </div>
{/if}