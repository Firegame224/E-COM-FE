/* eslint-disable @typescript-eslint/no-unused-vars */
import { baseUrl } from '$lib/constant/base-url';
import type { createProduct, updateProducts } from '$lib/types/product-types';
import axios from 'axios';
import toast from 'svelte-french-toast';

export const productApi = {
	async getAllProducts() {
		try {
			const products = await axios.get(`${baseUrl}/product`);
			return products.data.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data.message ?? 'Internal Server Error';
				toast(message);
			} else {
				toast.error('Client Error');
			}
			console.error(error);
		}
	},
	async getTopProducts() {
		try {
			const products = await axios.get(`${baseUrl}/product/top`);
			return products.data.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data.message ?? 'Internal Server Error';
				toast(message);
			} else {
				toast.error('Client Error');
			}
			console.error(error);
		}
	},
	async getProductById(data: { id: string }) {
		try {
			const product = await axios.get(`${baseUrl}/product/${data.id}`);

			return product.data.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data.message ?? 'Internal Server Error';
				console.log(message);
			} else {
				toast.error('Client Error');
			}
			console.error(error);
		}
	},
	async searchProduct(data: { name: string | null }) {
		try {
			const response = await axios.get(`${baseUrl}/product/search?name=${data.name}`);
			const product = response.data;
			return product.data;
		} catch (error) {
			return [];
		}
	},
	async getProductByCategory(data: { name: string; page: number; limit: number }) {
		try {
			const response = await axios.get(
				`${baseUrl}/category/product?name=${data.name}&page=${data.page || 1}&limit=${data.limit || 10}`
			);
			return response.data.data
		} catch (error) {
			return [];
		}
	},
	async createProductByStoreId(data: createProduct) {
		try {
			const formData = new FormData();
			formData.append('storeId', data.storeId);
			formData.append('name', data.name);
			formData.append('description', data.description);
			formData.append('stok', String(data.stok));
			formData.append('price', String(data.price));
			if (data.image instanceof File) {
				formData.append('image', data.image);
			}
			const response = await axios.post(`${baseUrl}/product`, formData, {
				withCredentials: true,
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});

			toast.success('Berhasil menambahkan Product');
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
	async updateProduct(data: updateProducts) {
		try {
			const formData = new FormData();
			formData.append('storeId', data.storeId);
			formData.append('name', data.name);
			formData.append('description', data.description);
			formData.append('stok', String(data.stok));
			formData.append('price', String(data.price));
			if (data.image instanceof File) {
				formData.append('image', data.image);
			}
			const response = await axios.patch(`${baseUrl}/product/${data.id}`, formData, {
				withCredentials: true,
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});

			toast.success('Berhasil Memperbarui Product');
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
	async deleteById(data: { id: string }) {
		try {
			const response = await axios.delete(`${baseUrl}/product/${data.id}`);

			toast.success('Berhasil menambahkan Product Product');
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
	
};
