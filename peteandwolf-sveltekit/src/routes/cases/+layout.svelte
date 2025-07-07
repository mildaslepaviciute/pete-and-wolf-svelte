<script>
    import { renderBlocks } from "$lib/helpers.js";
    import { onMount, afterUpdate } from "svelte";
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    import Swiper, { 
        Mousewheel, 
        FreeMode, 
    } from 'swiper';
    import { tick } from 'svelte';
    import { gsap } from 'gsap';

    Swiper.use([Mousewheel, FreeMode]);
 
    export let data;
    const { caseItems } = data;

    $: currentProject = $page.url.pathname === '/cases' 
        ? null 
        : caseItems.find(item => 
            $page.params.slug && item.slug === $page.params.slug
        );

    $: navSections = currentProject ? currentProject.sections : null;


    let swiperSonic, swiperSonicMobile;
    let offcanvasCases;
    let hasAnimated = false;

    function updateActiveSlides(slug) {
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
            const allSlideLinks = document.querySelectorAll(".swiper-slide-link");

            allSlideLinks.forEach((link) => {
                link.classList.remove("swiper-slide-link-active");
            });

            allSlideLinks.forEach((link) => {
                if (link.dataset.slug === slug) {
                    link.classList.add("swiper-slide-link-active");
                }
            });
        }, 100);
    }

    function animateNavigationLinks() {
        // Wait for DOM to update with new navigation content
        setTimeout(() => {
            const navElements = document.querySelectorAll('.fade-up');
            if (navElements.length > 0) {
                // Reset and animate navigation links - just fade in, no movement
                gsap.set(navElements, { opacity: 0 });
                gsap.to(navElements, {
                    opacity: 1,
                    duration: 0.6,
                });
            }
        }, 0);
    }

    function hideOffcanvasElements() {
        if (offcanvasCases) {
            offcanvasCases.hide()
        }
    }

    function goBack() {
        goto('/cases/sonic-id');
        updateActiveSlides('sonic-id');
    }

    function startVideoFeed() {
		const videoFeedItems = document.querySelectorAll(".video-feed-item");

		videoFeedItems.forEach((video) => {
			// video.play()
            video.muted = true;
            video.defaultMuted = true;
		});
	}

    function initializeAnimations() {
        if (hasAnimated) return;
        
        // Create main timeline for STATIC elements only
        const mainTl = gsap.timeline();

        mainTl.to('.fade-in', {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        })
        .to('.stagger-item:not(.swiper-slide-duplicate)', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            onComplete: () => {
                gsap.set('.stagger-item', { opacity: 1, y: 0 });
                if (currentProject?.slug) {
                    updateActiveSlides(currentProject.slug);
                }
            }
        }, 0.1);

        hasAnimated = true;
    }

    onMount(async () => {
        // Wait a tick for DOM to be ready, then initialize Swiper FIRST
        // await tick();

        swiperSonic = new Swiper(".scrollSwiperSonic", {
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
            simulateTouch: false,
        });

        swiperSonicMobile = new Swiper(".scrollSwiperSonicMobile", {
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
        });

        // THEN initialize animations after Swiper has created clones
        setTimeout(() => {
            initializeAnimations();
            animateNavigationLinks();
        }, 50);

        startVideoFeed();
        updateActiveSlides($page.params.slug);

        const offcanvasCasesEl = document.querySelector('#offcanvasCases');
        if (offcanvasCasesEl) {
            offcanvasCases = new bootstrap.Offcanvas(offcanvasCasesEl);
        }
    });

    afterUpdate(() => {
        hideOffcanvasElements();
        
        // Update active slides on route change
        if (currentProject?.slug) {
            updateActiveSlides(currentProject.slug);
            animateNavigationLinks();
        }
    });
</script>

<svelte:head>
    <title>{currentProject?.title ?? 'Sonic ID'} - Pete & Wolf</title>
    <meta name="description" content="We help you to unmute your brand">
</svelte:head>

<section class="h-100vh pt-below-nav overflow-hidden">
    <div class="container h-100 d-flex flex-column">
        <div class="row align-items-stretch no-gutters px-screen-mob" id="sonicRow">
            <div class="position-relative">
                {#if currentProject?.slug !== 'sonic-id'}
                    <div class="back-button-wrapper position-absolute d-none d-lg-flex">
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div type="button" class="back-button" on:click|preventDefault={goBack}>&larr; About Sonic ID</div>
                    </div>
                {/if}
                <div class="position-absolute d-none d-lg-flex flex-row-reverse text-rotate top-0 text-end" style="left: -15px;">
                    {#if navSections !== null}
                        {#each navSections as section, sectionIndex}
                            {#if section.blocks}
                                {#each section.blocks as block, blockIndex}
                                    {#each ['col_1', 'col_2', 'col_3'] as colKey, colIdx}
                                        {#if block[colKey] && block[colKey].includeNavigation}
                                            <div class="fw-bold mt-4 fs-9 fade-up">
                                                <a href={`#${sectionIndex}_${blockIndex}_${colIdx + 1}`} class="case-title u-offset-n1 text-black font-7">
                                                    {block[colKey].textContent[0]?.children?.map(child => child.text).join('')}
                                                </a>
                                            </div>
                                        {/if}
                                    {/each}
                                {/each}
                            {/if}
                        {/each}
                    {/if}
                </div>
                <div class="position-absolute d-flex d-lg-none text-rotate top-0 text-end fade-up" style="right: -30px;">
                    <div class="bg-blue font-5 fw-bold text-white text-center py-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCases" aria-controls="offcanvasCases" style="width:30px;min-height:150px;">+ Cases</div>
                </div>

                <!-- Mobile offcanvas -->
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCases" aria-labelledby="offcanvasCasesLabel">
                    <div class="offcanvas-title-wrapper sticky-top top-0 w-100 bg-blue d-flex justify-content-between align-items-center px-2 py-3 border-bottom border-black">
                        <p class="font-4 text-white mb-0"><b>Cases</b></p>
                        <button type="button" class="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="swiper-container scrollSwiperSonicMobile">
                        <div class="swiper-wrapper">
                            {#each [].concat(...Array(1).fill([...caseItems])) as caseItem}
                                <div class="swiper-slide stagger-item">
                                    <a 
                                        href={`/cases/${caseItem.slug || ''}`}
                                        class="d-flex align-items-center border-bottom border-black text-decoration-none swiper-slide-link"
                                        data-slug={caseItem.slug}
                                    >
                                        <div class="w-35 bg-black border-end border-black ratio ratio-4x3">
                                            {#if caseItem.thumbnail.type === 'image'}
                                                <img src={caseItem.thumbnail && caseItem.thumbnail.url || ''} alt={'case item'} class="w-100 object-fit-cover">
                                            {:else if caseItem.thumbnail.type === 'video'}
                                                <video 
                                                    class="w-100 video-feed-item object-fit-cover" 
                                                    src="https://vz-8d625025-b12.b-cdn.net/{caseItem.thumbnail.videoId}/play_360p.mp4"
                                                	playsinline
                                                    loop 
                                                    autoplay
                                                    muted
                                                >
                                                </video>
                                            {/if}
                                        </div>
                                        <div class="w-65 h-100 d-flex flex-column px-3">
                                            <h3 class="font-6 text-black mb-0"><b>{caseItem.title}</b></h3>
                                            {#if caseItem.description !== ''}
                                                <p class="font-8 text-truncate-2 text-black mb-0 mt-1">{caseItem.description}</p>
                                            {/if}
                                        </div>
                                    </a>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main content area -->
            <div class="col-lg-8 h-100 min-h-100 pe-10px-mob fade-in">
               <div class="max-h-screen min-h-mob-screen h-100 scrolling border-lg border-black px-lg-3 py-lg-3 overflow-x-hidden">
                    <div>
                        <slot />
                    </div>
                </div>
            </div>

            <!-- Desktop sidebar -->
            <div class="col-lg-4 h-100 ps-lg-1 d-none d-lg-block fade-in">
                <div class="h-100 max-h-screen border border-black overflow-hidden">
                    <div class="bg-blue sticky-top border-bottom border-black">
                        <p class="font-2 text-end text-white p-2 mb-0"><b>Cases</b></p>
                    </div>
                    <div class="swiper-container scrollSwiperSonic">
                        <div class="swiper-wrapper">
                            {#each [].concat(...Array(1).fill([...caseItems])) as caseItem}
                                <div class="swiper-slide stagger-item">
                                    <a 
                                        href={`/cases/${caseItem.slug || ''}`}
                                        class="d-flex align-items-center border-bottom border-black text-decoration-none swiper-slide-link"
                                        data-slug={caseItem.slug}
                                    >
                                        <div class="w-35 bg-black border-end border-black ratio ratio-4x3">
                                            {#if caseItem.thumbnail.type === 'image'}
                                                <img src={caseItem.thumbnail && caseItem.thumbnail.url || ''} alt={'case item'} class="w-100 object-fit-cover">
                                            {:else if caseItem.thumbnail.type === 'video'}
                                                <video 
                                                    class="w-100 video-feed-item object-fit-cover" 
                                                    src="https://vz-8d625025-b12.b-cdn.net/{caseItem.thumbnail.videoId}/play_360p.mp4"
                                                    playsinline
                                                    loop 
                                                    autoplay
                                                    muted
                                                >
                                                </video>
                                            {/if}
                                        </div>
                                        <div class="w-65 h-100 d-flex flex-column px-3">
                                            <h3 class="font-6 text-black mb-0"><b>{caseItem.title}</b></h3>
                                            {#if caseItem.description !== ''}
                                                <p class="font-8 text-truncate-2 text-black mb-0 mt-1">{caseItem.description}</p>
                                            {/if}
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
    /* Hide elements before animations start to prevent flash */
    .stagger-item {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .fade-up {
        opacity: 0;
    }
    
    .fade-in {
        opacity: 0;
    }
    
    .content-fade-up {
        opacity: 0;
        transform: translateY(20px);
    }

    /* Ensure Swiper clones don't override our animations */
    .swiper-slide-duplicate {
        opacity: 1 !important;
        transform: none !important;
    }
</style>