
import { orderApi } from '$lib/providers/order-api';

export async function load() {
	const order = await orderApi.getOrderUser()

	return {orders : order}
}
