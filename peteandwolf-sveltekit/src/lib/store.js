import { writable } from 'svelte/store';

// Create a store to track the currently playing audio player
export const audioPlayerActive = writable(null);