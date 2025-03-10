<script>
    export let videoId;
    export let poster = ""; // Optional thumbnail/poster image
    
    let video;
    let isPlaying = false;
    let progress = 0;
    let showControls = true;
    let showPoster = true;
    
    // Make videoUrl reactive to videoId changes
    $: videoUrl = `https://vz-8d625025-b12.b-cdn.net/${videoId}/play_720p.mp4`;
    
    // Check if we have a valid poster
    $: hasPoster = poster && poster.url;
    
    // Watch for changes to videoId and reset the component state
    $: if (videoId) {
        resetPlayer();
    }
    
    function resetPlayer() {
        isPlaying = false;
        progress = 0;
        showControls = true;
        showPoster = true;
        
        // If video element exists, reset it
        if (video) {
            video.pause();
            video.currentTime = 0;
            video.src = videoUrl; // Force video source update
            video.load();         // Reload video element
        }
    }
    
    function togglePlay() {
        if (!video) return;
        
        if (video.paused) {
            showPoster = false;
            video.play()
                .then(() => {
                    isPlaying = true;
                    showControls = false;
                })
                .catch(error => {
                    console.error("Error playing video:", error);
                    showPoster = true;
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
        showPoster = true;
        
        if (video) {
            video.currentTime = 0;
        }
    }
    
    function handleContainerClick() {
        togglePlay();
    }
    
    // React to component initialization and destruction
    import { onMount, onDestroy } from 'svelte';
    
    onMount(() => {
        // Component is mounted
        resetPlayer();
    });
    
    onDestroy(() => {
        // Clean up when component is destroyed
        if (video) {
            video.pause();
        }
    });
</script>

<div class="video-player">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="video-container" on:click={handleContainerClick} class:playing={isPlaying}>
        <!-- Key attribute forces element recreation when videoId changes -->
        <video
            bind:this={video}
            src={videoUrl}
            playsinline
            on:timeupdate={handleTimeUpdate}
            on:ended={handleEnded}
            preload="metadata"
            class="w-100"
            key={videoId}
        >
            <track kind="captions" />
        </video>
        
        {#if hasPoster && showPoster}
            <div class="poster-overlay">
                <img src={poster.url} alt="" class="poster-image" />
            </div>
        {/if}
        
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
    
    .poster-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
    }
    
    .poster-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
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
        z-index: 2;
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