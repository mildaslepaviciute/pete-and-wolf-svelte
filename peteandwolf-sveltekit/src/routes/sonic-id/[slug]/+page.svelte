<script>
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    import { renderBlocks } from "$lib/helpers.js";

    export let data;
    const caseItems = data.caseItems;
    
    $: currentProject = caseItems.find(item => item.slug === $page.params.slug);
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
                    <div class="row gy-3 gy-lg-0 mb-3 mb-last-0">
                        {#if block.grid == 1}
                            <div class="col-lg-12">
                                {#if block.col_1.type == 'text'}
                                    <div>{@html renderBlocks(block.col_1.textContent)}</div>
                                {:else if block.col_1.type == 'image'}
                                    <img src={block.col_1.imageContent.url} alt="" class="w-100">
                                {/if}
                            </div>
                        {:else if block.grid == 2}
                            <div class="col-lg-6">
                                {#if block.col_1.type == 'text'}
                                    <div>{@html renderBlocks(block.col_1.textContent)}</div>
                                {:else if block.col_1.type == 'image'}
                                    <img src={block.col_1.imageContent.url} alt="" class="w-100">
                                {/if}
                            </div>
                            <div class="col-lg-6">
                                {#if block.col_2.type == 'text'}
                                    <div>{@html renderBlocks(block.col_2.textContent)}</div>
                                {:else if block.col_2.type == 'image'}
                                    <img src={block.col_2.imageContent.url} alt="" class="w-100">
                                {/if}
                            </div>
                        {:else if block.grid == 3}
                            <div class="col-lg-4">
                                {#if block.col_1.type == 'text'}
                                    <div>{@html renderBlocks(block.col_1.textContent)}</div>
                                {:else if block.col_1.type == 'image'}
                                    <img src={block.col_1.imageContent.url} alt="" class="w-100">
                                {/if}
                            </div>
                            <div class="col-lg-4">
                                {#if block.col_2.type == 'text'}
                                    <div>{@html renderBlocks(block.col_2.textContent)}</div>
                                {:else if block.col_2.type == 'image'}
                                    <img src={block.col_2.imageContent.url} alt="" class="w-100">
                                {/if}
                            </div>
                            <div class="col-lg-4">
                                {#if block.col_3.type == 'text'}
                                    <div>{@html renderBlocks(block.col_3.textContent)}</div>
                                {:else if block.col_3.type == 'image'}
                                    <img src={block.col_3.imageContent.url} alt="" class="w-100">
                                {/if}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    </div>
{/if}