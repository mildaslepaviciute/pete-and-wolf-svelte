import { writable } from 'svelte/store';

// Create a store to track the currently playing audio player
export const audioPlayerActive = writable(null);

// Create a store to track the currently playing video player
export const videoPlayerActive = writable(null);