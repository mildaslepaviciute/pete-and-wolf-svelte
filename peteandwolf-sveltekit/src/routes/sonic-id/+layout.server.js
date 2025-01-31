// src/routes/sonic-id/+layout.server.js
import { client } from '$lib/sanityClient';

export async function load() {
    const query = `*[_type == "sonicIdProject"] | order(order asc) {
        title,
        "slug": slug.current,
        description,
        "thumbnail": {
            "url": thumbnail.asset->url,
            "alt": thumbnail.alt
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
                },
                col_2 {
                    type,
                    textContent,
                    "imageContent": {
                        "url": imageContent.asset->url,
                        "alt": imageContent.alt
                    },
                },
                col_3 {
                    type,
                    textContent,
                    "imageContent": {
                        "url": imageContent.asset->url,
                        "alt": imageContent.alt
                    },
                }
            }
        }
    }`;

    const caseItems = await client.fetch(query);
    return { caseItems };
}