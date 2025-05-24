/* eslint-disable @typescript-eslint/no-unused-vars */
import { profile } from '$lib/stores/user-store';
import axios from 'axios';
import toast from 'svelte-french-toast';

export const authSession = async () => {
	try {
		const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/me`, {
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true
		});

		const data = response.data.data;
		
		profile.set(data)
		
		return data;
	} catch (error) {
		profile.set(null)
		toast.error("Session Expired")
		return null;
	}
};
