import { productApi } from '$lib/providers/product-api.js';

export async function load({ url }) {
	const name = url.searchParams.get('name') ?? '';
	const product = await productApi.searchProduct({ name });

	return {
		product,
		url : name
	};
}
