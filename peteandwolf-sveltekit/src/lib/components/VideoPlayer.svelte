<script>
    import { onMount, onDestroy } from 'svelte';
    import { videoPlayerActive } from '$lib/store.js';
    
    export let videoId;
    export let poster = "";
    export let videoControls = false;
    
    let video;
    let isPlaying = false;
    let player = null;
    let componentId = Math.random().toString(36); // Unique ID for this component instance
    
    const videoUrl = `https://vz-8d625025-b12.b-cdn.net/${videoId}/play_720p.mp4`;
    
    // Subscribe to the store to pause when another video starts
    const unsubscribe = videoPlayerActive.subscribe((activeVideoId) => {
        if (activeVideoId && activeVideoId !== componentId && isPlaying) {
            // Another video is playing, pause this one
            pauseVideo();
        }
    });
    
    function togglePlay() {
        if (!video || videoControls) return;
        
        if (video.paused) {
            playVideo();
        } else {
            pauseVideo();
        }
    }
    
    function playVideo() {
        if (!video) return;
        
        // Set this video as the currently playing one
        videoPlayerActive.set(componentId);
        video.play().catch(console.error);
    }
    
    function pauseVideo() {
        if (!video) return;
        
        video.pause();
        // Clear the currently playing video if it's this one
        videoPlayerActive.update(current => current === componentId ? null : current);
    }
    
    function handlePlay() {
        isPlaying = true;
        // Set this video as playing when it starts (for Plyr controls too)
        videoPlayerActive.set(componentId);
    }
    
    function handlePause() {
        isPlaying = false;
        // Clear if this video stops
        videoPlayerActive.update(current => current === componentId ? null : current);
    }
    
    onMount(() => {
        if (videoControls && video) {
            player = new Plyr(video, {
                controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
            });
            
            player.on('play', handlePlay);
            player.on('pause', handlePause);
        }
    });
    
    onDestroy(() => {
        if (player) {
            player.destroy();
        }
        unsubscribe(); // Clean up store subscription
        // Clear this video from store if it was playing
        videoPlayerActive.update(current => current === componentId ? null : current);
    });
</script>

<div class="video-player">
    <div 
        class="video-container"
        on:click={togglePlay}
        class:has-controls={videoControls}
    >
        <video
            bind:this={video}
            src={videoUrl}
            poster={poster?.url}
            playsinline
            on:play={handlePlay}
            on:pause={handlePause}
        >
        </video>
        
        {#if !videoControls && !isPlaying}
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
    }
    
    .video-container:not(.has-controls) {
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
        z-index: 2;
    }
    
    .play-button:hover {
        transform: translate(-50%, -50%) scale(1.1);
    }
    
    :global(.plyr) {
        width: 100% !important;
    }
    
    :global(.plyr video) {
        width: 100% !important;
        height: auto !important;
    }
    
    .has-controls {
        cursor: default;
    }
</style>