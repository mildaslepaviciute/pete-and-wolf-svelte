<script>
    import { onMount, onDestroy } from 'svelte';
    import { videoPlayerActive } from '$lib/store.js';
    
    export let videoId;
    export let poster = "";
    export let videoControls = false;
    
    let video;
    let isPlaying = false;
    let player = null;
    let componentId = Math.random().toString(36);
    
    const videoUrl = `https://vz-8d625025-b12.b-cdn.net/${videoId}/play_720p.mp4`;
    
    // Subscribe to the store to pause when another video starts
    const unsubscribe = videoPlayerActive.subscribe((activeVideoId) => {
        if (activeVideoId && activeVideoId !== componentId && isPlaying) {
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
        
        videoPlayerActive.set(componentId);
        video.play().catch(console.error);
    }
    
    function pauseVideo() {
        if (!video) return;
        
        video.pause();
        videoPlayerActive.update(current => current === componentId ? null : current);
    }
    
    function handlePlay() {
        isPlaying = true;
        videoPlayerActive.set(componentId);
    }
    
    function handlePause() {
        isPlaying = false;
        videoPlayerActive.update(current => current === componentId ? null : current);
    }
    
    onMount(() => {
        if (videoControls && video) {
            player = new Plyr(video, {
                controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
                fullscreen: {
                    enabled: true,
                    fallback: true, // Use fallback for iOS
                    iosNative: true, // Use native iOS fullscreen
                    container: null // Use the video element itself
                },
                // Mobile specific settings
                clickToPlay: true,
                keyboard: { focused: true, global: false },
                tooltips: { controls: false, seek: true },
                // Better mobile UX
                seekTime: 10,
                volume: 1,
                muted: false,
                hideControls: true,
                resetOnEnd: false,
                // Important for mobile fullscreen
                ratio: null, // Let video determine its own ratio
                invertTime: false,
                toggleInvert: true
            });
            
            player.on('play', handlePlay);
            player.on('pause', handlePause);
            
            // Add custom fullscreen handling for mobile
            player.on('enterfullscreen', (event) => {
                console.log('Entered fullscreen');
                // Force landscape orientation hint
                if (screen.orientation && screen.orientation.lock) {
                    screen.orientation.lock('landscape').catch(err => {
                        console.log('Could not lock orientation:', err);
                    });
                }
            });
            
            player.on('exitfullscreen', (event) => {
                console.log('Exited fullscreen');
                // Unlock orientation
                if (screen.orientation && screen.orientation.unlock) {
                    screen.orientation.unlock();
                }
            });
        }
    });
    
    onDestroy(() => {
        if (player) {
            player.destroy();
        }
        unsubscribe();
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
            webkit-playsinline
            x-webkit-airplay="allow"
            controls={videoControls ? true : false}
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
    
    /* Mobile fullscreen improvements */
    :global(.plyr) {
        width: 100% !important;
    }
    
    :global(.plyr video) {
        width: 100% !important;
        height: auto !important;
    }
    
    /* Ensure fullscreen works on mobile */
    :global(.plyr--fullscreen-active) {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 9999 !important;
    }
    
    :global(.plyr--fullscreen-active video) {
        width: 100% !important;
        height: 100% !important;
        object-fit: contain !important;
    }
    
    .has-controls {
        cursor: default;
    }
</style>