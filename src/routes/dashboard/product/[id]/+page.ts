import { catApi } from '$lib/providers/category-api.js';
import { productApi } from '$lib/providers/product-api';

export async function load({params}) {
    const product = await productApi.getProductById({id : params.id})
    const category = await catApi.getAllCategories();

    return {product : product, category}
}
