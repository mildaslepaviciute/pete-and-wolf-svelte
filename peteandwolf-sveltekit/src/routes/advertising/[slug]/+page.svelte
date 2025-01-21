<script>
  import { onMount, afterUpdate } from "svelte";
  import { page } from "$app/stores";
  import { gsap } from "gsap";

  // Your existing advertisingProjects array...
  const advertisingProjects = [
    {
      slug: "telia-christmas-2024",
      title: "Telia Christmas",
      thumbnail: `https://picsum.photos/1920/1080?random=${Math.random()}`,
      video:
        "https://peteandwolf.com/wp-content/uploads/2023/09/Ikea_Ukulele_15s_LT_web.mp4",
      description:
        "We are thrilled to share this heartfelt Telia Christmas ad, which portrays the experience of a boy on the autism spectrum during the festive season.",
      credits: {
        role: "Sound design/Original music",
        details: [
          "Agency: Clinic 212",
          "Production: Somefilms",
          "Director: Domas Petronis",
          "DOP: Dopistas Diaponas",
          "Producer: Olga Radcenko & leva Java",
        ],
      },
    },
    {
      slug: "labas",
      title: "Labas",
      thumbnail: `https://picsum.photos/1920/1080?random=${Math.random()}`,
      video:
        "https://peteandwolf.com/wp-content/uploads/2024/04/Labas_sounddraft7.mov",
      description:
        "We are thrilled to share this heartfelt Telia Christmas ad, which portrays the experience of a boy on the autism spectrum during the festive season.",
      credits: {
        role: "Sound design/Original music",
        details: [
          "Agency: Sons & Daughters",
          "Production: Zest Production House",
          "Director: Justas Ramanauskas",
          "Sound design: Pete and Wolf",
          "Producer: Viktorija Kirdeikaite",
        ],
      },
    },
    {
      slug: "nike-summer-2024",
      title: "Nike Summer",
      thumbnail: `https://picsum.photos/1920/1080?random=${Math.random()}`,
      video:
        "https://peteandwolf.com/wp-content/uploads/2023/09/CGATES-BICIUKAS.mp4",
      description:
        "This energetic Nike ad captures the spirit of summer with vibrant visuals and an upbeat soundtrack.",
      credits: {
        role: "Sound design/Original music",
        details: [
          "Agency: Wieden+Kennedy",
          "Production: RSA Films",
          "Director: Melina Matsoukas",
          "DOP: Bradford Young",
          "Producer: Rebecca Skinner",
        ],
      },
    },
    {
      slug: "apple-new-year-2024",
      title: "Apple New Year",
      thumbnail: `https://picsum.photos/1920/1080?random=${Math.random()}`,
      video:
        "https://videos.pexels.com/video-files/6548176/6548176-hd_1920_1080_24fps.mp4",
      description:
        "Apple's New Year ad showcases the latest technology in a beautifully crafted narrative.",
      credits: {
        role: "Sound design/Original music",
        details: [
          "Agency: TBWAMedia Arts Lab",
          "Production: Anonymous Content",
          "Director: Spike Jonze",
          "DOP: Hoyte van Hoytema",
          "Producer: David Fincher",
        ],
      },
    },
    {
      slug: "adidas-winter-2024",
      title: "Adidas Winter",
      thumbnail: `https://picsum.photos/1920/1080?random=${Math.random()}`,
      video:
        "https://videos.pexels.com/video-files/7565462/7565462-sd_960_506_25fps.mp4",
      description:
        "Adidas's winter ad highlights the latest winter sports gear with stunning visuals and dynamic action.",
      credits: {
        role: "Sound design/Original music",
        details: [
          "Agency: 180 Amsterdam",
          "Production: Stink Films",
          "Director: Ivan Zacharias",
          "DOP: Greig Fraser",
          "Producer: Jeremy Barrett",
        ],
      },
    },
    {
      slug: "samsung-fall-2024",
      title: "Samsung Fall",
      thumbnail: `https://picsum.photos/1920/1080?random=${Math.random()}`,
      video:
        "https://videos.pexels.com/video-files/7102266/7102266-sd_640_360_30fps.mp4",
      description:
        "Samsung's fall ad introduces the new Galaxy series with a focus on innovation and design.",
      credits: {
        role: "Sound design/Original music",
        details: [
          "Agency: Cheil Worldwide",
          "Production: MJZ",
          "Director: Fredrik Bond",
          "DOP: Wally Pfister",
          "Producer: Debbie Turner",
        ],
      },
    },
    {
      slug: "pepsi-spring-2024",
      title: "Pepsi Spring",
      thumbnail: `https://picsum.photos/1920/1080?random=${Math.random()}`,
      video:
        "https://videos.pexels.com/video-files/7565986/7565986-sd_960_506_25fps.mp4",
      description:
        "Pepsi's spring ad is full of energy and freshness, celebrating the vibrancy of the season.",
      credits: {
        role: "Sound design/Original music",
        details: [
          "Agency: BBDO",
          "Production: Biscuit Filmworks",
          "Director: Noam Murro",
          "DOP: Roger Deakins",
          "Producer: Shawn Lacy",
        ],
      },
    },
    {
      slug: "bmw-summer-2024",
      title: "BMW Summer",
      thumbnail: `https://picsum.photos/1920/1080?random=${Math.random()}`,
      video:
        "https://videos.pexels.com/video-files/5768174/5768174-sd_960_506_25fps.mp4",
      description:
        "BMW's summer ad showcases the latest models in a thrilling and visually stunning journey.",
      credits: {
        role: "Sound design/Original music",
        details: [
          "Agency: Goodby Silverstein & Partners",
          "Production: The Mill",
          "Director: Nicolai Fuglsig",
          "DOP: Claudio Miranda",
          "Producer: Melanie Wickham",
        ],
      },
    },
    {
      slug: "google-tech-2024",
      title: "Google Tech",
      thumbnail: `https://picsum.photos/1920/1080?random=${Math.random()}`,
      video:
        "https://videos.pexels.com/video-files/2982434/2982434-sd_640_360_30fps.mp4",
      description:
        "Google's tech ad introduces the latest advancements in AI and connectivity.",
      credits: {
        role: "Sound design/Original music",
        details: [
          "Agency: R/GA",
          "Production: Park Pictures",
          "Director: Lance Acord",
          "DOP: Dan Mindel",
          "Producer: Jacqueline Kelman Bisbee",
        ],
      },
    },
  ];

  $: currentProject =
    advertisingProjects.find((p) => p.slug === $page.params.slug) ||
    advertisingProjects[0];

  let videoContainer;
  let rightColumn;
  let leftColumn
  let videoElement;
  let swiper;

  function adjustVideoHeight() {
    if (videoContainer && rightColumn && window.innerWidth > 992) {
        const rightColumnHeight = rightColumn.scrollHeight;
        console.log('Initial right column height: ' + rightColumn.scrollHeight);
        console.log('Initial left column height: ' + leftColumn.scrollHeight);

        if (leftColumn.scrollHeight > rightColumn.scrollHeight) {
            let padding = 0;
            const step = 1;
            const maxIterations = 500;
            let iterations = 0;
            let lastHeight = leftColumn.scrollHeight;

            // Get the container
            const container = document.querySelector('#advertisingContainer');
            
            // Reset container padding
            container.style.setProperty('padding-left', '0', 'important');
            container.style.setProperty('padding-right', '0', 'important');

            while (leftColumn.scrollHeight > rightColumn.scrollHeight && iterations < maxIterations) {
                padding += step;
                // Apply padding to the container class
                container.style.setProperty('padding-left', `${padding}px`, 'important');
                container.style.setProperty('padding-right', `${padding}px`, 'important');
                
                if (leftColumn.scrollHeight === lastHeight) {
                    padding += step * 2;
                }
                lastHeight = leftColumn.scrollHeight;
                iterations++;

                if (iterations % 50 === 0) {
                    console.log(`Iteration ${iterations}: Current height difference: ${leftColumn.scrollHeight - rightColumn.scrollHeight}px`);
                }
            }

            console.log('Final container padding applied: ' + padding + 'px');
            console.log('Final iterations needed: ' + iterations);
            console.log('Final height difference: ' + (leftColumn.scrollHeight - rightColumn.scrollHeight) + 'px');

            if (iterations >= maxIterations) {
                console.warn('Maximum iterations reached without achieving desired height match');
            }
        }
    }
  }

  // Function to update active states for all slides including clones
  function updateActiveSlides(slug) {
	console.log(slug)
    if (!swiper) return;

    // Get all link elements inside slides including clones
    const allSlideLinks = swiper.el.querySelectorAll(".swiper-slide-link");

    // Remove bg-primary from all links
    allSlideLinks.forEach((link) => {
      link.classList.remove("swiper-slide-link-active");
    });

    // Add bg-primary to links in slides matching the slug
    allSlideLinks.forEach((link) => {
     // console.log(link.dataset);
      if (link.dataset.slug === slug) {
        link.classList.add("swiper-slide-link-active");
      }
    });
  }

  let collapseElement;

  onMount(() => {
    adjustVideoHeight();
    window.addEventListener("resize", adjustVideoHeight);

    swiper = new Swiper(".scrollSwiperAdvertising", {
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
        const bsCollapse = bootstrap.Collapse.getInstance(collapseElement);
        if (!collapseElement.contains(event.target)) {
          bsCollapse?.hide();
        }
      }
    };
    document.addEventListener("click", closeCollapse);

    return () => {
      window.removeEventListener("resize", adjustVideoHeight);
	  document.removeEventListener("click", closeCollapse);
    };
  });

  // Watch for URL changes
  $: if ($page.params.slug) {
    updateActiveSlides($page.params.slug);
  }

  afterUpdate(() => {
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
      videoElement.load();
    }
    //adjustVideoHeight();
  });
</script>

<section class="h-100vh pt-below-nav overflow-hidden">
  <div class="container h-100 d-flex flex-column" id="advertisingContainer">
    <div class="row align-items-stretch min-h-screen max-h-screen">
      <!-- Main Content Column -->
      <div
        class="col-lg-8 min-h-lg-screen max-h-screen d-flex flex-column px-0-mob"
		bind:this={leftColumn}
      >
        <div class="position-relative">
          <div
            class="position-absolute dropstart d-flex d-lg-none text-rotate top-0 end-0 text-end z-1"
          >
            <div
              class="bg-blue font-5 fw-bold text-white py-4"
              id="toggleButton"
              data-bs-toggle="collapse"
              data-bs-target="#collapseWidthExample"
              aria-controls="offcanvasCredits"
            >
              + Credits
            </div>
          </div>
          <div
            class="position-absolute z-2"
            style="right: 25px; top: 1px; display: flex; justify-content: flex-end;"
          >
            <div
              class="collapse collapse-horizontal collapse-right"
              id="collapseWidthExample"
              bind:this={collapseElement}
            >
              <div
                class="card card-body border-0 rounded-0 font-9 p-3"
                style="width: 200px;"
              >
                <h2 class="font-7 text-underline" fm-fade-in>
                  {currentProject.title}
                </h2>
                <p fm-fade-in>{currentProject.description}</p>
                <p fm-fade-in>{currentProject.credits.role}</p>
                <p class="mb-0" fm-fade-in>
                  {#each currentProject.credits.details as credit}
                    <span>{credit}<br /></span>
                  {/each}
                </p>
              </div>
            </div>
          </div>

          <!-- <div class="position-absolute d-flex d-lg-none text-rotate top-0 end-0 text-end z-1">
				<div class="bg-blue font-5 fw-bold text-white py-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCredits" aria-controls="offcanvasCredits">+ Credits</div>
			</div>
			<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCredits" aria-labelledby="offcanvasCreditsLabel">
				<div class="font-8 p-3">
					<div class="mb-4">
						<h2 class="font-5 text-underline" fm-fade-in>{currentProject.title}</h2>
						<p fm-fade-in>{currentProject.description}</p>
					</div>
					<div class="mb-4">
						<p fm-fade-in>{currentProject.credits.role}</p>
						<p fm-fade-in>
							{#each currentProject.credits.details as credit}
								<span>{credit}<br></span>
							{/each}
						</p>
					</div>
				</div>
			</div> -->
        </div>

        <!-- Video Container -->
        <div
          class="border border-black border-x-0-mob bg-black"
          bind:this={videoContainer}
        >
          <!-- svelte-ignore a11y_media_has_caption -->
          <!-- <video 
                        class="w-100 h-100 object-fit-contain"
                        preload="metadata" 
                        playsinline 
                        controls 
                        poster={currentProject.thumbnail}
                        bind:this={videoElement}
                    >
                        <source src={currentProject.video} type="video/mp4">
                    </video> -->
          <div style="position:relative;padding-top:56.25%;">
            <iframe
              src="https://iframe.mediadelivery.net/embed/368997/0b5146a4-ce8a-491a-a309-a795f481c580?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
              loading="lazy"
              style="border:0;position:absolute;top:0;height:100%;width:100%;"
              allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
              allowfullscreen="true"
            ></iframe>
          </div>
        </div>
        <!-- Info Section with fixed height -->
        <!-- <div class="font-8 position-relative" style="min-height: 100px; margin-top: 20px; margin-bottom: 20px;">
			<div class="position-absolute top-0 start-0">
				<h2 class="font-5 text-underline" fm-fade-in>{currentProject.title}</h2>
			</div>
			<div class="position-absolute bottom-0 start-0">
				<p fm-fade-in class="mb-0" style="max-width: 33.33%">{currentProject.description}</p>
			</div>
			<div class="position-absolute top-0 end-0 text-end">
				<p fm-fade-in>{currentProject.credits.role}</p>
			</div>
			<div class="position-absolute bottom-0 end-0 text-end">
				<p fm-fade-in class="mb-0">
					{#each currentProject.credits.details as credit}
						<span>{credit}<br></span>
					{/each}
				</p>
			</div>
		</div> -->
        <div class="d-none d-lg-block font-8 pt-3">
          <div class="row justify-content-between align-items-end mb-3">
            <div class="col-lg-4">
              <h2 class="font-5 text-underline mb-0" fm-fade-in>
                {currentProject.title}
              </h2>
            </div>
            <div class="col-lg-4 text-lg-end">
              <p class="mb-0" fm-fade-in>{currentProject.credits.role}</p>
            </div>
          </div>
          <div class="row justify-content-between align-items-end">
            <div class="col-lg-3">
              <p class="mb-0" fm-fade-in>{currentProject.description}</p>
            </div>
            <div class="col-lg-4 text-lg-end">
              <p class="mb-0" fm-fade-in>
                {#each currentProject.credits.details as credit}
                  <span>{credit}<br /></span>
                {/each}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Projects List Column -->
      <div
        class="col-lg-4 ps-lg-1 min-h-screen max-h-screen px-0-mob"
        bind:this={rightColumn}
      >
        <div
          class="h-100 border border-black border-x-0-mob border-top-0-mob overflow-hidden"
        >
          <div class="swiper scrollSwiperAdvertising">
            <div class="swiper-wrapper h-100">
              <div class="swiper-slide">
                {#each advertisingProjects as project}
                  <a
                    href="/advertising/{project.slug}"
                    class="d-flex align-items-center border-bottom border-black text-decoration-none swiper-slide-link"
                    data-slug={project.slug}
                  >
                    <div class="w-35 bg-black border-end border-black">
                      <!-- <div style="position:relative;padding-top:56.25%;"><iframe src="https://iframe.mediadelivery.net/embed/368997/0b5146a4-ce8a-491a-a309-a795f481c580?autoplay=false&loop=false&muted=false&preload=true&responsive=true&controls=false" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe></div> -->
                      <video
                        class="w-100"
                        playsinline
                        autoplay
                        loop
                        muted="muted"
                        poster={project.thumbnail}
                      >
                        <!-- <source src={project.video} type="video/mp4"> -->
                        <source
                          src="https://iframe.mediadelivery.net/play/368997/0b5146a4-ce8a-491a-a309-a795f481c580"
                          type="video/mp4"
                        />
                      </video>
                    </div>
                    <div
                      class="w-65 h-100 d-flex align-items-center font-7 p-3 text-black"
                    >
                      {project.title}
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
