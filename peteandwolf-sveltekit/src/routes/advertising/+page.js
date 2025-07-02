import { redirect } from '@sveltejs/kit';
import { client } from '$lib/sanityClient';

export async function load() {
    const query = `*[_type == "advertisingProject"] | order(orderRank) {
        "slug": slug.current
    }[0]`;

    try {
        const firstProject = await client.fetch(query);
        
        if (!firstProject || !firstProject.slug) {
            throw new Error('No advertising projects found');
        }

        throw redirect(307, `/advertising/${firstProject.slug}`);
    } catch (err) {
        // Only catch non-redirect errors
        if (err.status === 307) {
            throw err; // Re-throw redirects
        }
        
        console.error('Error loading first advertising project:', err);
        
        // Try to get any project as fallback
        const fallbackQuery = `*[_type == "advertisingProject"] {
            "slug": slug.current
        }[0]`;
        
        try {
            const fallbackProject = await client.fetch(fallbackQuery);
            if (fallbackProject && fallbackProject.slug) {
                throw redirect(307, `/advertising/${fallbackProject.slug}`);
            }
        } catch (fallbackErr) {
            console.error('Fallback query also failed:', fallbackErr);
        }
        
        // Last resort - redirect to a 404 or error page
        throw redirect(307, '/404');
    }
}