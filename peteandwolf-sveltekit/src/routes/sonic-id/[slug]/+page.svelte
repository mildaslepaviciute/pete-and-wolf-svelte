<script>
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';

    export let data;
    const caseItems = data.caseItems;
    
    $: currentProject = caseItems.find(item => item.slug === $page.params.slug);

    function goBack() {
        goto('/sonic-id');
    }
</script>

{#if currentProject}
    <div id={currentProject.slug}>
        <h2 class="font-2 mb-3"><b>{currentProject.title}</b></h2>
        {#each currentProject.sections as section}
            <div id={section.title.replace(/\s+/g, '-').toLowerCase()} class="mb-4 mb-last-0">
                <h3>{section.title}</h3>
                {#each section.blocks as block}
                    <div class="row mb-3 mb-last-0">
                        {#if block.grid == 1}
                            <div class="col-lg-12">
                                {#if block.col_1.type == 'text'}
                                    <div>{block.col_1.content}</div>
                                {:else if block.col_1.type == 'image'}
                                    <img src={block.col_1.content} alt="" class="w-100">
                                {/if}
                            </div>
                        {:else if block.grid == 2}
                            <div class="col-lg-6">
                                {#if block.col_1.type == 'text'}
                                    <div>{block.col_1.content}</div>
                                {:else if block.col_1.type == 'image'}
                                    <img src={block.col_1.content} alt="" class="w-100">
                                {/if}
                            </div>
                            <div class="col-lg-6">
                                {#if block.col_2.type == 'text'}
                                    <div>{block.col_2.content}</div>
                                {:else if block.col_2.type == 'image'}
                                    <img src={block.col_2.content} alt="" class="w-100">
                                {/if}
                            </div>
                        {:else if block.grid == 3}
                            <div class="col-lg-4">
                                {#if block.col_1.type == 'text'}
                                    <div>{block.col_1.content}</div>
                                {:else if block.col_1.type == 'image'}
                                    <img src={block.col_1.content} alt="" class="w-100">
                                {/if}
                            </div>
                            <div class="col-lg-4">
                                {#if block.col_2.type == 'text'}
                                    <div>{block.col_2.content}</div>
                                {:else if block.col_2.type == 'image'}
                                    <img src={block.col_2.content} alt="" class="w-100">
                                {/if}
                            </div>
                            <div class="col-lg-4">
                                {#if block.col_3.type == 'text'}
                                    <div>{block.col_3.content}</div>
                                {:else if block.col_3.type == 'image'}
                                    <img src={block.col_3.content} alt="" class="w-100">
                                {/if}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    </div>
{/if}

