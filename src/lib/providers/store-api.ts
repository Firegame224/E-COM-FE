import { baseUrl } from '$lib/constant/base-url';
import type { createStore } from '$lib/types/store-types';
import axios from 'axios';
import toast from 'svelte-french-toast';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const storeApi = {
	async getStoresByUserId() {
		try {
			const response = await axios.get(`${baseUrl}/store/user`, { withCredentials: true });
			const stores = response.data.data;
			return stores;
		} catch (error) {
			return;
		}
	},
	async getStoreById(data: { id: string }) {
		try {
			const response = await axios.get(`${baseUrl}/store/${data.id}`);
			const store = response.data.data;

			return store;
		} catch (error) {
			return;
		}
	},
	async createStore(data: createStore) {
		try {
			const response = await axios.post(
				`${baseUrl}/store`,
				{
					name: data.name,
					info: data.info
				},
				{
					withCredentials: true
				}
			);

			toast.success(response.data?.message);
			return response.data.data;
		} catch (error) {
			if (axios?.isAxiosError(error)) {
				const message = error?.response?.data?.message ?? 'Internal Server Error';
				toast.error(message);
			} else {
				toast.error('Client error');
			}
			console.error(error);
		}
	},
	async updateStore(data: { id: string; name: string | undefined; info: string | undefined }) {
		try {
			const response = await axios.patch(
				`${baseUrl}/store/${data.id}`,
				{
					name: data.name,
					info: data.info
				},
				{
					withCredentials: true
				}
			);

			toast.success('Berhasil update store');
			return;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data.message ?? 'Internal Server Error';
				toast.error(message);
			} else {
				toast.error('Client Error');
			}
			console.error(error);
		}
	},
	async deleteStoreById(data: { id: string }) {
		try {
			const response = await axios.delete(`${baseUrl}/store/${data.id}`, {
				withCredentials: true
			});
			toast.success(`berhasil menghapus Toko dengan Id ${data.id}`);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error?.response?.data.message ?? `Internal Server Error`;
				toast.error(message);
			} else {
				toast.error('Client Error');
			}
			console.error(error);
		}
	}
};
