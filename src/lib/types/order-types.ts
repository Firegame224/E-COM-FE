import type { ProductType } from './product-types';
import type { Profile } from './user-types';

export interface orderType {
	order_id: string;
	user_id: string;
	product: ProductType;
	product_id: string;
	status: string;
	price: number;
	user: Profile;

	order_at: Date;
	finish_at: Date;
}

export interface createOrder {
	productId: string;
	quantity: number;
	price: number;
}
