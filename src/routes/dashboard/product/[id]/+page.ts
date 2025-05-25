import { productApi } from '$lib/api/product-api';

export async function load({params}) {
    const product = await productApi.getProductById({id : params.id})
    const category = await productApi.getProductCategory()

    return {product : product, category}
}