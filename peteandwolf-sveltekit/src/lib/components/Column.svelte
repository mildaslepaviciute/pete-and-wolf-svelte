<script>
    import { renderBlocks } from "$lib/helpers.js";
    import { onMount } from "svelte";
    import AudioPlayer from "./AudioPlayer.svelte";
    import VideoPlayer from "./VideoPlayer.svelte";

    export let columnData;
    export let grid;
    
    $: columnClass = grid === 1 ? "col-12" 
                  : grid === 2 ? "col-lg-6" 
                  : grid === 3 ? "col-lg-4" 
                  : "col-12";

    $: textAlignClass = columnData && columnData.textAlignment === 'right' ? 'text-end' 
                    : columnData && columnData.textAlignment === 'center' ? 'text-center' 
                    : 'text-start';


    onMount(() => {
        console.log(columnData)
    });
</script>

{#if columnData}
    <div class={columnClass}>
        {#if columnData.type === 'text'}
            <div class={textAlignClass}>
                {@html renderBlocks(columnData.textContent, true)}
            </div>
        {:else if columnData.type === 'image'}
            <img 
                src={columnData.imageContent.url} 
                alt={columnData.imageContent.alt || ''} 
                class="w-100"
            >
        {:else if columnData.type === 'audio'}
            <AudioPlayer audioUrl={columnData.audioContent.url} />
        {:else if columnData.type === 'video'}
            <VideoPlayer 
                videoId={columnData.videoId} 
                poster={columnData.videoPoster?.url || ""}
            />
        {/if}
    </div>
{/if}