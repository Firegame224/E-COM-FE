/* eslint-disable @typescript-eslint/no-unused-vars */
import { baseUrl } from '$lib/constant/base-url';
import axios from 'axios';
import toast from 'svelte-french-toast';

export const orderApi = {
	async getAllOrders() {
		try {
			const response = await axios.get(`${baseUrl}/admin/order`, {
				withCredentials: true
			});

			const order = response.data.data
			return order;
		} catch (error) {
			return;
		}
	},
	async getOrderUser() {
		try {
			const response = await axios.get(`${baseUrl}/order`, { withCredentials: true });
			const stores = response.data.data;
			return stores;
		} catch (error) {
			return;
		}
	},
	async deleteOrderById(data: { orderId: string }) {
		try {
			const response = await axios.delete(`${baseUrl}/order/${data.orderId}`, {
				withCredentials: true
			});
			toast.success(response.data.message);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data.message ?? 'Internal Server Error';
				toast.error(message);
			} else {
				toast.error('Client Error');
			}
			console.error(error);
		}
	}
};
