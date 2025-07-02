// src/routes/advertising/[slug]/+page.server.js
import { client } from '$lib/sanityClient';  // Assuming you have your Sanity client configured in lib
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const query = `*[_type == "advertisingProject"] | order(orderRank) {
        title,
        slug,
        videoId,
        videoPreviewId,
        thumbnail,
        description,
        type,
        credits,
        order
    }`;

    try {
        const advertisingProjects = await client.fetch(query);
        
        if (advertisingProjects.length === 0) {
            throw error(404, 'No advertising projects found');
        }

        // If a specific slug is requested, make sure it exists
        if (params.slug) {
            const projectExists = advertisingProjects.some(
                project => project.slug.current === params.slug
            );
            
            if (!projectExists) {
                throw error(404, 'Project not found');
            }
        }

        return {
            advertisingProjects,
        };
    } catch (err) {
        console.error('Error loading advertising projects:', err);
        throw error(500, 'Error loading advertising projects');
    }
}