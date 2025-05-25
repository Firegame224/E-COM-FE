import { productApi } from '$lib/api/product-api.js';

export async function load({ params }) {
	try {
		const data= await productApi.getProductById({ id: params.id });

		return {
			product: data.product || {},
			category: data.category || []
		};
	} catch (error) {
		console.log(error);
		return { product: null };
	}
}
