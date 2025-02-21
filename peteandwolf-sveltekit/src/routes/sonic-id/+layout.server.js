// src/routes/sonic-id/+layout.server.js
import { client } from '$lib/sanityClient';

export async function load() {
    const projectsQuery = `*[_type == "sonicIdProject"] | order(order asc) {
        title,
        "slug": slug.current,
        description,
        "thumbnail": {
            "type": thumbnail.type,
            "url": thumbnail.image.asset->url,
            "videoId": thumbnail.videoId
        },
        sections[] {
            title,
            blocks[] {
                grid,
                col_1 {
                    type,
                    textContent,
                    "imageContent": {
                        "url": imageContent.asset->url,
                        "alt": imageContent.alt
                    },
                    "audioContent": {
                        "url": audioContent.asset->url
                    },
                    videoId,
                },
                col_2 {
                    type,
                    textContent,
                    "imageContent": {
                        "url": imageContent.asset->url,
                        "alt": imageContent.alt
                    },
                    "audioContent": {
                        "url": audioContent.asset->url
                    },
                    videoId,
                },
                col_3 {
                    type,
                    textContent,
                    "imageContent": {
                        "url": imageContent.asset->url,
                        "alt": imageContent.alt
                    },
                    "audioContent": {
                        "url": audioContent.asset->url
                    },
                    videoId,
                }
            }
        }
    }`;

    const basePageQuery = `*[_type == "sonicIdPage"][0] {
        title,
        "slug": null,
        description,
        "thumbnail": {
            "type": thumbnail.type,
            "url": thumbnail.image.asset->url,
            "videoId": thumbnail.videoId
        },
        sections[] {
            title,
            blocks[] {
                grid,
                col_1 {
                    type,
                    textContent,
                    "imageContent": {
                        "url": imageContent.asset->url,
                        "alt": imageContent.alt
                    },
                    "audioContent": {
                        "url": audioContent.asset->url
                    },
                    videoId,
                },
                col_2 {
                    type,
                    textContent,
                    "imageContent": {
                        "url": imageContent.asset->url,
                        "alt": imageContent.alt
                    },
                    "audioContent": {
                        "url": audioContent.asset->url
                    },
                    videoId,
                },
                col_3 {
                    type,
                    textContent,
                    "imageContent": {
                        "url": imageContent.asset->url,
                        "alt": imageContent.alt
                    },
                    "audioContent": {
                        "url": audioContent.asset->url
                    },
                    videoId,
                }
            }
        }
    }`;

    const [caseItems, sonicIdData] = await Promise.all([
        client.fetch(projectsQuery),
        client.fetch(basePageQuery)
    ]);

    return { 
        caseItems,
        sonicIdData 
    };
}