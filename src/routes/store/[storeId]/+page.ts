import { storeApi } from '$lib/providers/store-api'

export async function load({params}) {
    const {storeId} = params
    const store = await storeApi.getStoreById({id : storeId})

    return store
}