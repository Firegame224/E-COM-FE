import { baseUrl } from '$lib/constant/base-url';
import axios from 'axios';
import toast from 'svelte-french-toast';

export const catApi = {
	async getAllCategories() {
		try {
			const response = await axios.get(`${baseUrl}/category`);
			return response.data.data;
		} catch (error) {
			console.log(error);
			return;
		}
	},
	async createCategory(data: { name: string }) {
		try {
			const response = await axios.post(
				`${baseUrl}/admin/category`,
				{
					name: data.name
				},
				{
					withCredentials: true
				}
			);

			toast.success(response.data.message);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data.message ?? 'Internal Server Error';
				toast.error(message);
			} else {
				toast.error('Client Error');
			}
			console.log(error);
		}
	},
	async addProductCategory(data: { id: string; name: string[] }) {
		try {
			if (data.name.length === 0 || !data.id) {
				toast.error('Category Tidak Boleh Kosong');
			}

			const response = await axios.post(`${baseUrl}/category/add`, {
				name: data.name,
				productId: data.id
			});

			toast.success('Berhasil Menambahkan Category');
			return response;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data.message ?? 'Internal Server Error';
				toast.error(message);
			} else {
				toast.error('Client Error');
			}
			console.log(error);
		}
	},
	async deleteProductCategory(data: { id: string }) {
		try {
			if (!data.id) {
				toast.error('Product Tidak Ditemukan');
			}

			const response = await axios.delete(`${baseUrl}/category/remove`, {
				data: { productId: data.id }
			});

			toast.success('Berhasil Menghapus Category');
			return response;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data.message ?? 'Internal Server Error';
				toast.error(message);
			} else {
				toast.error('Client Error');
			}

			console.log(error);
		}
	},
	async deleteCategory(data: { id: string }) {
		try {
			if (!data.id) {
				toast.error('Product Tidak Ditemukan');
			}

			const response = await axios.delete(`${baseUrl}/category/${data.id}`, {
				withCredentials: true
			});

			toast.success('Berhasil Menghapus Category');
			return response;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data.message ?? 'Internal Server Error';
				toast.error(message);
			} else {
				toast.error('Client Error');
			}

			console.log(error);
		}
	}
};
