import { storeApi } from "$lib/providers/store-api";

export async function load() {
    try {
        const stores = await storeApi.getStoresByUserId()

        return { stores : stores || [] }
    } catch (error) {
        console.log(error)
        return;
    }
}