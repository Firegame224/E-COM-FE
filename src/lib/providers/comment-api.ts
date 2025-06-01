/* eslint-disable @typescript-eslint/no-unused-vars */
import { baseUrl } from '$lib/constant/base-url';
import axios from 'axios';
import toast from 'svelte-french-toast';

export const commentApi = {
	async getAllComments() {},
	async getCommentsByProductId(data: { productId: string }) {
		try {
			const response = await axios.get(`${baseUrl}/komentar/product?productId=${data.productId}`);

			return response.data.data;
		} catch (error) {
			return [];
		}
	},
	async createComment(data: { komentar: string; productId: string }) {
		try {
			const response = await axios.post(
				`${baseUrl}/komentar`,
				{
					productId: data.productId,
					komentar: data.komentar
				},
				{
					withCredentials: true
				}
			);
			toast.success(response.data.message, { position: 'bottom-right' });
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
	async deleteCommentById(data: { commentId: string }) {
		try {
			await axios.delete(`${baseUrl}/komentar/${data.commentId}`,{
                withCredentials : true
            });
			
            toast.success("berhasil menghapus komentar");
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
