<script>
    export let videoId;
    export let poster = "";
    
    let video;
    let isPlaying = false;
    
    $: videoUrl = `https://vz-8d625025-b12.b-cdn.net/${videoId}/play_720p.mp4`;
    
    function togglePlay() {
        if (!video) return;
        
        if (video.paused) {
            video.play().catch(console.error);
            isPlaying = true;
        } else {
            video.pause();
            isPlaying = false;
        }
    }
    
    function handlePlay() {
        isPlaying = true;
    }
    
    function handlePause() {
        isPlaying = false;
    }
</script>

<div class="video-player">
    <div class="video-container" on:click={togglePlay}>
        <video
            bind:this={video}
            src={videoUrl}
            poster={poster?.url}
            playsinline
            on:play={handlePlay}
            on:pause={handlePause}
        >
        </video>
        
        {#if !isPlaying}
            <button class="play-button" on:click|stopPropagation={togglePlay}>
                <svg viewBox="0 0 24 24" width="48" height="48">
                    <circle cx="12" cy="12" r="12" fill="#0022f7" />
                    <path d="M9 8l8 4-8 4z" fill="white" />
                </svg>
            </button>
        {/if}
    </div>
</div>

<style>
    .video-player {
        position: relative;
        width: 100%;
    }
    
    .video-container {
        position: relative;
        cursor: pointer;
    }
    
    video {
        width: 100%;
        height: auto;
    }
    
    .play-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: none;
        border: none;
        cursor: pointer;
        transition: transform 0.2s;
    }
    
    .play-button:hover {
        transform: translate(-50%, -50%) scale(1.1);
    }
</style>