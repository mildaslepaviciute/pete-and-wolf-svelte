import { client } from '$lib/sanityClient';

export async function load() {
    const projectsQuery = `*[_type == "sonicIdProject"] | order(orderRank) {
        title,
        "slug": slug.current,
        description,
        orderRank,
        "thumbnail": {
            "type": thumbnail.type,
            "url": thumbnail.image.asset->url,
            "videoId": thumbnail.videoId
        },
        sections[] {
            title,
            titleAlignment,
            titleSize,
            blocks[] {
                grid,
                col_1 {
                    type,
                    textContent,
                    textAlignment,
                    includeNavigation,
                    "imageContent": {
                        "url": imageContent.asset->url,
                        "alt": imageContent.alt
                    },
                    "audioContents": audioContents[] {
                        "audioFile": {
                            "url": audioFile.asset->url
                        },
                        title
                    },
                    videoId,
                    videoControls,
                    "videoPosterImage": {
                        "url": videoPosterImage.asset->url,
                        "alt": videoPosterImage.alt
                    },
                },
                col_2 {
                    type,
                    textContent,
                    textAlignment,
                    "imageContent": {
                        "url": imageContent.asset->url,
                        "alt": imageContent.alt
                    },
                    "audioContents": audioContents[] {
                        "audioFile": {
                            "url": audioFile.asset->url
                        },
                        title
                    },
                    videoId,
                    videoControls,
                    "videoPosterImage": {
                        "url": videoPosterImage.asset->url,
                        "alt": videoPosterImage.alt
                    },
                },
                col_3 {
                    type,
                    textContent,
                    textAlignment,
                    "imageContent": {
                        "url": imageContent.asset->url,
                        "alt": imageContent.alt
                    },
                    "audioContents": audioContents[] {
                        "audioFile": {
                            "url": audioFile.asset->url
                        },
                        title
                    },
                    videoId,
                    videoControls,
                    "videoPosterImage": {
                        "url": videoPosterImage.asset->url,
                        "alt": videoPosterImage.alt
                    },
                }
            }
        }
    }`;

    const [caseItems] = await Promise.all([
        client.fetch(projectsQuery),
    ]);

    return { 
        caseItems,
    };
}