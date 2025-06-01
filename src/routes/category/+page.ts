import { catApi } from '$lib/providers/category-api.js';
import { productApi } from '$lib/providers/product-api.js';

export async function load({url}) {
    const name = url.searchParams.get("name");
    const page = url.searchParams.get("page");
    const limit = url.searchParams.get("limit");

    const product = await productApi.getProductByCategory({name: name as string , page: Number(page), limit : Number(limit)})
    const category = await catApi.getAllCategories()
    return { product, url : name, category }
}