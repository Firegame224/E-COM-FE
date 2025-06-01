import type { orderType } from './order-types';

export interface Profile {
	id: string;
	email: string;
	role: string;
	profile: { name: string; image: string; bio: string };
	order: orderType[];
}

export interface createTransaction {
	productId: string;
	orderId: string;
}
