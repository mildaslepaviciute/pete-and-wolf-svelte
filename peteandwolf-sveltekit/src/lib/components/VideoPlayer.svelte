<script>
    export let videoId;
    export let poster = ""; // Optional thumbnail/poster image
    
    let video;
    let isPlaying = false;
    let progress = 0;
    let showControls = true;
    let showPoster = true;
    let hasUserInteracted = false; // Track user interaction for Safari
    
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
        hasUserInteracted = false;
        
        // If video element exists, reset it
        if (video) {
            video.pause();
            video.currentTime = 0;
            // Force reload for Safari
            const currentSrc = video.src;
            video.removeAttribute('src');
            video.load();
            video.src = currentSrc;
            video.load();
        }
    }
    
    function togglePlay() {
        if (!video) return;
        
        hasUserInteracted = true; // Mark that user has interacted
        
        if (video.paused) {
            showPoster = false;
            
            // Safari mobile specific handling
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        isPlaying = true;
                        showControls = false;
                    })
                    .catch(error => {
                        console.error("Error playing video:", error);
                        showPoster = true;
                        showControls = true;
                        
                        // Try loading the video again for Safari
                        if (error.name === 'NotAllowedError' || error.name === 'AbortError') {
                            video.load();
                        }
                    });
            } else {
                // Fallback for older browsers
                isPlaying = true;
                showControls = false;
            }
        } else {
            video.pause();
            isPlaying = false;
            showControls = true;
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
    
    function handleLoadedData() {
        // Video is ready to play - Safari specific
        console.log('Video loaded and ready');
    }
    
    function handleCanPlay() {
        // Video can start playing - Safari specific
        console.log('Video can play');
    }
    
    function handleLoadStart() {
        console.log('Video loading started');
    }
    
    function handleError(event) {
        console.error('Video error:', event);
        showPoster = true;
        showControls = true;
    }
    
    function handleContainerClick(event) {
        // Prevent event bubbling
        event.preventDefault();
        event.stopPropagation();
        togglePlay();
    }
    
    // React to component initialization and destruction
    import { onMount, onDestroy } from 'svelte';
    
    onMount(() => {
        // Component is mounted
        resetPlayer();
        
        // Safari mobile detection and setup
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isSafari && isMobile && video) {
            // Force load for Safari mobile
            video.load();
            
            // Add additional Safari-specific event listeners
            video.addEventListener('loadstart', handleLoadStart);
            video.addEventListener('loadeddata', handleLoadedData);
            video.addEventListener('canplay', handleCanPlay);
            video.addEventListener('error', handleError);
        }
    });
    
    onDestroy(() => {
        // Clean up when component is destroyed
        if (video) {
            video.pause();
            video.removeEventListener('loadstart', handleLoadStart);
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('error', handleError);
        }
    });
</script>

<div class="video-player">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
        class="video-container" 
        on:click={handleContainerClick} 
        class:playing={isPlaying}
        role="button"
        tabindex="0"
    >
        <!-- Key attribute forces element recreation when videoId changes -->
        <video
            bind:this={video}
            src={videoUrl}
            playsinline
            webkit-playsinline
            muted={false}
            controls={false}
            on:timeupdate={handleTimeUpdate}
            on:ended={handleEnded}
            on:loadeddata={handleLoadedData}
            on:canplay={handleCanPlay}
            on:error={handleError}
            preload="false"
            class="w-100"
            data-video-id={videoId}
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
                    on:click|stopPropagation={togglePlay}
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
        /* Safari mobile specific */
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
    }
    
    /* Remove cursor pointer when video is playing */
    .video-container.playing {
        cursor: default;
    }
    
    video {
        width: 100%;
        height: auto;
        display: block;
        /* Safari mobile specific */
        -webkit-playsinline: true;
        object-fit: contain;
    }
    
    .poster-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        /* Safari mobile specific */
        -webkit-tap-highlight-color: transparent;
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
        /* Safari mobile specific */
        -webkit-tap-highlight-color: transparent;
    }
    
    .play-button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        transition: transform 0.2s ease;
        /* Safari mobile specific */
        -webkit-tap-highlight-color: transparent;
        -webkit-appearance: none;
        appearance: none;
    }
    
    .play-button:hover {
        transform: scale(1.1);
    }
    
    .play-button:focus {
        outline: none;
    }
    
    .play-button:active {
        transform: scale(0.95);
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
    
    /* Safari mobile specific styles */
    @media screen and (-webkit-min-device-pixel-ratio: 2) {
        .video-container {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
        }
    }
</style>