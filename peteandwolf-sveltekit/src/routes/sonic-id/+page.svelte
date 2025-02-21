<script>
    import { renderBlocks } from "$lib/helpers.js";
    export let data;
    import Column from "$lib/components/Column.svelte";

    const { sonicIdData } = data;
</script>

<svelte:head>
    <title>Pete & Wolf - {sonicIdData.title}</title>
    <meta name="description" content="Creating unique sonic identities">
</svelte:head>

{#each sonicIdData.sections as section, index}
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