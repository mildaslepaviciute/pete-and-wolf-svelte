<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { tick } from 'svelte';

    // Define dummy content
    const caseItems = [
        { id: 'sonic-id', title: 'Sonic ID', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', content: 'Content for Sonic ID: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { id: 'sonic-logo', title: 'Sonic Logo', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.', content: 'Content for Sonic Logo: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
        { id: 'telia-christmas-2024', title: 'Telia Christmas 2024', description: 'Duis aute irure dolor in reprehenderit in voluptate velit.', content: 'Content for Telia Christmas 2024: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' }
    ];

    const activeCase = writable(caseItems[0]);

    function changeCase(selectedCase) {
        activeCase.set(selectedCase);
        history.pushState(null, '', `#${selectedCase.id}`);
        tick().then(() => {
            document.getElementById(selectedCase.id).scrollIntoView({ behavior: 'smooth' });
        });
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

        // Initialize Bootstrap offcanvas
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
                            <a href={`#${caseItem.id}`} class="case-title u-offset-n1 text-black" on:click|preventDefault={() => changeCase(caseItem)}>{caseItem.title}</a>
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
                                                <img src="https://via.placeholder.com/150" alt="" class="w-100 border border-black">
                                            </div>
                                            <div class="w-65 h-100 d-flex flex-column p-2">
                                                <h3 class="font-6"><b>{caseItem.title}</b></h3>
                                                <p class="font-8 text-truncate-2 mb-2">{caseItem.description}</p>
                                                <div class="d-flex align-items-center justify-content-between mt-auto">
                                                    <div class="font-8 text-blue">Technology</div>
                                                    <a href={`#${caseItem.id}`} class="text-underline text-black" on:click|preventDefault={() => changeCase(caseItem)}>read more</a>
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
            <div class="col-lg-8 h-100">
                <div class="max-h-screen scrolling border border-black p-3">
                    {#each caseItems as caseItem (caseItem.id)}
                        <div id={caseItem.id}>
                            <h2 class="font-2 mb-3"><b>{caseItem.title}</b></h2>
                            <div class="mb-3">
                                <div>{caseItem.content}</div>
                            </div>
                        </div>
                    {/each}
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
                                            <img src="https://via.placeholder.com/150" alt="" class="w-100 border border-black">
                                        </div>
                                        <div class="w-65 h-100 d-flex flex-column p-2">
                                            <h3 class="font-6"><b>{caseItem.title}</b></h3>
                                            <p class="font-8 text-truncate-2 mb-2">{caseItem.description}</p>
                                            <div class="d-flex align-items-center justify-content-between mt-auto">
                                                <div class="font-8 text-blue">Technology</div>
                                                <a href={`#${caseItem.id}`} class="text-underline text-black" on:click|preventDefault={() => changeCase(caseItem)}>read more</a>
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

