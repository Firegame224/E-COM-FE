/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseUrl } from '$lib/constant/base-url';
import type { createOrder } from '$lib/types/order-types';
import type { createTransaction } from '$lib/types/user-types';
import axios from 'axios';
import toast from 'svelte-french-toast';

let transaction = '';
export const paymentHandle = {
	async handleOrder(data: createOrder) {
		try {
			await axios.post(
				`${import.meta.env.VITE_BASE_URL}/order/create`,
				{ productId: data.productId, price: data.price, quantity: data.quantity },
				{
					withCredentials: true
				}
			);
			
			toast.success("Order berhasil dibuat")
			window.location.reload();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data.message ?? 'Internal server Error';
				toast.error(message);
			} else {
				toast.error('Client Error');
			}
			console.error(error);
		}
	},
	async handleSnap(data : createTransaction) {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/order/pay`,
				{ productId : data.productId, orderId : data.orderId },
				{
					withCredentials: true
				}
			);
			const res = response.data;
			transaction = res.data;

			if (response.status === 200 && transaction) {
				(window as any).snap.pay(transaction, {
					onSuccess: async () => {
						try {
							const response = await axios.post(
								`${baseUrl}/order/success`,
								{
									productId : data.productId,
									orderId : data.orderId
								},
								{
									withCredentials: true
								}
							);
							toast.success('pembayaran Selesai');
							window.location.reload();
							return response;
						} catch (error) {
							if (axios.isAxiosError(error)) {
								const message = error.response?.data.message ?? 'Internal server error';
								toast.error(message); 
							} else {
								toast.error('Client Error');
							}
							console.log(error);
						}
					},
					onPending: () => {
						toast.loading('Menunggu Pembayaran');
					},
					onError: async () => {
						try {
							const response = await axios.post(
								`${baseUrl}/order/cancel`,
								{
									productId : data.productId,
									orderId : data.orderId
								},
								{
									withCredentials: true
								}
							);

							toast.error('pembayaran Dibatalkan');
							return response;
						} catch (error) {
							if (axios.isAxiosError(error)) {
								const message = error.response?.data.message ?? 'Internal server error';
								toast.error(message);
							} else {
								toast.error('Client Error');
							}
							console.log(error);
						}
					},
					onClose: () => {
						return;
					}
				});
			}
		} catch (error) {
			toast.error(`Error server: ${error}`);
		}
	}
};
