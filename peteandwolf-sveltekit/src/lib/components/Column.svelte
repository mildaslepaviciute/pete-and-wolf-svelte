<script>
    import { renderBlocks } from "$lib/helpers.js";
    import { onMount } from "svelte";
    import AudioPlayer from "./AudioPlayer.svelte";

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
            <div style="position:relative;padding-top:56.25%;" class="w-100">
                <iframe src="https://iframe.mediadelivery.net/embed/372334/{columnData.videoId}?preload=true&loop=false&muted=false&responsive=true"
                    loading="lazy"
                    style="border:0;position:absolute;top:0;height:100%;width:100%;"
                    allow="accelerometer;gyroscope;encrypted-media;picture-in-picture;"
                    allowfullscreen="true"
                    title="Video Player"
                    id="main-video"></iframe>
            </div>
        {/if}
    </div>
{/if}
