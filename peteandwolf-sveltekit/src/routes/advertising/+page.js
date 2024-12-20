import { redirect } from '@sveltejs/kit';

export function load() {
    throw redirect(307, '/advertising/telia-christmas-2024');
}