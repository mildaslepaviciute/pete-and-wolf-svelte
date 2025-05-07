export const prerender = false;

import { client } from '$lib/sanityClient';
import { error } from '@sveltejs/kit';

export const load = async () => {
    try {
        const homeData = await client.fetch(`*[_type == "homePage"][0]{
            title,
            "backgroundImage": {
                "url": backgroundImage.asset->url,
                "alt": backgroundImage.alt
            }
        }`);

        if (!homeData) {
            throw error(404, 'Home page data not found');
        }

        return {
            homeData
        };
    } catch (err) {
        console.error('Error loading layout:', err);
        throw error(500, { message: 'Error loading layout content' });
    }
};
