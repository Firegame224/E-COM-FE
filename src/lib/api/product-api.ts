import { baseUrl } from '$lib/constant/base-url';
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
	async getProductByStoreId() {},
	async createProductByStoreId(data: {
		storeId: string;
		name: string;
		description: string;
		stok: number;
		price: number;
		image: File | string;
	}) {
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
	async updateProduct(data: {
		id: string;
		storeId: string;
		name: string;
		description: string;
		stok: number;
		price: number;
		image: File | string | undefined;
	}) {
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
	async getProductCategory() {
		try {
			const response = await axios.get(`${baseUrl}/category`);
			return response.data.data;
		} catch (error) {
			console.log(error);
			return;
		}
	},
	async addProductCategory(data: { id: string; name: string[] }) {
		try {
			if (data.name.length === 0 || !data.id ) {
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
	}
};
