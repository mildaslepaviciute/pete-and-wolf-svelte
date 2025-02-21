// /advertising/+page.server.js (create this file)
import { redirect } from '@sveltejs/kit';
import { client } from '$lib/sanityClient';

export async function load() {
    const query = `*[_type == "advertisingProject"] | order(order asc) {
        "slug": slug.current
    }[0]`;

    try {
        const latestProject = await client.fetch(query);
        if (!latestProject) {
            throw new Error('No advertising projects found');
        }

        console.log('Redirecting to latest advertising project:', latestProject.slug);
        
        redirect(307, `/advertising/${latestProject.slug}`);
    } catch (err) {
        console.error('Error loading latest advertising project:', err);
        // Fallback to a default if there's an error
        throw redirect(307, '/advertising/telia-christmas');
    }
}