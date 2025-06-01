import { storeApi } from '$lib/providers/store-api';
import { authSession } from '$lib/helpers/auth-check';

export async function load() {
	const user = await authSession();

	const stores = await storeApi.getStoresByUserId();

	return { user: user, stores: stores };
}
