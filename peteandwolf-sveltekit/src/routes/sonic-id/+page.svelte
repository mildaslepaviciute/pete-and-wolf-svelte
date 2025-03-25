<script>
    import { renderBlocks } from "$lib/helpers.js";
    export let data;
    import Column from "$lib/components/Column.svelte";

    const { sonicIdData } = data;

    function getTitleAlignmentClass(alignment) {
        switch(alignment) {
            case 'center':
                return 'text-center';
            case 'right':
                return 'offset-md-6 text-start ps-md-23';
            case 'left':
            default:
                return 'text-start';
        }
    }
</script>

<svelte:head>
    <title>Pete & Wolf - {sonicIdData.title}</title>
    <meta name="description" content="Creating unique sonic identities">
</svelte:head>

{#each sonicIdData.sections as section, index}
    <div id={section.title.replace(/\s+/g, '-').toLowerCase()} class="mb-4 mb-last-0">
        {#if index === 0}
            <h1 class="font-2 mb-3 fw-bold {getTitleAlignmentClass(section.titleAlignment)}">{section.title}</h1>
        {:else}
            <h2 class="font-2 mb-3 fw-bold {getTitleAlignmentClass(section.titleAlignment)}">{section.title}</h2>
        {/if}
        <hr class="my-3">
        {#each section.blocks as block}
            <div class="row gy-3 gy-lg-0 mb-4 border-bottom">
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
            <hr class="my-3">
        {/each}
    </div>
{/each}