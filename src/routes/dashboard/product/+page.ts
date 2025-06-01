import { storeApi } from "$lib/providers/store-api";

export async function load() {
    const products = await storeApi.getStoresByUserId()

    return { products }
}