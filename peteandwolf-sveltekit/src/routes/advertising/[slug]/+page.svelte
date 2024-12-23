<script>
    import { onMount, afterUpdate } from 'svelte';
    import { page } from '$app/stores';
    import { gsap } from 'gsap';
    // import { Swiper } from 'swiper';
    
    // Projects data (same as above)
    const advertisingProjects = [
  {
    slug: 'telia-christmas-2024',
    title: 'Telia Christmas',
    thumbnail: 'https://peteandwolf.com/wp-content/uploads/2023/09/Screenshot-2023-09-14-at-18.15.34-e1694774775893-1915x1080.jpg',
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
    thumbnail: 'https://peteandwolf.com/wp-content/uploads/2024/04/Screenshot-2024-04-16-at-12.03.35-e1713258267526-1920x1078.jpg',
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
    thumbnail: 'https://cdn.pixabay.com/photo/2020/04/13/05/52/runner-5030988_1280.jpg',
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
    thumbnail: 'https://cdn.pixabay.com/photo/2015/09/23/03/56/apple-953625_1280.jpg',
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
    thumbnail: 'https://cdn.pixabay.com/photo/2015/11/12/12/13/snowboarding-1049998_1280.jpg',
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
    thumbnail: 'https://cdn.pixabay.com/photo/2014/10/23/18/05/fall-500402_1280.jpg',
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
    thumbnail: 'https://cdn.pixabay.com/photo/2016/02/18/22/16/spring-1209592_1280.jpg',
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
    thumbnail: 'https://cdn.pixabay.com/photo/2015/06/19/21/24/bmw-815527_1280.jpg',
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
    thumbnail: 'https://cdn.pixabay.com/photo/2015/01/09/02/45/google-593836_1280.jpg',
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
    // Get current project from URL slug
    $: currentProject = advertisingProjects.find(p => p.slug === $page.params.slug) || advertisingProjects[0];

    // Reactive statement to handle current project changes
    $: if (currentProject) {
      gsap.to('[fm-fade-in]', { opacity: 0, duration: 0, onComplete: () => {
        gsap.to('[fm-fade-in]', { opacity: 1, duration: 1.5 });
      }});
    }
       
    // Reference to the video element
    let videoElement;

    // Handle route changes
    afterUpdate(() => {
        if (videoElement) {
            // Reset the video when the source changes
            videoElement.pause();
            videoElement.currentTime = 0;
            videoElement.load();
        }
    });
    
    onMount(() => {

      var swiper = new Swiper(".scrollSwiperAdvertising", {
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: true,
        loop: true,
        scrollbar: {
          el: ".swiper-scrollbar",
        },
        mousewheel: true,
      });

    });
  </script>
  
  <section class="h-100vh pt-below-nav">
    <div class="container h-100 d-flex flex-column">
      <div class="row align-items-stretch">

        <!-- Main Content Column -->
        <div class="col-lg-8">
          <div class="border border-black">
            <!-- svelte-ignore a11y_media_has_caption -->
            <video 
              class="w-100" 
              preload="metadata" 
              playsinline 
              controls 
              poster={currentProject.thumbnail}
              bind:this={videoElement}
            >
              <source src={currentProject.video} type="video/mp4">
            </video>
          </div>
          <div class="font-8 p-3">
            <div class="row justify-content-between align-items-end">
              <div class="col-lg-4">
                <h2 class="font-5 text-underline mb-3" fm-fade-in>{currentProject.title}</h2>
                <p>{currentProject.description}</p>
              </div>
              <div class="col-lg-4 text-lg-end">
                <p fm-fade-in>{currentProject.credits.role}</p>
                <p>
                  {#each currentProject.credits.details as credit}
                    <span fm-fade-in>{credit}<br></span>
                  {/each}
                </p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Projects List Column -->
        <div class="col-lg-4  ps-lg-1">
          <div class="max-h-screen border border-black overflow-hidden">
            <div class="swiper scrollSwiperAdvertising">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  {#each advertisingProjects as project}
                    <a 
                      href="/advertising/{project.slug}" 
                      class="d-flex align-items-center border-bottom border-black text-decoration-none"
                      class:active={currentProject.slug === project.slug}
                    >
                      <div class="w-35 border-end border-black">
                        <video 
                          class="w-100" 
                          playsinline 
                          autoplay 
                          loop 
                          muted 
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
