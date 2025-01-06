// src/hooks.server.js
export async function handle({ event, resolve }) {
    const response = await resolve(event);
    
    // Add security headers and caching
    const headers = {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
    };

    Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
}