import { storeApi } from '$lib/providers/store-api.js';

export async function load({ params }) {
	try {
		const { storeId } = params;

		const store = await storeApi.getStoreById({ id: storeId });

        return {store}
	} catch (error) {
		console.log(error);
	}
}
