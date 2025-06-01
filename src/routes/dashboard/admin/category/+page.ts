import { catApi } from '$lib/providers/category-api.js';
import { productApi } from '$lib/providers/product-api';

export async function load({ url }) {
	const name = url.searchParams.get('name');
	const page = url.searchParams.get('page');
	const limit = url.searchParams.get('limit');

	const category = await catApi.getAllCategories();
	const products = await productApi.getProductByCategory({
		name: name as string,
		page: Number(page),
		limit: Number(limit)
	});

	return { products : products, category, url : name };
}
