import type { orderType } from '$lib/types/order-types';

export const orderRows = (data: { orders: orderType[] }) => {
	const ordersRows = data.orders;

	return ordersRows;
};

export const orderColumns = [
	{
		key: 'order_id',
		label: 'id'
	},
	{
		key: 'user_id',
		label: 'userId'
	},
	{
		key: 'status',
		label: 'status'
	},
	{
		key: "order_at",
		label: 'order at'
	},
	{
		key: 'finish_at',
		label: 'finish_at'
	}
];
