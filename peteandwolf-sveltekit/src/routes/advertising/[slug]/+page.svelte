<script>
    import { onMount, afterUpdate } from "svelte";
    import { page } from "$app/stores";
    import { gsap } from "gsap";
	import { renderBlocks } from "$lib/helpers.js";
    import { tick } from 'svelte';
    import Hls from 'hls.js';
    import Swiper, { 
        Mousewheel, 
        FreeMode, 
    } from 'swiper';
    Swiper.use([Mousewheel, FreeMode]);
    
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
    let previousProject = null;
    let shadowCredits = null;
    let hasInitAnimated = false; // Separate flag for init animations

    $: if ($page.params.slug && desktopCredits && hasInitAnimated) { // Only run after init animations
        if (previousSlug !== $page.params.slug) {
            previousProject = data.advertisingProjects.find((p) => p.slug.current === previousSlug);
            animateProjectTransition();
            previousSlug = $page.params.slug;
        }
    }

    // INITIAL LOAD ANIMATIONS - runs once only
    function initializeAnimations() {
        if (hasInitAnimated) return;
        
        console.log('🎬 Starting initial load animations');
        
        // Create main timeline for initial load
        const initTl = gsap.timeline();

        // Animate video container with blur fade-in
        initTl.to('#main-video-container', {
            opacity: 1,
            // filter: 'blur(0px)',
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out"
        })
        // Animate thumbnails with stagger (but NOT the duplicates)
        .to('.thumbnail-item:not(.swiper-slide-duplicate)', {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: "power2.out",
            onComplete: () => {
                // Make sure all thumbnails (including clones) are visible after animation
                gsap.set('.thumbnail-item', { opacity: 1, y: 0 });
            }
        }, 0.3)
        // Animate static elements (just fade)
        .to('.init-fade-element', {
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out"
        }, 0.6)
        // Animate desktop credits text with proper individual targeting
        .to('.credits-title', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        }, 0.8)
        .to('.credits-type', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        }, 0.9)
        .to('.credits-description', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        }, 1.0)
        .to('.credits-credits', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
                // Mark init animations as complete AND set up for transitions
                hasInitAnimated = true;
                isFirstLoad = false; // Now transitions can work properly
                // Initialize previousSlug for future transitions
                if ($page.params.slug) {
                    previousSlug = $page.params.slug;
                }
                console.log('🎬 Init animations complete, transitions now enabled');
            }
        }, 1.1);
    }

    // PROJECT TRANSITION ANIMATIONS - original working version
    async function animateProjectTransition() {
        // Remove the isFirstLoad check since we handle it in initializeAnimations
        console.log('🔄 Starting project transition animation');
        
        if (!previousProject) return;

        if (!shadowCredits) {
            shadowCredits = document.createElement('div');
            shadowCredits.className = 'credits-shadow d-none d-lg-flex font-8 pt-3 flex-column h-100';
            desktopCredits.appendChild(shadowCredits);
        }

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

        gsap.set(shadowCredits, {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            opacity: 1,
            pointerEvents: 'none',
            background: 'inherit'
        });

        const mainCreditsContent = desktopCredits.children;
        Array.from(mainCreditsContent).forEach(child => {
            if (child !== shadowCredits) {
                gsap.set(child, { opacity: 0 });
            }
        });

        const shadowFadeElements = shadowCredits.querySelectorAll(".fade-text");
        gsap.set(shadowFadeElements, { y: 0 });

        await tick();

        Array.from(mainCreditsContent).forEach(child => {
            if (child !== shadowCredits) {
                gsap.set(child, { opacity: 1 });
                const fadeElements = child.querySelectorAll(".fade-text");
                gsap.set(fadeElements, { y: '-5rem' });
            }
        });

        await gsap.to(shadowFadeElements, {
            y: '5rem',
            duration: 0.5,
            ease: 'none',
        });

        const newFadeElements = [];
        Array.from(mainCreditsContent).forEach(child => {
            if (child !== shadowCredits) {
                const fadeElements = child.querySelectorAll(".fade-text");
                newFadeElements.push(...fadeElements);
            }
        });

        gsap.to(newFadeElements, {
            y: 0,
            duration: 0.5,
            ease: 'none',
        });

        // Also animate mobile credits
        setTimeout(() => {
            const mobileCreditsElements = document.querySelectorAll('.mobile-fade-element');
            if (mobileCreditsElements.length > 0) {
                gsap.set(mobileCreditsElements, { opacity: 0 });
                gsap.to(mobileCreditsElements, {
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out"
                });
            }
        }, 100);

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

    function createPlayer(videoElement, videoId) {
        const hlsUrl = `https://vz-8d625025-b12.b-cdn.net/${videoId}/playlist.m3u8`;
        const mp4Url = `https://vz-8d625025-b12.b-cdn.net/${videoId}/play_720p.mp4`;
        
        let hls = null;
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (Hls.isSupported()) {
            hls = new Hls({
                startLevel: 1,
                maxBufferLength: 3,
                maxBufferSize: 5 * 1000 * 1000,
            });
            
            hls.loadSource(hlsUrl);
            hls.attachMedia(videoElement);
            
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (isMobile) {
                    hls.currentLevel = 1;
                    console.log('Mobile detected: locked to quality level 1');
                }
            });
            
            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    console.log('HLS failed, switching to MP4');
                    hls.destroy();
                    videoElement.src = mp4Url;
                    videoElement.load();
                }
            });
            
        } else {
            videoElement.src = mp4Url;
        }

        videoElement.preload = 'metadata';
        videoElement.playsInline = true;
        videoElement.load();
        
        const player = new Plyr(videoElement, {
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
            autoplay: true,
            muted: true,
        });

        return { player, hls };
    }

    async function crossfadeVideo(newVideoId) {
        if (!videoLayerA || !videoLayerB) return;

        if (isVideoFirstLoad) {
            console.log('First video load, initializing player');
            isVideoFirstLoad = false;
            
            videoLayerA.innerHTML = '<video id="player-a" playsinline style="width:100%;height:100%;"></video>';
            const videoElementA = videoLayerA.querySelector('#player-a');
            
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

        const currentLayer = activeLayer === 'A' ? videoLayerA : videoLayerB;
        const newLayer = activeLayer === 'A' ? videoLayerB : videoLayerA;
        const currentPlayer = activeLayer === 'A' ? playerA : playerB;

        if (currentPlayer) {
            currentPlayer.muted = true;
        }
        
        const newPlayerId = activeLayer === 'A' ? 'player-b' : 'player-a';

        gsap.set(currentLayer, {
            opacity: 1,
            // filter: 'blur(0px)',
            zIndex: 1,
            pointerEvents: 'auto'
        });

        newLayer.innerHTML = `<video id="${newPlayerId}" playsinline preload="metadata" style="margin:auto;height:100%;"></video>`;
        const newVideoElement = newLayer.querySelector(`#${newPlayerId}`);

        gsap.set(newLayer, { 
            opacity: 0, 
            // filter: 'blur(10px)',
            zIndex: 2,
            pointerEvents: 'none'
        });

        let newPlayer, newHls;
        try {
            const result = createPlayer(newVideoElement, newVideoId);
            newPlayer = result.player;
            newHls = result.hls;
            newPlayer.muted = false;
        } catch (error) {
            console.error('Error creating new player:', error);
            return;
        }
        
        if (activeLayer === 'A') {
            playerB = newPlayer;
            hlsB = newHls;
        } else {
            playerA = newPlayer;
            hlsA = newHls;
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        console.log('Starting optimized video crossfade animation');

        const tl = gsap.timeline();

        tl.to(currentLayer, {
            opacity: 0,
            // filter: 'blur(10px)',
            duration: 0.5,
            ease: 'power2.inOut'
        })
        .to(newLayer, {
            opacity: 1,
            // filter: 'blur(0px)',
            duration: 0.4,
            ease: 'power2.out'
        }, 0.1)
        .call(() => {
            gsap.set(currentLayer, { pointerEvents: 'none' });
            gsap.set(newLayer, { pointerEvents: 'auto' });
            
            const oldHls = activeLayer === 'A' ? hlsA : hlsB;
            if (oldHls) {
                oldHls.destroy();
                if (activeLayer === 'A') {
                    hlsA = null;
                } else {
                    hlsB = null;
                }
            }
            
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

    let webpObserver;
    let webpFeedInitialized = false;
    let webpLoadingPromises = new Map();
    let fullyLoadedWebps = new Set();

    function initializeWebpFeed() {
        if (webpFeedInitialized) return;
        
        if (!swiper) {
            setTimeout(initializeWebpFeed, 100);
            return;
        }
        
        console.log('🎬 Starting WebP preloading...');
        
        const webpElements = swiper.el.querySelectorAll('.video-webp-item');
        
        // Preload all WebPs first
        preloadAllWebps(webpElements).then(() => {
            console.log('✅ All WebPs preloaded, starting observer');
            startWebpObserver(webpElements);
        });
        
        webpFeedInitialized = true;
    }

    let webpObjectUrls = new Map(); // videoId => blobUrl

    // Returns blob URL from cache or creates a new one from fetch (using browser cache for repeated fetches)
    async function getOrCreateWebpObjectUrl(videoId, webpUrl) {
        if (webpObjectUrls.has(videoId)) {
            return webpObjectUrls.get(videoId);
        }
        const response = await fetch(webpUrl, { cache: "force-cache" }); // ensures browser cache
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        webpObjectUrls.set(videoId, objectUrl);
        return objectUrl;
    }

    function cleanupWebpBlob(videoId) {
        const blobUrl = webpObjectUrls.get(videoId);
        if (blobUrl) {
            URL.revokeObjectURL(blobUrl);
            webpObjectUrls.delete(videoId);
        }
    }

    // On destroy, clean up any blobs left
    import { onDestroy } from "svelte";
    onDestroy(() => {
        for (const blobUrl of webpObjectUrls.values()) {
            URL.revokeObjectURL(blobUrl);
        }
        webpObjectUrls.clear();
    });

    async function preloadAllWebps(webpElements) {
        const loadPromises = [];
        
        webpElements.forEach(img => {
            const videoId = img.dataset.videoId;
            const webpUrl = img.dataset.webpSrc;
            
            img.dataset.thumbnailSrc = img.src;
            
            if (!webpObjectUrls.has(videoId)) {
                const loadPromise = fetch(webpUrl)
                    .then(response => response.blob())
                    .then(blob => {
                        const objectUrl = URL.createObjectURL(blob);
                        webpObjectUrls.set(videoId, objectUrl);
                        fullyLoadedWebps.add(videoId);
                    })
                    .catch(error => console.error(`WebP ${videoId} failed:`, error));
                
                loadPromises.push(loadPromise);
            }
        });
        
        await Promise.all(loadPromises);
    }

    function startWebpObserver(webpElements) {
        if (webpObserver) webpObserver.disconnect();

        let debounceTimers = new Map();

        webpObserver = new IntersectionObserver(async (entries) => {
            for (const entry of entries) {
                const img = entry.target;
                const videoId = img.dataset.videoId;
                const webpUrl = img.dataset.webpSrc;
                const thumbnailUrl = img.dataset.thumbnailSrc;

                if (debounceTimers.has(videoId)) {
                    clearTimeout(debounceTimers.get(videoId));
                    debounceTimers.delete(videoId);
                }

                if (entry.isIntersecting) {
                    if (img.src !== webpObjectUrls.get(videoId)) {
                        const objectUrl = await getOrCreateWebpObjectUrl(videoId, webpUrl);
                        img.src = objectUrl;
                    }
                } else {
                    const delay = window.innerWidth < 992 ? 200 : 50;
                    const timer = setTimeout(() => {
                        if (!entry.isIntersecting) {
                            img.src = thumbnailUrl;
                            cleanupWebpBlob(videoId);
                        }
                        debounceTimers.delete(videoId);
                    }, delay);
                    debounceTimers.set(videoId, timer);
                }
            }
        }, { threshold: 1 });

        webpElements.forEach(img => {
            webpObserver.observe(img);
        });
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

    function updateSwiperTouch() {
        const isMobile = window.innerWidth < 992;
        swiper.params.simulateTouch = isMobile;
        swiper.update();
    }

    function saveVideoSize() {
        const mainVideoContainer = document.querySelector('#main-video-container');
        
        if (!mainVideoContainer) return;

        document.documentElement.style.setProperty('--video-width', `${mainVideoContainer.offsetWidth}px`);
        document.documentElement.style.setProperty('--video-height', `${mainVideoContainer.offsetHeight}px`);
    }

    $: if ($page.params.slug) {
        updateActiveSlides($page.params.slug);
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
                     setTimeout(() => {
                        initializeWebpFeed();
                        // Run initial animations after everything is ready
                        setTimeout(() => {
                            initializeAnimations();
                        }, 50);
                    }, 100);
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
            
            webpFeedInitialized = false;
        };
    });
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
                    <div class="position-absolute dropstart text-rotate top-0 end-0 text-end init-fade-element" style="z-index: 15;">
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
                    <div class="position-absolute credits-panel init-fade-element" 
                        style="top: 1px; right: 0; z-index: 10; transform: translateX(100%); transition: transform 0.3s ease-in-out;"
                        bind:this={collapseElement}>
                        <div class="card card-body border-0 rounded-0 font-9 p-3 w-100" id="cardCredits">
                            <h2 class="font-7 text-underline mobile-fade-element">{currentProject?.title}</h2>
                            <div class="mb-2 mobile-fade-element" style="max-width:75%">
                                {@html renderBlocks(currentProject.description)}
                            </div>
                            <p class="mb-2 mobile-fade-element">{currentProject.type}</p>
                            <p class="mb-0 mobile-fade-element">
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
                    <hr class="mt-0 mb-2 init-fade-element">
                    <div class="position-relative overflow-hidden">
                        <div class="row justify-content-between align-items-center">
                            <div class="col-lg-8">
                                <h2 class="font-5 font-3-mt-negative mb-0 fade-text credits-title">{currentProject.title}</h2>
                            </div>
                            <div class="col-lg-4 text-lg-end">
                                <p class="mb-0 fade-text credits-type">{currentProject.type}</p>
                            </div>
                        </div>
                    </div>
                    <hr class="mt-2 mb-0 border-black init-fade-element">
                    <div class="flex-grow-1"></div>
                    <div class="position-relative overflow-hidden">
                        <div class="row justify-content-between align-items-end">
                            <div class="col-lg-5">
                                <div class="mb-0 fade-text credits-description">
                                    {@html renderBlocks(currentProject.description)}
                                </div>
                            </div>
                            <div class="col-lg-4 text-lg-end">
                                <div class="mb-0 fade-text credits-credits">
                                    {@html renderBlocks(currentProject.credits)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="mt-2 mb-0 init-fade-element">
                </div>
            </div>

            <!-- Projects List Column -->
            <div class="col-lg-4 ps-lg-1 px-0-mob h-100" bind:this={rightColumn} id="swiper-wrapper">
                <div class="h-100 border border-black border-x-0-mob border-top-0-mob overflow-hidden">
                    <div class="swiper-container scrollSwiperAdvertising">
                        <div class="swiper-wrapper h-100">
                            {#each data.advertisingProjects as project}
                                <div class="swiper-slide thumbnail-item">
                                    <a href="/advertising/{project.slug.current}"
                                        class="d-flex align-items-center border-bottom border-black text-decoration-none swiper-slide-link"
                                        data-slug={project.slug.current}>
                                        <div class="w-35 bg-black border-end border-black ratio ratio-16x9 position-relative">
                                            <img 
                                                src="https://vz-8d625025-b12.b-cdn.net/{project.videoPreviewId || project.videoId}/thumbnail.jpg"
                                                data-webp-src="https://vz-8d625025-b12.b-cdn.net/{project.videoPreviewId || project.videoId}/preview.webp?v={project.videoId}"
                                                alt="{project.title}"
                                                class="video-webp-item position-absolute top-0 start-0 w-100 h-100 object-fit-cover" 
                                                data-video-id="{project.videoPreviewId || project.videoId}"
                                            >
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
    /* Initial load animation states - only affects first load */
    .thumbnail-item {
        opacity: 0;
        transform: translateY(15px);
    }
    
    .init-fade-element {
        opacity: 0;
    }
    
    #main-video-container {
        opacity: 0;
        /* filter: blur(8px); */
    }

    /* Desktop-only credits animation - mobile credits are always visible */
    @media (min-width: 992px) {
        .credits-title,
        .credits-type, 
        .credits-description,
        .credits-credits {
            opacity: 0;
            transform: translateY(20px);
        }
    }

    /* Mobile credits are always visible - no initial animation states */
    .mobile-fade-element {
        /* No initial opacity/transform - always visible on mobile */
    }

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

    /* Ensure Swiper clones don't override our animations */
    :global(.swiper-slide-duplicate) {
        opacity: 1 !important;
        transform: none !important;
    }
</style>