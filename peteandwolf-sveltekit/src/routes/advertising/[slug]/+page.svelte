<script>
    import { onMount, afterUpdate } from "svelte";
	import Swiper, { 
        Mousewheel, 
        FreeMode, 
    } from 'swiper';
    Swiper.use([Mousewheel, FreeMode]);
    import { page } from "$app/stores";
    import { gsap } from "gsap";
	import { renderBlocks } from "$lib/helpers.js";
    import { tick } from 'svelte';
    // Import HLS.js for better video streaming
    import Hls from 'hls.js';
    
    export let data;

	$: currentProject = data.advertisingProjects.find((p) => p.slug.current === $page.params.slug) || data.advertisingProjects[0];

    let rightColumn;
    let leftColumn;
    let swiper;
    let collapseElement;
    let collapseToggleButton;

    let desktopCredits;
    let previousSlug;
    let isFirstLoad = true;

    // Store previous project for animation
    let previousProject = null;
    let shadowCredits = null;

    $: if ($page.params.slug && desktopCredits) {
        if (previousSlug !== $page.params.slug) {
            // Store current project as previous before it changes
            previousProject = data.advertisingProjects.find((p) => p.slug.current === previousSlug);
            animateProjectTransition();
            previousSlug = $page.params.slug;
        }
    }

   async function animateProjectTransition() {
        if (isFirstLoad) {
            isFirstLoad = false;
            gsap.set(".fade-text", { y: 0 });
            return;
        }

        if (!previousProject) return;

        // Create shadow element with previous project content
        if (!shadowCredits) {
            shadowCredits = document.createElement('div');
            shadowCredits.className = 'credits-shadow d-none d-lg-flex font-8 pt-3 flex-column h-100';
            // Insert shadow as a child of desktopCredits container, not as a sibling
            desktopCredits.appendChild(shadowCredits);
        }

        // Populate shadow with previous project content
        shadowCredits.innerHTML = `
            <hr class="mt-0 mb-2">
            <div class="position-relative overflow-hidden">
                <div class="row justify-content-between align-items-center">
                    <div class="col-lg-8">
                        <h2 class="font-5 font-3-mt-negative mb-0 fade-text">${previousProject.title}</h2>
                    </div>
                    <div class="col-lg-4 text-lg-end">
                        <p class="mb-0 fade-text">${previousProject.type}</p>
                    </div>
                </div>
            </div>
            <hr class="mt-2 mb-0 border-black">
            <div class="flex-grow-1"></div>
            <div class="position-relative overflow-hidden">
                <div class="row justify-content-between align-items-end">
                    <div class="col-lg-5">
                        <div class="mb-0 fade-text">
                            ${renderBlocks(previousProject.description)}
                        </div>
                    </div>
                    <div class="col-lg-4 text-lg-end">
                        <div class="mb-0 fade-text">
                            ${renderBlocks(previousProject.credits)}
                        </div>
                    </div>
                </div>
            </div>
            <hr class="mt-2 mb-0">
        `;

        // Position shadow to cover exactly the same area as the main content
        gsap.set(shadowCredits, {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            opacity: 1,
            pointerEvents: 'none',
            background: 'inherit' // Inherit background from parent
        });

        // Hide main credits content (but keep container visible for positioning)
        const mainCreditsContent = desktopCredits.children;
        Array.from(mainCreditsContent).forEach(child => {
            if (child !== shadowCredits) {
                gsap.set(child, { opacity: 0 });
            }
        });

        // Set initial positions for shadow fade-text elements
        const shadowFadeElements = shadowCredits.querySelectorAll(".fade-text");
        gsap.set(shadowFadeElements, { y: 0 });

        await tick();

        // Show main credits content and set initial positions for new elements
        Array.from(mainCreditsContent).forEach(child => {
            if (child !== shadowCredits) {
                gsap.set(child, { opacity: 1 });
                const fadeElements = child.querySelectorAll(".fade-text");
                gsap.set(fadeElements, { y: '-5rem' });
            }
        });

        // Animate shadow elements out (slide down)
        await gsap.to(shadowFadeElements, {
            y: '5rem',
            duration: 0.5,
            ease: 'none',
        });

        // Get new fade elements from the main content (not shadow)
        const newFadeElements = [];
        Array.from(mainCreditsContent).forEach(child => {
            if (child !== shadowCredits) {
                const fadeElements = child.querySelectorAll(".fade-text");
                newFadeElements.push(...fadeElements);
            }
        });

        // Animate new elements in (slide up from above)
        gsap.to(newFadeElements, {
            y: 0,
            duration: 0.5,
            ease: 'none',
        });

        // Clean up shadow after animation
        setTimeout(() => {
            if (shadowCredits && shadowCredits.parentNode) {
                shadowCredits.remove();
                shadowCredits = null;
            }
        }, 600);
    }
    
    let currentVideoId = '';
    let isVideoFirstLoad = true;
    let videoLayerA;
    let videoLayerB;
    let activeLayer = 'A';
    let playerA;
    let playerB;
    let hlsA;
    let hlsB;

    let videoTransitionPromise = Promise.resolve();

    $: if (currentProject.videoId && currentProject.videoId !== currentVideoId) {
        videoTransitionPromise = videoTransitionPromise.then(async () => {
            await crossfadeVideo(currentProject.videoId);
            currentVideoId = currentProject.videoId;
        });
    }

 // Simple video player with mobile optimization
function createPlayer(videoElement, videoId) {
    const hlsUrl = `https://vz-8d625025-b12.b-cdn.net/${videoId}/playlist.m3u8`;
    const mp4Url = `https://vz-8d625025-b12.b-cdn.net/${videoId}/play_720p.mp4`;
    
    let hls = null;
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (Hls.isSupported()) {
        hls = new Hls({
            startLevel: 1, // Start at level 1 (second quality)
            maxBufferLength: 10,
            maxBufferSize: 20 * 1000 * 1000, // 20MB
        });
        
        hls.loadSource(hlsUrl);
        hls.attachMedia(videoElement);
        
        // Lock mobile to level 1
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (isMobile) {
                hls.currentLevel = 1; // Lock to level 1 on mobile
                console.log('Mobile detected: locked to quality level 1');
            }
        });
        
        // Simple error handling - just switch to MP4
        hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
                console.log('HLS failed, switching to MP4');
                hls.destroy();
                videoElement.src = mp4Url;
                videoElement.load();
            }
        });
        
    } else {
        // Fallback to MP4
        videoElement.src = mp4Url;
    }

    videoElement.preload = 'metadata';
    videoElement.playsInline = true;
    videoElement.load();
    
    // Simple Plyr setup
    const player = new Plyr(videoElement, {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        autoplay: true,
        muted: true,
    });

    return { player, hls };
}

    // Optimized crossfade with better loading detection
    async function crossfadeVideo(newVideoId) {
        // Ensure both layers exist
        if (!videoLayerA || !videoLayerB) return;

        if (isVideoFirstLoad) {
            console.log('First video load, initializing player');
            isVideoFirstLoad = false;
            
            // Create video element for Plyr
            videoLayerA.innerHTML = '<video id="player-a" playsinline style="width:100%;height:100%;"></video>';
            const videoElementA = videoLayerA.querySelector('#player-a');
            
            // Initialize first player
            try {
                const result = createPlayer(videoElementA, newVideoId);
                playerA = result.player;
                hlsA = result.hls;
            } catch (error) {
                console.error('Error creating player:', error);
                return;
            }
            
            return;
        }

        console.log('Crossfading to new video:', newVideoId);

        // Determine which layer to use for the new video
        const currentLayer = activeLayer === 'A' ? videoLayerA : videoLayerB;
        const newLayer = activeLayer === 'A' ? videoLayerB : videoLayerA;
        const currentPlayer = activeLayer === 'A' ? playerA : playerB;

        if (currentPlayer) {
            currentPlayer.muted = true; // Ensure current player is muted
        }
        
        // Create unique player ID
        const newPlayerId = activeLayer === 'A' ? 'player-b' : 'player-a';

        // Ensure current layer is visible and interactive
        gsap.set(currentLayer, {
            opacity: 1,
            filter: 'blur(0px)',
            zIndex: 1,
            pointerEvents: 'auto'
        });

        // Set up new layer with new video player (hidden initially)
        newLayer.innerHTML = `<video id="${newPlayerId}" playsinline preload="metadata" style="width:100%;height:100%;"></video>`;
        const newVideoElement = newLayer.querySelector(`#${newPlayerId}`);

        gsap.set(newLayer, { 
            opacity: 0, 
            filter: 'blur(10px)', // Reduced blur for better performance
            zIndex: 2,
            pointerEvents: 'none'
        });

        // Create new player instance
        let newPlayer, newHls;
        try {
            const result = createPlayer(newVideoElement, newVideoId);
            newPlayer = result.player;
            newHls = result.hls;
            newPlayer.muted = false; // Unmute new player
        } catch (error) {
            console.error('Error creating new player:', error);
            return;
        }
        
        // Store reference to new player and HLS instance
        if (activeLayer === 'A') {
            playerB = newPlayer;
            hlsB = newHls;
        } else {
            playerA = newPlayer;
            hlsA = newHls;
        }

        await new Promise(resolve => setTimeout(resolve, 500));


        console.log('Starting optimized video crossfade animation');

        // Faster crossfade animation
        const tl = gsap.timeline();

        // Simultaneous fade out/in with reduced duration
        tl.to(currentLayer, {
            opacity: 0,
            filter: 'blur(10px)',
            duration: 0.5, // Reduced from 1.5s
            ease: 'power2.inOut'
        })
        .to(newLayer, {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.4, // Faster fade in
            ease: 'power2.out'
        }, 0.1) // Small overlap for smoother transition
        .call(() => {
            // Switch interaction states
            gsap.set(currentLayer, { pointerEvents: 'none' });
            gsap.set(newLayer, { pointerEvents: 'auto' });
            
            // Clean up old HLS instance
            const oldHls = activeLayer === 'A' ? hlsA : hlsB;
            if (oldHls) {
                oldHls.destroy();
                if (activeLayer === 'A') {
                    hlsA = null;
                } else {
                    hlsB = null;
                }
            }
            
            // Update active layer for next transition
            activeLayer = activeLayer === 'A' ? 'B' : 'A';
        });

        return tl;
    }

    let isPanelOpen = false;

    function toggleCreditsPanel() {
        isPanelOpen = !isPanelOpen;
        
        if (isPanelOpen) {
            collapseElement.style.transform = 'translateX(0)';
            collapseToggleButton.textContent = '— Credits';
        } else {
            collapseElement.style.transform = 'translateX(100%)';
            collapseToggleButton.textContent = '+ Credits';
        }
    }
    
	function updateActiveSlides(slug) {
		if (!swiper) return;

		const allSlideLinks = swiper.el.querySelectorAll(".swiper-slide-link");

		allSlideLinks.forEach((link) => {
			link.classList.remove("swiper-slide-link-active");
		});

		allSlideLinks.forEach((link) => {
			if (link.dataset.slug === slug) {
				link.classList.add("swiper-slide-link-active");
			}
		});
	}

// Simple video feed - waits for ALL videos to load
let videosToLoad = new Set();
let videosLoaded = new Set();
let allVideosReady = false;

function startVideoFeed() {
    if (!swiper) {
        setTimeout(startVideoFeed, 100);
        return;
    }
    
    console.log('🎬 Starting video feed - waiting for ALL videos to load');
    
    const videoElements = swiper.el.querySelectorAll('.video-feed-item');
    
    // Get unique video IDs (skip duplicates from loop)
    const uniqueVideos = new Map();
    videoElements.forEach(video => {
        const videoId = video.dataset.videoId;
        if (videoId && !uniqueVideos.has(videoId)) {
            uniqueVideos.set(videoId, video);
            videosToLoad.add(videoId);
        }
    });
    
    console.log(`📊 Need to load ${videosToLoad.size} unique videos`);
    
    // Setup each unique video
    uniqueVideos.forEach((video, videoId) => {
        video.muted = true;
        video.volume = 0;
        video.loop = true;
        video.setAttribute('muted', '');
        
        video.addEventListener('canplay', () => {
            videosLoaded.add(videoId);
            console.log(`✅ Video ${videoId} loaded (${videosLoaded.size}/${videosToLoad.size})`);
            
            // Check if all are loaded
            if (videosLoaded.size === videosToLoad.size && !allVideosReady) {
                console.log('🎉 ALL VIDEOS LOADED - Starting playback!');
                allVideosReady = true;
                startAllVideos();
            }
        }, { once: true });
        
        video.addEventListener('error', (e) => {
            console.error(`❌ Video ${videoId} failed to load:`, e);
            videosLoaded.add(videoId); // Count as "loaded" so we don't wait forever
            
            if (videosLoaded.size === videosToLoad.size && !allVideosReady) {
                console.log('🎉 ALL VIDEOS PROCESSED - Starting playback!');
                allVideosReady = true;
                startAllVideos();
            }
        }, { once: true });
        
        video.load();
    });
}

function startAllVideos() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            const videoId = video.dataset.videoId;
            
            if (entry.isIntersecting) {
                console.log(`👁️ Video ${videoId} visible - playing`);
                video.play().catch(e => console.log('Play failed:', e));
            } else {
                console.log(`👁️‍🗨️ Video ${videoId} hidden - pausing`);
                video.pause();
            }
        });
    }, { 
        threshold: 0.1,
        root: swiper.el
    });
    
    // Start observing all videos now
    const videos = swiper.el.querySelectorAll('.video-feed-item');
    videos.forEach(video => observer.observe(video));
}

// Reset when needed
function resetVideoFeed() {
    videosToLoad.clear();
    videosLoaded.clear();
    allVideosReady = false;
}

onMount(() => {
    swiper = new Swiper(".scrollSwiperAdvertising", {
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: {
            enabled: true,
            momentum: true,
        },
        loop: true,
        mousewheel: {
            releaseOnEdges: true,
        },
        simulateTouch: window.innerWidth < 992,
        on: {
            init: function() {
                console.log('Swiper initialized, starting video feed');
                setTimeout(() => {
                    startVideoFeed();
                }, 50);
            }
        }
    });

    window.addEventListener("resize", updateSwiperTouch);
    updateActiveSlides($page.params.slug);
    saveVideoSize();

    const closeCollapse = (event) => {
        if (isPanelOpen && collapseElement && !collapseElement.contains(event.target) && !collapseToggleButton.contains(event.target)) {
            toggleCreditsPanel();
        }
    };
    document.addEventListener("click", closeCollapse);

    return () => {
        if (closeCollapse) {
            document.removeEventListener("click", closeCollapse);
        }
        // Clean up players and HLS instances
        if (playerA && playerA.destroy) {
            playerA.destroy();
        }
        if (playerB && playerB.destroy) {
            playerB.destroy();
        }
        if (hlsA) {
            hlsA.destroy();
        }
        if (hlsB) {
            hlsB.destroy();
        }
    };
});


	function updateSwiperTouch() {
		const isMobile = window.innerWidth < 992;
		swiper.params.simulateTouch = isMobile;
		swiper.update();
	}


	$: if ($page.params.slug) {
		updateActiveSlides($page.params.slug);
	}

    function saveVideoSize() {
        const mainVideoContainer = document.querySelector('#main-video-container');
        
        if (!mainVideoContainer) return;

        document.documentElement.style.setProperty('--video-width', `${mainVideoContainer.offsetWidth}px`);
        document.documentElement.style.setProperty('--video-height', `${mainVideoContainer.offsetHeight}px`);
    }

</script>

<svelte:head>
    <title>{currentProject?.title ?? 'Advertising'} - Pete & Wolf</title>
    <meta name="description" content="{currentProject?.description ?? ''}">
</svelte:head>

<section class="h-100vh pt-below-nav overflow-hidden">
    <div class="container h-100 d-flex flex-column" id="advertisingContainer">
        <div class="row align-items-stretch max-h-screen h-100" id="advertisingRow">
            <!-- Main Content Column -->
            <div class="col-lg-8 d-flex flex-column px-0-mob h-lg-100" bind:this={leftColumn}>
                <div class="position-relative d-flex d-lg-none">
                    <!-- Collapse toggle button -->
                    <div class="position-absolute dropstart text-rotate top-0 end-0 text-end" style="z-index: 15;">
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div class="bg-blue font-5 fw-bold text-white text-center py-4 credits-toggle" 
                            style="width: 30px; min-height: 150px; cursor: pointer;"
                            bind:this={collapseToggleButton}
                            on:click={toggleCreditsPanel}>
                            + Credits
                        </div>
                    </div>

                    <!-- Mobile credits panel - Custom implementation -->
                    <div class="position-absolute credits-panel" 
                        style="top: 1px; right: 0; z-index: 10; transform: translateX(100%); transition: transform 0.3s ease-in-out;"
                        bind:this={collapseElement}>
                        <div class="card card-body border-0 rounded-0 font-9 p-3" 
                            id="cardCredits"
                            style="width: 100%">
                            <h2 class="font-7 text-underline" fm-fade-in>{currentProject?.title}</h2>
                            <div class="mb-0" fm-fade-in style="max-width:75%">
                                {@html renderBlocks(currentProject.description)}
                            </div>
                            <p fm-fade-in>{currentProject.type}</p>
                            <p class="mb-0" fm-fade-in>
                                {@html renderBlocks(currentProject.credits)}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Video Container -->
                <div class="border border-black border-x-0-mob bg-black" id="main-video-container">
                    <div class="video-wrapper">
                        <!-- Video A (initial + persistent layer) -->
                        <div class="video-layer" bind:this={videoLayerA}>
                            <!-- Plyr video will be inserted here -->
                        </div>

                        <!-- Video B (animated in) -->
                        <div class="video-layer" bind:this={videoLayerB}></div>
                    </div>
                </div>

                <!-- Desktop credits section -->
                <div class="d-none d-lg-flex font-8 pt-3 flex-column h-100" bind:this={desktopCredits} style="position: relative;">
                    <hr class="mt-0 mb-2">
                    <div class="position-relative overflow-hidden">
                        <div class="row justify-content-between align-items-center">
                            <div class="col-lg-8">
                                <h2 class="font-5 font-3-mt-negative mb-0 fade-text" >{currentProject.title}</h2>
                            </div>
                            <div class="col-lg-4 text-lg-end">
                                <p class="mb-0 fade-text" >{currentProject.type}</p>
                            </div>
                        </div>
                    </div>
                    <hr class="mt-2 mb-0 border-black">
                    <div class="flex-grow-1"></div>
                    <div class="position-relative overflow-hidden">
                        <div class="row justify-content-between align-items-end">
                            <div class="col-lg-5">
                                <div class="mb-0 fade-text">
                                    {@html renderBlocks(currentProject.description)}
                                </div>
                            </div>
                            <div class="col-lg-4 text-lg-end">
                                <div class="mb-0 fade-text">
                                    {@html renderBlocks(currentProject.credits)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="mt-2 mb-0">
                </div>
            </div>

            <!-- Projects List Column -->
            <div class="col-lg-4 ps-lg-1 px-0-mob h-100" bind:this={rightColumn}>
                <div class="h-100 border border-black border-x-0-mob border-top-0-mob overflow-hidden">
                    <div class="swiper-container scrollSwiperAdvertising">
                        <div class="swiper-wrapper h-100">
                            {#each data.advertisingProjects as project}
                                <div class="swiper-slide">
                                    <a href="/advertising/{project.slug.current}"
                                    class="d-flex align-items-center border-bottom border-black text-decoration-none swiper-slide-link"
                                    data-slug={project.slug.current}>
                                        <div class="w-35 bg-black border-end border-black ratio ratio-16x9">
                                           <video 
                                                class="w-100 object-fit-cover video-feed-item" 
                                                playsinline
                                                loop 
                                                muted
                                                preload="none"
                                                data-video-id="{project.videoPreviewId || project.videoId}"
                                                poster="https://vz-8d625025-b12.b-cdn.net/{project.videoPreviewId || project.videoId}/thumbnail.jpg"
                                            >
                                                <source src="https://vz-8d625025-b12.b-cdn.net/{project.videoPreviewId || project.videoId}/play_240p.mp4" type="video/mp4">
                                            </video>
                                        </div>
                                        <div class="w-65 h-100 d-flex align-items-center font-7 px-3 text-black">
                                            {project.title}
                                        </div>
                                    </a>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .video-wrapper {
        position: relative;
        width: 100%;
        padding-top: 56.25%;
        height: 0;
    }

    .video-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        backface-visibility: hidden;
        transform: translateZ(0);
        pointer-events: auto;
    }

    .video-layer + .video-layer {
        pointer-events: none;
        z-index: 2;
    }

    :global(.plyr) {
        width: 100% !important;
        height: 100% !important;
    }

    :global(.plyr__video-wrapper) {
        height: 100% !important;
    }

    :global(.plyr video) {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover;
    }

    :global(.plyr--video .plyr__controls) {
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
    }

    :global(.plyr__control--overlaid) {
        background: rgba(0, 0, 0, 0.8);
    }

    /* Shadow credits styling */
    :global(.credits-shadow) {
        backface-visibility: hidden;
        transform: translateZ(0);
    }
</style>