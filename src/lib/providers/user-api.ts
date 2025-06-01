
import { baseUrl } from '$lib/constant/base-url';
import axios from 'axios';
import toast from 'svelte-french-toast';

interface userApiProps {
	name: string
	image:File | null
	bio: string
}
export const userApi = {
    async updateUser( data: userApiProps) {
		try {
			const formData = new FormData();
			formData.append('name', data.name);
			formData.append('bio', data.bio);

			if (data.image instanceof File) {
				formData.append('image', data.image);
			}
            
			const response = await axios.post(`${baseUrl}/me/update`, formData, {
				withCredentials: true
			});

			toast.success(response.data?.message);
		} catch (error) {
			if (axios?.isAxiosError(error)) {
				const message = error?.response?.data?.message ?? 'Internal Server Error';
				toast.error(message);
			} else {
				toast.error('Client error');
			}
			console.error(error);
		}
	}
};
