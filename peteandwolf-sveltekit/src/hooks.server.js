// src/hooks.server.js
export async function handle({ event, resolve }) {
    const response = await resolve(event);
    
    // Add security headers and caching
    const headers = {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
    };

    Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
}