import type { Profile } from '$lib/types/user-types';
import { derived, writable } from 'svelte/store';

export const isLogin = writable<boolean>(false);
export const profile = writable<Profile | null>(null);

export const isAdmin = derived(profile , ($profile) => $profile?.role === "ADMIN");
