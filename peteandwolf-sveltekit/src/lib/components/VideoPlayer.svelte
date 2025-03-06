<script>
    export let videoId;
    export let poster = ""; // Optional thumbnail/poster image
    
    let video;
    let isPlaying = false;
    let progress = 0;
    let showControls = true;
    let videoUrl = `https://vz-8d625025-b12.b-cdn.net/${videoId}/play_720p.mp4`;
    
    function togglePlay() {
        if (!video) return;
        
        if (video.paused) {
            video.play()
                .then(() => {
                    isPlaying = true;
                    showControls = false;
                })
                .catch(error => {
                    console.error("Error playing video:", error);
                });
        }
    }
    
    function handleTimeUpdate() {
        if (!video) return;
        progress = (video.currentTime / video.duration) * 100 || 0;
    }

    function handleEnded() {
        isPlaying = false;
        progress = 0;
        showControls = true;
    }
    
    function handleContainerClick() {
        togglePlay();
    }
</script>

<div class="video-player">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="video-container" on:click={handleContainerClick} class:playing={isPlaying}>
        <video
            bind:this={video}
            src={videoUrl}
            playsinline
            on:timeupdate={handleTimeUpdate}
            on:ended={handleEnded}
            preload="metadata"
            class="w-100"
        >
            <track kind="captions" />
        </video>
        
        {#if showControls}
            <div class="play-button-overlay">
                <button 
                    class="play-button" 
                    aria-label="Play video"
                >
                    <div class="play-icon">
                        <svg viewBox="0 0 24 24" width="48" height="48">
                            <circle cx="12" cy="12" r="12" fill="#0022f7" />
                            <path d="M9 8l8 4-8 4z" fill="white" />
                        </svg>
                    </div>
                </button>
            </div>
        {/if}
    </div>
</div>

<style>
    .video-player {
        width: 100%;
        position: relative;
    }
    
    .video-container {
        position: relative;
        width: 100%;
        background-color: #000;
        cursor: pointer;
    }
    
    /* Remove cursor pointer when video is playing */
    .video-container.playing {
        cursor: default;
    }
    
    video {
        width: 100%;
        height: auto;
        display: block;
    }
    
    .play-button-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        /* background-color: rgba(0, 0, 0, 0.3); */
        transition: opacity 0.3s ease;
    }
    
    .play-button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        transition: transform 0.2s ease;
    }
    
    .play-button:hover {
        transform: scale(1.1);
    }
    
    .play-button:focus {
        outline: none;
    }
    
    .play-icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .video-container.playing .play-button-overlay {
        opacity: 0;
        pointer-events: none;
    }
</style>