import { productApi } from "$lib/api/product-api";

export async function load() {
    const data = await productApi.getAllProducts()
    return {product : data}
}
