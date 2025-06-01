import { commentApi } from '$lib/providers/comment-api.js';
import { productApi } from '$lib/providers/product-api.js';

export async function load({ params }) {
	try {
		const data = await productApi.getProductById({ id: params.id });
		const comment = await commentApi.getCommentsByProductId({ productId: params.id });
		return {
			product: data.product,
			category: data.category || [],
			comment : comment || []
		};
	} catch (error) {
		console.log(error);
		return { product: null };
	}
}
