<script>
    import { renderBlocks } from "$lib/helpers.js";
    export let data;

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
                    <div class="col-12">
                        {#if block.col_1.type === 'text'}
                            {@html renderBlocks(block.col_1.textContent, true)}
                        {:else if block.col_1.type === 'image'}
                            <img 
                                src={block.col_1.imageContent.url} 
                                alt={block.col_1.imageContent.alt || ''} 
                                class="w-100"
                            >
                        {:else if block.col_1.type === 'audio'}
                            <audio controls class="w-100">
                                <source src={block.col_1.audioContent.url} type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        {/if}
                    </div>
                {:else if block.grid === 2}
                    <div class="col-lg-6">
                        {#if block.col_1.type === 'text'}
                            {@html renderBlocks(block.col_1.textContent, true)}
                        {:else if block.col_1.type === 'image'}
                            <img 
                                src={block.col_1.imageContent.url} 
                                alt={block.col_1.imageContent.alt || ''} 
                                class="w-100"
                            >
                        {:else if block.col_1.type === 'audio'}
                            <audio controls class="w-100">
                                <source src={block.col_1.audioContent.url} type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        {/if}
                    </div>
                    <div class="col-lg-6">
                        {#if block.col_2.type === 'text'}
                            {@html renderBlocks(block.col_2.textContent, true)}
                        {:else if block.col_2.type === 'image'}
                            <img 
                                src={block.col_2.imageContent.url} 
                                alt={block.col_2.imageContent.alt || ''} 
                                class="w-100"
                            >
                        {:else if block.col_2.type === 'audio'}
                            <audio controls class="w-100">
                                <source src={block.col_2.audioContent.url} type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        {/if}
                    </div>
                {:else if block.grid === 3}
                    <div class="col-lg-4">
                        {#if block.col_1.type === 'text'}
                            {@html renderBlocks(block.col_1.textContent, true)}
                        {:else if block.col_1.type === 'image'}
                            <img 
                                src={block.col_1.imageContent.url} 
                                alt={block.col_1.imageContent.alt || ''} 
                                class="w-100"
                            >
                        {:else if block.col_1.type === 'audio'}
                            <audio controls class="w-100">
                                <source src={block.col_1.audioContent.url} type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        {/if}
                    </div>
                    <div class="col-lg-4">
                        {#if block.col_2.type === 'text'}
                            {@html renderBlocks(block.col_2.textContent, true)}
                        {:else if block.col_2.type === 'image'}
                            <img 
                                src={block.col_2.imageContent.url} 
                                alt={block.col_2.imageContent.alt || ''} 
                                class="w-100"
                            >
                        {:else if block.col_2.type === 'audio'}
                            <audio controls class="w-100">
                                <source src={block.col_2.audioContent.url} type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        {/if}
                    </div>
                    <div class="col-lg-4">
                        {#if block.col_3.type === 'text'}
                            {@html renderBlocks(block.col_3.textContent, true)}
                        {:else if block.col_3.type === 'image'}
                            <img 
                                src={block.col_3.imageContent.url} 
                                alt={block.col_3.imageContent.alt || ''} 
                                class="w-100"
                            >
                        {:else if block.col_3.type === 'audio'}
                            <audio controls class="w-100">
                                <source src={block.col_3.audioContent.url} type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        {/if}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
{/each}