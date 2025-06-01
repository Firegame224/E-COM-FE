import { productApi } from "$lib/providers/product-api";

export async function load({url}) {
    const pathname = url.pathname;
    const all = await productApi.getAllProducts();
    const top = await productApi.getTopProducts()
    return {product : all, top, pathname}
}
