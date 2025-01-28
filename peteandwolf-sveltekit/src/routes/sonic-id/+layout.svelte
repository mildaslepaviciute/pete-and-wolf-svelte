<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';

    export let data;

    let swiperSonic, swiperSonicMobile;
    let offcanvasCases;

    const caseItems = data.caseItems;

    $: currentProject = $page.url.pathname === '/sonic-id' 
        ? null 
        : caseItems.find(item => 
            $page.params.slug && item.slug === $page.params.slug
        );

    // Function to update active states for all slides including clones
    function updateActiveSlides(slug) {
        if (!swiperSonic && !swiperSonicMobile) return;
        
        // Get all link elements inside slides including clones
        const allSlideLinks = document.querySelectorAll(".swiper-slide-link");

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

    function hideOffcanvasElements() {
        if (offcanvasCases) {
            offcanvasCases.hide()
        }
    }

    function goBack() {
        goto('/sonic-id');
    }

    onMount(() => {
        //const isMobile = window.innerWidth <= 992; // Define a breakpoint for mobile devices

        swiperSonic = new Swiper(".scrollSwiperSonic", {
            direction: "vertical",
            slidesPerView: "auto",
            freeMode: true,
            loop: true,
            scrollbar: {
                el: ".swiper-scrollbar",
            },
            mousewheel: true,
            simulateTouch: false,
        });

        swiperSonicMobile = new Swiper(".scrollSwiperSonicMobile", {
            direction: "vertical",
            slidesPerView: "auto",
            freeMode: true,
            loop: true,
            scrollbar: {
                el: ".swiper-scrollbar",
            },
            mousewheel: true,
        });

        updateActiveSlides($page.params.slug);

        const offcanvasCasesEl = document.querySelector('#offcanvasCases');
        offcanvasCases = new bootstrap.Offcanvas(offcanvasCasesEl);
    });

    // Watch for URL changes
    $: if ($page.params.slug) {
        updateActiveSlides($page.params.slug);
        hideOffcanvasElements()
    }
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
                <div class="position-absolute d-flex text-rotate top-0 text-end" style="left: -20px;">
                    {#if currentProject}
                        {#each [...currentProject.sections].reverse() as section}
                            <div class="fw-bold mt-4">
                                <a href={`#${section.title.replace(/\s+/g, '-').toLowerCase()}`} class="case-title u-offset-n1 text-black">
                                    {section.title}
                                </a>
                            </div>
                        {/each}
                    {:else}
                        <div class="fw-bold mt-4">
                            <span class="case-title u-offset-n1 text-black">Sonic ID</span>
                        </div>
                    {/if}
                </div>
                <div class="position-absolute d-flex d-lg-none text-rotate top-0 text-end" style="right: -27px;">
                    <div class="bg-blue font-5 fw-bold text-white py-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCases" aria-controls="offcanvasCases">Cases</div>
                </div>
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCases" aria-labelledby="offcanvasCasesLabel">
                    <div class="offcanvas-title-wrapper sticky-top top-0 w-100 bg-blue d-flex justify-content-between align-items-center px-2 py-3">
                        <h1 class="font-4 text-white mb-0"><b>Cases</b></h1>
                        <button type="button" class="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="swiper scrollSwiperSonicMobile">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                {#each caseItems as caseItem}
                                   <a 
                                        href={`/sonic-id/${caseItem.slug}`}
                                        class="d-flex align-items-center border-bottom border-black text-decoration-none swiper-slide-link"
                                        data-slug={caseItem.slug}
                                    >
                                        <div class="w-35 bg-black border-end border-black">
                                            <img src={caseItem.image} alt="" class="w-100">
                                        </div>
                                        <div class="w-65 h-100 d-flex flex-column p-3">
                                            <h3 class="font-6 text-black"><b>{caseItem.title}</b></h3>
                                            <p class="font-8 text-truncate-2 text-black mb-0">{caseItem.description}</p>
                                            <!-- <div class="d-flex align-items-center justify-content-between mt-auto">
                                                <div class="font-8 text-blue">Technology</div>
                                                <a href={`/sonic-id/${caseItem.slug}`} class="text-underline text-black">read more</a>
                                            </div> -->
                                        </div>
                                    </a>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main content area -->
            <div class="col-lg-8 h-100 min-h-100 px-0-mob">
                <div class="max-h-screen min-h-mob-screen h-100 scrolling border border-black p-3">
                    <slot />
                </div>
            </div>

            <!-- Right sidebar -->
            <div class="col-lg-4 h-100 ps-lg-1 d-none d-lg-block">
                <div class="h-100 max-h-screen border border-black overflow-hidden">
                    <div class="bg-blue sticky-top">
                        <h1 class="font-2 text-end text-white p-2 mb-0"><b>Cases</b></h1>
                    </div>
                    <div class="swiper scrollSwiperSonic">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                {#each caseItems as caseItem}
                                    <a 
                                        href={`/sonic-id/${caseItem.slug}`}
                                        class="d-flex align-items-center border-bottom border-black text-decoration-none swiper-slide-link"
                                        data-slug={caseItem.slug}
                                    >
                                        <div class="w-35 bg-black border-end border-black">
                                            <img src={caseItem.image} alt="" class="w-100">
                                        </div>
                                        <div class="w-65 h-100 d-flex flex-column p-3">
                                            <h3 class="font-6 text-black"><b>{caseItem.title}</b></h3>
                                            <p class="font-8 text-truncate-2 text-black mb-0">{caseItem.description}</p>
                                            <!-- <div class="d-flex align-items-center justify-content-between mt-auto">
                                                <div class="font-8 text-blue">Technology</div>
                                                <a href={`/sonic-id/${caseItem.slug}`} class="text-underline text-black">read more</a>
                                            </div> -->
                                        </div>
                                    </a>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
