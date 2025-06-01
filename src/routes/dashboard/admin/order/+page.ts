import { orderApi } from '$lib/providers/order-api';

export async function load() {
	const orders = await orderApi.getAllOrders();

	return { orders };
}
