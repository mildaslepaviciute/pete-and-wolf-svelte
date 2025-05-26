<!-- src/routes/sonic-id/+layout.svelte -->
<script>
    import { renderBlocks } from "$lib/helpers.js";
    import { onMount, afterUpdate } from "svelte";
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    import Swiper, { 
        Mousewheel, 
        FreeMode, 
    } from 'swiper';

    Swiper.use([Mousewheel, FreeMode]);
 
    export let data;
    const { caseItems, sonicIdData } = data;

    $: navSections = currentProject ? currentProject.sections : sonicIdData.sections;

    let swiperSonic, swiperSonicMobile;
    let offcanvasCases;

    $: currentProject = $page.url.pathname === '/sonic-id' 
        ? null 
        : caseItems.find(item => 
            $page.params.slug && item.slug === $page.params.slug
        );

    function updateActiveSlides(slug) {
        if (!swiperSonic && !swiperSonicMobile) return;
        
        const allSlideLinks = document.querySelectorAll(".swiper-slide-link");

        allSlideLinks.forEach((link) => {
            link.classList.remove("swiper-slide-link-active");
        });

        allSlideLinks.forEach((link) => {
            if (link.dataset.slug === slug) {
                link.classList.add("swiper-slide-link-active");
            } else if (!slug && link.dataset.slug === 'sonic-id') {
                link.classList.add("swiper-slide-link-active");
            }
        });
    }

    function hideOffcanvasElements() {
        if (offcanvasCases) {
            offcanvasCases.hide()
        }

        const mainContentArea = document.querySelector(".scrolling");
        if (mainContentArea) {
            mainContentArea.scrollTop = 0;
        }
    }

    function goBack() {
        goto('/sonic-id');
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

    onMount(() => {
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

        startVideoFeed()

        updateActiveSlides($page.params.slug || 'sonic-id');

        const offcanvasCasesEl = document.querySelector('#offcanvasCases');
        offcanvasCases = new bootstrap.Offcanvas(offcanvasCasesEl);
    });

    afterUpdate(() => {
        const slug = $page.params.slug;
        updateActiveSlides(slug || 'sonic-id');
                
        // if (slug) {
            hideOffcanvasElements();
        // }

    });

</script>

<svelte:head>
    <title>Pete & Wolf</title>
    <meta name="description" content="We help you to unmute your brand">
</svelte:head>

<section class="h-100vh pt-below-nav overflow-hidden">
    <div class="container h-100 d-flex flex-column">
        <div class="row align-items-stretch no-gutters px-screen-mob" id="sonicRow">
            <div class="position-relative">
                {#if currentProject}
                    <div class="back-button-wrapper position-absolute">
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div type="button" class="back-button" on:click|preventDefault={goBack}>&larr; About Sonic ID</div>
                    </div>
                {/if}
                <div class="position-absolute d-flex flex-row-reverse text-rotate top-0 text-end" style="left: -20px;">
                    {#if navSections !== null}
                        {#each navSections as section, sectionIndex}
                            <div class="fw-bold mt-4 fs-9">
                                <a href={`#${section.title.replace(/\s+/g, '-').toLowerCase()}`} class="case-title u-offset-n1 text-black font-7">
                                    {section.title}
                                </a>
                            </div>
                            {#if section.blocks}
                                {#each section.blocks as block, blockIndex}
                                    {#each ['col_1', 'col_2', 'col_3'] as colKey, colIdx}
                                        {#if block[colKey] && block[colKey].includeNavigation}
                                            <div class="fw-bold mt-4 fs-9">
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
                <div class="position-absolute d-flex d-lg-none text-rotate top-0 text-end" style="right: -30px;">
                    <div class="bg-blue font-5 fw-bold text-white text-center py-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCases" aria-controls="offcanvasCases" style="width:30px;min-height:150px;">+ Cases</div>
                </div>

                <!-- Mobile offcanvas -->
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCases" aria-labelledby="offcanvasCasesLabel">
                    <div class="offcanvas-title-wrapper sticky-top top-0 w-100 bg-blue d-flex justify-content-between align-items-center px-2 py-3">
                        <p class="font-4 text-white mb-0"><b>Cases</b></p>
                        <button type="button" class="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="swiper-container scrollSwiperSonicMobile">
                        <div class="swiper-wrapper">
                            {#each [].concat(...Array(1).fill([sonicIdData, ...caseItems])) as caseItem}
                                <div class="swiper-slide">
                                    <a 
                                        href={`/sonic-id/${caseItem.slug || ''}`}
                                        class="d-flex align-items-center border-bottom border-black text-decoration-none swiper-slide-link"
                                        data-slug={caseItem.slug || 'sonic-id'}
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
            <div class="col-lg-8 h-100 min-h-100 ps-1 ps-lg-2 pe-0-mob">
                <div class="max-h-screen min-h-mob-screen h-100 scrolling border border-black p-3">
                    <slot />
                </div>
            </div>

            <!-- Desktop sidebar -->
            <div class="col-lg-4 h-100 ps-lg-1 d-none d-lg-block">
                <div class="h-100 max-h-screen border border-black overflow-hidden">
                    <div class="bg-blue sticky-top">
                        <p class="font-2 text-end text-white p-2 mb-0"><b>Cases</b></p>
                    </div>
                    <div class="swiper-container scrollSwiperSonic">
                        <div class="swiper-wrapper">
                            {#each [].concat(...Array(1).fill([sonicIdData, ...caseItems])) as caseItem}
                                <div class="swiper-slide">
                                    <a 
                                        href={`/sonic-id/${caseItem.slug || ''}`}
                                        class="d-flex align-items-center border-bottom border-black text-decoration-none swiper-slide-link"
                                        data-slug={caseItem.slug || 'sonic-id'}
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