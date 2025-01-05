<script>
	import { onMount, afterUpdate } from 'svelte';
	import { page } from '$app/stores';
	import { gsap } from 'gsap';
	
	// Your existing advertisingProjects array...
	const advertisingProjects = [
	{
		slug: 'telia-christmas-2024',
		title: 'Telia Christmas',
		thumbnail: `https://picsum.photos/1920/1080?random=${Math.random()}`,
		video: 'https://peteandwolf.com/wp-content/uploads/2023/09/Ikea_Ukulele_15s_LT_web.mp4',
		description: 'We are thrilled to share this heartfelt Telia Christmas ad, which portrays the experience of a boy on the autism spectrum during the festive season.',
		credits: {
		role: 'Sound design/Original music',
		details: [
			'Agency: Clinic 212',
			'Production: Somefilms',
			'Director: Domas Petronis',
			'DOP: Dopistas Diaponas',
			'Producer: Olga Radcenko & leva Java'
		]
		}
	},
	{
		slug: 'labas',
		title: 'Labas',
		thumbnail: `https://picsum.photos/1920/1080?random=${Math.random()}`,
		video: 'https://peteandwolf.com/wp-content/uploads/2024/04/Labas_sounddraft7.mov',
		description: 'We are thrilled to share this heartfelt Telia Christmas ad, which portrays the experience of a boy on the autism spectrum during the festive season.',
		credits: {
		role: 'Sound design/Original music',
		details: [
			'Agency: Sons & Daughters',
			'Production: Zest Production House',
			'Director: Justas Ramanauskas',
			'Sound design: Pete and Wolf',
			'Producer: Viktorija Kirdeikaite',
		]
		}
	},
	{
		slug: 'nike-summer-2024',
		title: 'Nike Summer',
		thumbnail: `https://picsum.photos/1920/1080?random=${Math.random()}`,
		video: 'https://peteandwolf.com/wp-content/uploads/2023/09/CGATES-BICIUKAS.mp4',
		description: 'This energetic Nike ad captures the spirit of summer with vibrant visuals and an upbeat soundtrack.',
		credits: {
		role: 'Sound design/Original music',
		details: [
			'Agency: Wieden+Kennedy',
			'Production: RSA Films',
			'Director: Melina Matsoukas',
			'DOP: Bradford Young',
			'Producer: Rebecca Skinner'
		]
		}
	},
	{
		slug: 'apple-new-year-2024',
		title: 'Apple New Year',
		thumbnail: `https://picsum.photos/1920/1080?random=${Math.random()}`,
		video: 'https://videos.pexels.com/video-files/6548176/6548176-hd_1920_1080_24fps.mp4',
		description: 'Apple\'s New Year ad showcases the latest technology in a beautifully crafted narrative.',
		credits: {
		role: 'Sound design/Original music',
		details: [
			'Agency: TBWA\Media Arts Lab',
			'Production: Anonymous Content',
			'Director: Spike Jonze',
			'DOP: Hoyte van Hoytema',
			'Producer: David Fincher'
		]
		}
	},
	{
		slug: 'adidas-winter-2024',
		title: 'Adidas Winter',
		thumbnail: `https://picsum.photos/1920/1080?random=${Math.random()}`,
		video: 'https://videos.pexels.com/video-files/7565462/7565462-sd_960_506_25fps.mp4',
		description: 'Adidas\'s winter ad highlights the latest winter sports gear with stunning visuals and dynamic action.',
		credits: {
		role: 'Sound design/Original music',
		details: [
			'Agency: 180 Amsterdam',
			'Production: Stink Films',
			'Director: Ivan Zacharias',
			'DOP: Greig Fraser',
			'Producer: Jeremy Barrett'
		]
		}
	},
	{
		slug: 'samsung-fall-2024',
		title: 'Samsung Fall',
		thumbnail: `https://picsum.photos/1920/1080?random=${Math.random()}`,
		video: 'https://videos.pexels.com/video-files/7102266/7102266-sd_640_360_30fps.mp4',
		description: 'Samsung\'s fall ad introduces the new Galaxy series with a focus on innovation and design.',
		credits: {
		role: 'Sound design/Original music',
		details: [
			'Agency: Cheil Worldwide',
			'Production: MJZ',
			'Director: Fredrik Bond',
			'DOP: Wally Pfister',
			'Producer: Debbie Turner'
		]
		}
	},
	{
		slug: 'pepsi-spring-2024',
		title: 'Pepsi Spring',
		thumbnail: `https://picsum.photos/1920/1080?random=${Math.random()}`,
		video: 'https://videos.pexels.com/video-files/7565986/7565986-sd_960_506_25fps.mp4',
		description: 'Pepsi\'s spring ad is full of energy and freshness, celebrating the vibrancy of the season.',
		credits: {
		role: 'Sound design/Original music',
		details: [
			'Agency: BBDO',
			'Production: Biscuit Filmworks',
			'Director: Noam Murro',
			'DOP: Roger Deakins',
			'Producer: Shawn Lacy'
		]
		}
	},
	{
		slug: 'bmw-summer-2024',
		title: 'BMW Summer',
		thumbnail: `https://picsum.photos/1920/1080?random=${Math.random()}`,
		video: 'https://videos.pexels.com/video-files/5768174/5768174-sd_960_506_25fps.mp4',
		description: 'BMW\'s summer ad showcases the latest models in a thrilling and visually stunning journey.',
		credits: {
		role: 'Sound design/Original music',
		details: [
			'Agency: Goodby Silverstein & Partners',
			'Production: The Mill',
			'Director: Nicolai Fuglsig',
			'DOP: Claudio Miranda',
			'Producer: Melanie Wickham'
		]
		}
	},
	{
		slug: 'google-tech-2024',
		title: 'Google Tech',
		thumbnail: `https://picsum.photos/1920/1080?random=${Math.random()}`,
		video: 'https://videos.pexels.com/video-files/2982434/2982434-sd_640_360_30fps.mp4',
		description: 'Google\'s tech ad introduces the latest advancements in AI and connectivity.',
		credits: {
		role: 'Sound design/Original music',
		details: [
			'Agency: R/GA',
			'Production: Park Pictures',
			'Director: Lance Acord',
			'DOP: Dan Mindel',
			'Producer: Jacqueline Kelman Bisbee'
		]
		}
	},
	];

  	$: currentProject = advertisingProjects.find(p => p.slug === $page.params.slug) || advertisingProjects[0];
    
    let videoContainer;
    let rightColumn;
    let videoElement
	let swiper;

    function adjustVideoHeight() {
        if (videoContainer && rightColumn && window.innerWidth > 992) {
            const rightColumnHeight = rightColumn.offsetHeight;
            const infoSectionHeight = 120; // Your fixed height for the info section
            const newVideoHeight = rightColumnHeight - infoSectionHeight;
            videoContainer.style.height = `${newVideoHeight}px`;
        }
    }

    // Function to update active states for all slides including clones
    function updateActiveSlides(slug) {
		if (!swiper) return;

		// Get all link elements inside slides including clones
		const allSlideLinks = swiper.el.querySelectorAll('.swiper-slide-link');
		
		// Remove bg-primary from all links
		allSlideLinks.forEach(link => {
			link.classList.remove('swiper-slide-link-active');
		});

		// Add bg-primary to links in slides matching the slug
		allSlideLinks.forEach(link => {
			console.log(link.dataset)
			if (link.dataset.slug === slug) {
				link.classList.add('swiper-slide-link-active');
			}
		});
	}

    onMount(() => {
		adjustVideoHeight();
        window.addEventListener('resize', adjustVideoHeight);

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
      	document.querySelectorAll('.scrollSwiperAdvertising video').forEach(video => {
			// Set multiple muting properties
			video.muted = true;
			video.defaultMuted = true;
			//video.volume = 0;
		});

        return () => {
            window.removeEventListener('resize', adjustVideoHeight);
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
        adjustVideoHeight();
    });
</script>

<section class="h-100vh pt-below-nav">
    <div class="container h-100 d-flex flex-column">
        <div class="row align-items-stretch min-h-screen max-h-screen">
            <!-- Main Content Column -->
            <div class="col-lg-8 min-h-screen max-h-screen d-flex flex-column">
                <!-- Video Container -->
                <div class="border border-black bg-black" bind:this={videoContainer}>
                    <!-- svelte-ignore a11y_media_has_caption -->
                    <video 
                        class="w-100 h-100 object-fit-contain"
                        preload="metadata" 
                        playsinline 
                        controls 
                        poster={currentProject.thumbnail}
                        bind:this={videoElement}
                    >
                        <source src={currentProject.video} type="video/mp4">
                    </video>
                </div>

                <!-- Info Section with fixed height -->
                <div class="font-8 position-relative" style="min-height: 100px; margin-top: 20px; margin-bottom: 20px;">
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
                </div>
            </div>
  
            <!-- Projects List Column -->
            <div class="col-lg-4 ps-lg-1 min-h-screen max-h-screen" bind:this={rightColumn}>
                <div class="h-100 border border-black overflow-hidden">
                    <div class="swiper scrollSwiperAdvertising">
                        <div class="swiper-wrapper h-100">
                            <div class="swiper-slide">
                                {#each advertisingProjects as project}
                                    <a 
                                        href="/advertising/{project.slug}" 
                                        class="d-flex align-items-center border-bottom border-black text-decoration-none swiper-slide-link"
										data-slug={project.slug}
									>
                                      <div class="w-35 border-end border-black">
                                          <video 
                                              class="w-100" 
                                              playsinline 
                                              autoplay 
                                              loop 
                                              muted="muted"
                                              poster={project.thumbnail}
                                          >
                                              <source src={project.video} type="video/mp4">
                                          </video>
                                      </div>
                                      <div class="w-65 h-100 d-flex align-items-center font-7 p-3 text-black">
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