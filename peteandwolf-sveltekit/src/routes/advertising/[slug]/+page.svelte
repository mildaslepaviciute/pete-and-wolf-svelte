<script>
    import { onMount, afterUpdate } from "svelte";
	import Swiper, { 
        Mousewheel, 
        FreeMode, 
    } from 'swiper';
    // import 'swiper/css';
    // import 'swiper/css/free-mode';
    // import 'swiper/css/mousewheel';

    Swiper.use([Mousewheel, FreeMode]);

    import { page } from "$app/stores";
    import { gsap } from "gsap";
	import { renderBlocks } from "$lib/helpers.js";

    export let data;

	$: currentProject = data.advertisingProjects.find((p) => p.slug.current === $page.params.slug) || data.advertisingProjects[0];

    let rightColumn;
    let leftColumn;
    let swiper;
    let collapseElement;
    let collapseToggleButton;

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

    // Function to update active states for all slides including clones
	function startVideoFeed() {
		const videFeedItems = swiper.el.querySelectorAll(".video-feed-item");

		// Remove bg-primary from all links
		videFeedItems.forEach((video) => {
			video.play()
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

		// Force mute all videos
		document
			.querySelectorAll(".scrollSwiperAdvertising video")
			.forEach((video) => {
				// Set multiple muting properties
				video.muted = true;
				video.defaultMuted = true;
				//video.volume = 0;
			});

		// COLLAPSE CLOSING
		const closeCollapse = (event) => {
			if (collapseElement && collapseElement.classList.contains("show")) {
				const bsCollapse =
					bootstrap.Collapse.getInstance(collapseElement);
				if (!collapseElement.contains(event.target)) {
					bsCollapse?.hide();
				}
			}
		};
		document.addEventListener("click", closeCollapse);

		const updateToggleButton = () => {
            if (collapseElement.classList.contains('show')) {
                collapseToggleButton.textContent = '+ Credits';
            } else {
                collapseToggleButton.textContent = '— Credits';
            }
        };

		collapseElement.addEventListener('show.bs.collapse', updateToggleButton);
        collapseElement.addEventListener('hide.bs.collapse', updateToggleButton);

		return () => {
			document.removeEventListener("click", closeCollapse);
		};
	});

	// Watch for URL changes
	$: if ($page.params.slug) {
		updateActiveSlides($page.params.slug);
	}

</script>

<section class="h-100vh pt-below-nav overflow-hidden">
    <div class="container h-100 d-flex flex-column" id="advertisingContainer">
        <div class="row align-items-stretch max-h-screen h-100" id="advertisingRow">
            <!-- Main Content Column -->
            <div class="col-lg-8 d-flex flex-column px-0-mob" bind:this={leftColumn}>
                <div class="position-relative">
                    <!-- Collapse toggle button -->
                    <div class="position-absolute dropstart d-flex d-lg-none text-rotate top-0 end-0 text-end z-1">
                        <div class="bg-blue font-5 fw-bold text-white py-4" 
                             id="toggleButton"
                             data-bs-toggle="collapse"
                             data-bs-target="#collapseWidthExample"
                             aria-controls="offcanvasCredits"
                             bind:this={collapseToggleButton}>
                            + Credits
                        </div>
                    </div>

                    <!-- Mobile credits panel -->
                    <div class="position-absolute z-2" style="right: 28px; top: 1px; display: flex; justify-content: flex-end;">
                        <div class="collapse collapse-horizontal collapse-right"
                             id="collapseWidthExample"
                             bind:this={collapseElement}>
                            <div class="card card-body border-0 rounded-0 font-9 p-3" id="cardCredits" style="width: calc(100vw - 28px)">
                                <h2 class="font-7 text-underline" fm-fade-in>{currentProject?.title}</h2>
                                <p fm-fade-in>{currentProject.description}</p>
                                <p fm-fade-in>{currentProject.type}</p>
                                <p class="mb-0" fm-fade-in>
                                    {@html renderBlocks(currentProject.credits)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Video Container -->
                <div class="border border-black border-x-0-mob bg-black">
                    <div style="position:relative;padding-top:56.25%;">
                        <!-- <video 
                            class="w-100 video-feed-item" 
                            src="https://vz-8d625025-b12.b-cdn.net/{currentProject.videoId}/play_360p.mp4"
                            playsinline
                            autoplay
                             
                            
                        > -->
                        <iframe src="https://iframe.mediadelivery.net/embed/372334/{currentProject.videoId}?autoplay=true&preload=true&loop=false&muted=false&preload=true&responsive=true"
                                loading="lazy"
                                style="border:0;position:absolute;top:0;height:100%;width:100%;"
                                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                                allowfullscreen="true"
                                title="Video Player"
                                id="main-video"></iframe>
                                
                    </div>
                </div>

                <!-- Desktop credits section -->
                <div class="d-none d-lg-block font-8 pt-3">
                    <div class="row justify-content-between align-items-start mb-3">
                        <div class="col-lg-4">
                            <h2 class="font-5 text-underline mb-0" fm-fade-in>{currentProject.title}</h2>
                        </div>
                        <div class="col-lg-4 text-lg-end">
                            <p class="mb-0" fm-fade-in>{currentProject.type}</p>
                        </div>
                    </div>
                    <div class="row justify-content-between align-items-end">
                        <div class="col-lg-4">
                            <div class="mb-0" fm-fade-in>
                                {@html renderBlocks(currentProject.description)}
                            </div>
                        </div>
                        <div class="col-lg-4 text-lg-end">
                            <div class="mb-0" fm-fade-in>
                                {@html renderBlocks(currentProject.credits)}
                            </div>
                        </div>
                    </div>
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

