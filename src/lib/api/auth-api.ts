import { goto } from '$app/navigation';
import { baseUrl } from '$lib/constant/base-url';
import { isLogin } from '$lib/stores/user-store';
import type { AuthSignProps } from '$lib/types/auth-types';
import axios from 'axios';
import toast from 'svelte-french-toast';


export const authApi = {
	async login(e: SubmitEvent, { email, password }: AuthSignProps) {
		e.preventDefault();
		try {
			const response = await axios.post(
				`${baseUrl}/auth/login`,
				{
					email : email.trim(),
					password
				},
				{
					headers: {
						'Content-Type': 'application/json'
					},
					withCredentials : true
				}
			);

			if (response.status === 200 || response.status === 201) {
				isLogin.set(true)
				toast.success(`Login Berhasil`);
				goto('/', {invalidateAll : true});
			} else {
				toast.error(`${response.data?.message}`);
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message ?? `Internal Server Error`;
				toast.error(message);
			} else {
				toast.error(`Client error`);
			}
			console.error(error);
		}
	},
	async register(e: SubmitEvent, { email, password }: AuthSignProps) {
		e.preventDefault();
		try {
			const response = await axios.post(
				`${baseUrl}/auth/register`,
				{
					email : email.trim(),
					password
				},
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			if (response.status === 200) {
				toast.success('Register Berhasil');
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message ?? `Internal Server Error`;
				toast.error(message);
			} else {
				toast.error(`Client error`);
			}
			console.error(error);
		}
	},
	async logOut() {
	try {
		const response = await axios.post(`${baseUrl}/auth/logout`, {},{
			withCredentials : true
		})

		if (response.status ===  200) {
			toast.success("Logout Berhasil")
		}	
	} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message ?? `Internal Server Error`;
				toast.error(message);
			} else {
				toast.error(`Client error`);
			}
			console.error(error);		
		}
	}
};
