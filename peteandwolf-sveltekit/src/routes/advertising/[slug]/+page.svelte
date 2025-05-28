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

    $: if ($page.params.slug && desktopCredits) {
        if (previousSlug !== $page.params.slug) {
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

        const oldEls = desktopCredits.querySelectorAll(".fade-text");

        await gsap.to(oldEls, {
            y: '120%', // Slide down under hr
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.inOut',
        });

        await tick();

        const newEls = desktopCredits.querySelectorAll(".fade-text");

        gsap.fromTo(
            newEls,
            { y: '-120%' }, // Slide in from above
            {
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            }
        );
    }

    let currentVideoId = '';
    let isVideoFirstLoad = true;
    let videoLayerA;
    let videoLayerB;
    let activeLayer = 'A'; // Track which layer is currently active

    // Detect video ID change
    let videoTransitionPromise = Promise.resolve();

    $: if (currentProject.videoId && currentProject.videoId !== currentVideoId) {
        videoTransitionPromise = videoTransitionPromise.then(async () => {
            await crossfadeVideo(currentProject.videoId);
            currentVideoId = currentProject.videoId;
        });
    }


    // Animate and swap videos
    async function crossfadeVideo(newVideoId) {
        // Ensure both layers exist
        if (!videoLayerA || !videoLayerB) return;

        if (isVideoFirstLoad) {
            isVideoFirstLoad = false;
            
            // On first load, ensure videoLayerA has the current video and proper state
            const initialIframeHTML = `
                <iframe
                    src="https://iframe.mediadelivery.net/embed/372334/${newVideoId}?autoplay=true&preload=true&loop=false&muted=false&responsive=true"
                    allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                    allowfullscreen
                    title="Video Player"
                    style="border:0;position:absolute;top:0;left:0;width:100%;height:100%;"
                ></iframe>
            `;
            
            videoLayerA.innerHTML = initialIframeHTML;
            gsap.set(videoLayerA, {
                opacity: 1,
                filter: 'blur(0px)',
                zIndex: 1,
                pointerEvents: 'auto'
            });
            
            gsap.set(videoLayerB, {
                opacity: 0,
                filter: 'blur(20px)',
                zIndex: 2,
                pointerEvents: 'none'
            });
            
            return;
        }

        // Determine which layer to use for the new video
        const currentLayer = activeLayer === 'A' ? videoLayerA : videoLayerB;
        const newLayer = activeLayer === 'A' ? videoLayerB : videoLayerA;

        // Create new iframe HTML
        const newIframeHTML = `
            <iframe
                src="https://iframe.mediadelivery.net/embed/372334/${newVideoId}?autoplay=true&preload=true&loop=false&muted=false&responsive=true"
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                allowfullscreen
                title="Video Player"
                style="border:0;position:absolute;top:0;left:0;width:100%;height:100%;"
            ></iframe>
        `;

        // Ensure current layer is visible and interactive
        gsap.set(currentLayer, {
            opacity: 1,
            filter: 'blur(0px)',
            zIndex: 1,
            pointerEvents: 'auto'
        });

        // Set up new layer with new video (hidden initially)
        newLayer.innerHTML = newIframeHTML;
        gsap.set(newLayer, { 
            opacity: 0, 
            filter: 'blur(20px)',
            zIndex: 2,
            pointerEvents: 'none'
        });

        // Wait for iframe to load
        await new Promise(resolve => setTimeout(resolve, 700));

        // Create animation timeline
        const tl = gsap.timeline();

        // Animate current video out and new video in simultaneously
        tl.to(currentLayer, {
            opacity: 0,
            filter: 'blur(20px)',
            duration: 1.5,
            ease: 'power2.inOut'
        })
        .to(newLayer, {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power2.inOut'
        }, 0) // Start at the same time
        .call(() => {
            // Switch interaction states immediately when animation completes
            gsap.set(currentLayer, { pointerEvents: 'none' });
            gsap.set(newLayer, { pointerEvents: 'auto' });
            
            // Keep the old layer completely hidden and non-interactive
            gsap.set(currentLayer, { 
                opacity: 0, 
                pointerEvents: 'none',
                zIndex: -10, // Far behind everything
                visibility: 'hidden' // Extra hiding
            });
            
            // Update active layer for next transition
            activeLayer = activeLayer === 'A' ? 'B' : 'A';
        });

        return tl;
    }

    let isPanelOpen = false;

    // Replace the Bootstrap collapse logic with this custom function
    function toggleCreditsPanel() {
        isPanelOpen = !isPanelOpen;
        
        if (isPanelOpen) {
            // Show panel - slide in from right
            collapseElement.style.transform = 'translateX(0)';
            collapseToggleButton.textContent = '— Credits';
        } else {
            // Hide panel - slide out to right
            collapseElement.style.transform = 'translateX(100%)';
            collapseToggleButton.textContent = '+ Credits';
        }
    }
    
	// Function to update active states for all slides including clones
	function updateActiveSlides(slug) {
		if (!swiper) return;

		// Get all link elements inside slides including clones
		const allSlideLinks = swiper.el.querySelectorAll(".swiper-slide-link");

		// Remove bg-primary from all links
		allSlideLinks.forEach((link) => {
			link.classList.remove("swiper-slide-link-active");
		});

		// Add bg-primary to links in slides matching the slug
		allSlideLinks.forEach((link) => {
			if (link.dataset.slug === slug) {
				link.classList.add("swiper-slide-link-active");
			}
		});
	}

	function startVideoFeed() {
		const videFeedItems = swiper.el.querySelectorAll(".video-feed-item");

		videFeedItems.forEach((video) => {
			// video.play()
            video.muted = true;
            video.defaultMuted = true;
		});
	}

	function updateSwiperTouch() {
		const isMobile = window.innerWidth < 992;
		swiper.params.simulateTouch = isMobile;
		swiper.update();
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
        });

		window.addEventListener("resize", updateSwiperTouch);

		updateActiveSlides($page.params.slug);

        startVideoFeed();

        saveVideoSize();

		// COLLAPSE CLOSING
		const closeCollapse = (event) => {
            if (isPanelOpen && collapseElement && !collapseElement.contains(event.target) && !collapseToggleButton.contains(event.target)) {
                toggleCreditsPanel();
            }
        };
        document.addEventListener("click", closeCollapse);
	
		return () => {
            document.removeEventListener("click", closeCollapse);
		};
	});

	// Watch for URL changes
	$: if ($page.params.slug) {
		updateActiveSlides($page.params.slug);
	}

    function saveVideoSize() {
        const mainVideoContainer = document.querySelector('#main-video-container'); // Adjust selector as needed
        
        if (!mainVideoContainer) return;

        console.log(mainVideoContainer.offsetWidth)
        
        // Set CSS variables once
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
                            <iframe
                                src={`https://iframe.mediadelivery.net/embed/372334/${currentProject.videoId}?autoplay=true&preload=true&loop=false&muted=true&responsive=true`}
                                loading="lazy"
                                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                                allowfullscreen
                                title="Video Player"
                                style="border:0;position:absolute;top:0;left:0;width:100%;height:100%;z-index: 2;">
                            </iframe>
                        </div>

                        <!-- Video B (animated in) -->
                        <div class="video-layer" bind:this={videoLayerB}></div>
                    </div>
                </div>

                <!-- Desktop credits section -->
                <div class="d-none d-lg-flex font-8 pt-3 flex-column h-100" bind:this={desktopCredits}>
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
											src="https://vz-8d625025-b12.b-cdn.net/{project.videoPreviewId || project.videoId}/play_360p.mp4"
											playsinline
											loop 
                                            autoplay
											muted
										>
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
    padding-top: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    }


    .video-layer {
      position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        /* Ensure smooth transitions */
        backface-visibility: hidden;
        transform: translateZ(0);
        /* Allow interactions by default */
        pointer-events: auto;
    }

    .video-layer + .video-layer {
       pointer-events: none;
        z-index: 2; /* Second layer should be on top initially */
    }
</style>