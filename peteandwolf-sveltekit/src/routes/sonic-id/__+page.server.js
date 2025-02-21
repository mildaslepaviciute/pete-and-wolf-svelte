import { client } from '$lib/sanityClient';
import groq from 'groq';
import { error } from '@sveltejs/kit';

export const load = async () => {
    try {
        const query = groq`*[_type == "sonicIdPage"][0] {
            title,
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
                        }
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
                        }
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
                        }
                    }
                }
            }
        }`;

        const sonicIdData = await client.fetch(query);
        
        if (!sonicIdData) {
            throw error(404, {
                message: 'Sonic ID page content not found'
            });
        }

        return {
            sonicIdData
        };
    } catch (err) {
        console.error('Error loading sonic ID page:', err);
        throw error(500, {
            message: 'Error loading sonic ID page content'
        });
    }
};