import { storeApi } from "$lib/api/store-api";

export async function load() {
    const products = await storeApi.getStoresByUserId()

    return { products }
}