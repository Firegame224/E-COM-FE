/* eslint-disable @typescript-eslint/no-unused-vars */
import { isLogin, profile } from '$lib/stores/user-store';
import axios from 'axios';

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
		isLogin.set(true)
		return data;
	} catch (error) {
		profile.set(null)
		isLogin.set(false)
		return null;
	}
};
