// src/routes/about/+page.server.js
import { client } from '$lib/sanityClient';
import groq from 'groq';
import { error } from '@sveltejs/kit';

export const load = async () => {
    try {
        const query = groq`*[_type == "aboutUs"][0] {
            title,
            "mainImage": {
                "url": mainImage.asset->url,
                "alt": mainImage.alt
            },
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
        }`;

        const aboutData = await client.fetch(query);

        return {
            aboutData
        };
    } catch (err) {
        console.error('Error loading about page:', err);
        throw error(500, {
            message: 'Error loading about page content'
        });
    }
};