<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    // Define project data (using slugs for dynamic routing)
    const caseItems = [
        {
            slug: 'sonic-id',
            title: 'Sonic ID',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            content: [
                {
                    grid: 1,
                    col_1: {
                        type: 'text',
                        content: 'Content for Sonic ID: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    }
                },
                {
                    grid: 2,
                    col_1: {
                        type: 'text',
                        content: 'More content for Sonic ID: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                    },
                    col_2: {
                        type: 'image',
                        content: 'https://picsum.photos/301/200/',
                    }
                },
                {
                    grid: 3,
                    col_1: {
                        type: 'text',
                        content: 'Even more content for Sonic ID: Lorem ipsum dolor sit amet.',
                    },
                    col_2: {
                        type: 'image',
                        content: 'https://picsum.photos/300/200/',
                    },
                    col_3: {
                        type: 'text',
                        content: 'Additional content for Sonic ID: Lorem ipsum dolor sit amet.',
                    }
                }
            ]
        },
        {
            slug: 'sonic-logo',
            title: 'Sonic Logo',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            content: [
                {
                    grid: 1,
                    col_1: {
                        type: 'text',
                        content: 'Content for Sonic Logo: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                    }
                }
            ]
        },
        {
            slug: 'telia-christmas-2024',
            title: 'Telia Christmas 2024',
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit.',
            content: [
                {
                    grid: 3,
                    col_1: {
                        type: 'text',
                        content: 'Content for Telia Christmas 2024: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                    },
                    col_2: {
                        type: 'image',
                        content: 'https://picsum.photos/300/200/',
                    },
                    col_3: {
                        type: 'text',
                        content: 'Additional content for Telia Christmas 2024: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                    }
                }
            ]
        },
        {
            slug: 'case-4',
            title: 'Case 4',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            content: [
                {
                    grid: 2,
                    col_1: {
                        type: 'image',
                        content: 'https://picsum.photos/300/200/',
                    },
                    col_2: {
                        type: 'image',
                        content: 'https://picsum.photos/300/200/',
                    },
                   
                }
            ]
        }
    ];

    // Reactive statement to update the current project based on the slug
    $: currentProject = caseItems.find(item => item.slug === $page.params.slug) || caseItems[0];

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

        const offcanvasElementsList = document.querySelectorAll('.offcanvas');
        offcanvasElementsList.forEach(offcanvasEl => new bootstrap.Offcanvas(offcanvasEl));
    });
</script>

<svelte:head>
    <title>Pete & Wolf</title>
    <meta name="description" content="We help you to unmute your brand">
</svelte:head>

<section class="h-100vh pt-below-nav">
    <div class="container h-100 d-flex flex-column">
        <div class="row align-items-stretch no-gutters px-screen-mob">
            <div class="position-relative">
                <div class="position-absolute d-flex text-rotate top-0 text-end" style="left: -23px;">
                    {#each caseItems as caseItem}
                        <div class="fw-bold mt-4">
                            <a href={`/sonic-id/${caseItem.slug}`} class="case-title u-offset-n1 text-black">{caseItem.title}</a>
                        </div>
                    {/each}
                </div>
                <div class="position-absolute d-flex d-lg-none text-rotate top-0 text-end" style="right: -27px;">
                    <div class="bg-blue font-4 fw-bold text-white py-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCases" aria-controls="offcanvasCases">Cases</div>
                </div>
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCases" aria-labelledby="offcanvasCasesLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasCasesLabel">Cases</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <div class="swiper scrollSwiperSonic">
                            <div class="swiper-wrapper">
                                {#each caseItems as caseItem}
                                    <div class="swiper-slide">
                                        <div class="d-flex align-items-center border-bottom border-blue-wide">
                                            <div class="w-35 h-100 d-flex align-items-center p-2">
                                                <img src="https://picsum.photos/200/300/" alt="" class="w-100 border border-black">
                                            </div>
                                            <div class="w-65 h-100 d-flex flex-column p-2">
                                                <h3 class="font-6"><b>{caseItem.title}</b></h3>
                                                <p class="font-8 text-truncate-2 mb-2">{caseItem.description}</p>
                                                <div class="d-flex align-items-center justify-content-between mt-auto">
                                                    <div class="font-8 text-blue">Technology</div>
                                                    <a href={`/sonic-id/${caseItem.slug}`} class="text-underline text-black">read more</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-8 h-100" style="min-height:100%">
                <div class="max-h-screen scrolling border border-black p-3">
                    <div id={currentProject.slug}>
                        <h2 class="font-2 mb-3"><b>{currentProject.title}</b></h2>
                        <div class="mb-3">
                            {#each currentProject.content as section}
                                <div class="row">
                                    {#if section.grid == 1}
                                        <div class="col-lg-12 mb-3">
                                            {#if section.col_1.type == 'text'}
                                                <p>{section.col_1.content}</p>
                                            {:else if section.col_1.type == 'image'}
                                                <img src={section.col_1.content} alt="" class="w-100">
                                            {/if}
                                        </div>
                                    {:else if section.grid == 2}
                                        <div class="col-lg-6 mb-3">
                                            {#if section.col_1.type == 'text'}
                                                <p>{section.col_1.content}</p>
                                            {:else if section.col_1.type == 'image'}
                                                <img src={section.col_1.content} alt="" class="w-100">
                                            {/if}
                                        </div>
                                        <div class="col-lg-6 mb-3">
                                            {#if section.col_2.type == 'text'}
                                                <p>{section.col_2.content}</p>
                                            {:else if section.col_2.type == 'image'}
                                                <img src={section.col_2.content} alt="" class="w-100">
                                            {/if}
                                        </div>
                                    {:else if section.grid == 3}
                                        <div class="col-lg-4 mb-3">
                                            {#if section.col_1.type == 'text'}
                                                <p>{section.col_1.content}</p>
                                            {:else if section.col_1.type == 'image'}
                                                <img src={section.col_1.content} alt="" class="w-100">
                                            {/if}
                                        </div>
                                        <div class="col-lg-4 mb-3">
                                            {#if section.col_2.type == 'text'}
                                                <p>{section.col_2.content}</p>
                                            {:else if section.col_2.type == 'image'}
                                                <img src={section.col_2.content} alt="" class="w-100">
                                            {/if}
                                        </div>
                                        <div class="col-lg-4 mb-3">
                                            {#if section.col_3.type == 'text'}
                                                <p>{section.col_3.content}</p>
                                            {:else if section.col_3.type == 'image'}
                                                <img src={section.col_3.content} alt="" class="w-100">
                                            {/if}
                                        </div>
                                    {/if}
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 h-100 ps-lg-1 d-none d-lg-block">
                <div class="max-h-screen border border-black overflow-hidden">
                    <div class="bg-blue sticky-top">
                        <h1 class="font-2 text-end text-white p-2 mb-0"><b>Cases</b></h1>
                    </div>
                    <div class="swiper scrollSwiperSonic">
                        <div class="swiper-wrapper">
                            {#each caseItems as caseItem}
                                <div class="swiper-slide">
                                    <div class="d-flex align-items-center border-bottom border-blue-wide">
                                        <div class="w-35 h-100 d-flex align-items-center p-2">
                                            <img src="https://picsum.photos/300/200/" alt="" class="w-100 border border-black">
                                        </div>
                                        <div class="w-65 h-100 d-flex flex-column p-2">
                                            <h3 class="font-6"><b>{caseItem.title}</b></h3>
                                            <p class="font-8 text-truncate-2 mb-2">{caseItem.description}</p>
                                            <div class="d-flex align-items-center justify-content-between mt-auto">
                                                <div class="font-8 text-blue">Technology</div>
                                                <a href={`/sonic-id/${caseItem.slug}`} class="text-underline text-black">read more</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>