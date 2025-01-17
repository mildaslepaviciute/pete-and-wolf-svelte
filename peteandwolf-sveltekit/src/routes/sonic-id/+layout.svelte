<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';

    
    export let data;
    const caseItems = data.caseItems;

    $: currentProject = $page.url.pathname === '/sonic-id' 
        ? null 
        : caseItems.find(item => 
            $page.params.slug && item.slug === $page.params.slug
        );

    function goBack() {
        goto('/sonic-id');
    }

    onMount(() => {
        new Swiper(".scrollSwiperSonic", {
            direction: "vertical",
            slidesPerView: "auto",
            freeMode: true,
            loop: true,
            scrollbar: {
                el: ".swiper-scrollbar",
            },
            mousewheel: true,
        });

        new Swiper(".scrollSwiperSonicMobile", {
            direction: "vertical",
            slidesPerView: "auto",
            freeMode: true,
            loop: true,
            scrollbar: {
                el: ".swiper-scrollbar",
            },
            mousewheel: true,
        });

        const offcanvasElementsList = document.querySelectorAll('.offcanvas');
        offcanvasElementsList.forEach(offcanvasEl => new bootstrap.Offcanvas(offcanvasEl));
    });
</script>

<svelte:head>
    <title>Pete & Wolf</title>
    <meta name="description" content="We help you to unmute your brand">
</svelte:head>

<section class="h-100vh pt-below-nav overflow-hidden">
    <div class="container h-100 d-flex flex-column">
        <div class="row align-items-stretch no-gutters px-screen-mob">
            <div class="position-relative">
                {#if currentProject}
                    <div class="back-button-wrapper position-absolute">
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
                                    <a href={`/sonic-id/${caseItem.slug}`}>
                                        <div class="d-flex align-items-center border-bottom border-blue-wide">
                                            <div class="w-35 h-100 d-flex align-items-center p-2">
                                                <img src={caseItem.image} alt="" class="w-100 border border-black">
                                            </div>
                                            <div class="w-65 h-100 d-flex flex-column p-2">
                                                <h3 class="font-6 text-black"><b>{caseItem.title}</b></h3>
                                                <p class="font-8 text-truncate-2 text-black mb-0">{caseItem.description}</p>
                                            </div>
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
                <div class="max-h-screen min-h-screen scrolling border border-black p-3">
                    <slot />
                </div>
            </div>

            <!-- Right sidebar -->
            <div class="col-lg-4 h-100 ps-lg-1 d-none d-lg-block">
                <div class="max-h-screen border border-black overflow-hidden">
                    <div class="bg-blue sticky-top">
                        <h1 class="font-2 text-end text-white p-2 mb-0"><b>Cases</b></h1>
                    </div>
                    <div class="swiper scrollSwiperSonic">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                {#each caseItems as caseItem}
                                    <a href={`/sonic-id/${caseItem.slug}`}>
                                        <div class="d-flex align-items-center border-bottom border-blue-wide">
                                            <div class="w-35 h-100 d-flex align-items-center p-2">
                                                <img src={caseItem.image} alt="" class="w-100 border border-black">
                                            </div>
                                            <div class="w-65 h-100 d-flex flex-column p-2">
                                                <h3 class="font-6 text-black"><b>{caseItem.title}</b></h3>
                                                <p class="font-8 text-truncate-2 text-black mb-0">{caseItem.description}</p>
                                                <!-- <div class="d-flex align-items-center justify-content-between mt-auto">
                                                    <div class="font-8 text-blue">Technology</div>
                                                    <a href={`/sonic-id/${caseItem.slug}`} class="text-underline text-black">read more</a>
                                                </div> -->
                                            </div>
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
