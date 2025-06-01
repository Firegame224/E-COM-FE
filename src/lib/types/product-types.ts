export interface ProductType {
	id: string;
	product_name: string;
	stok: number;
	status: string;
	price: number;
	image: string;
	storeId: string;
	userId: string;
}

export interface createProduct {
	storeId: string;
	name: string;
	description: string;
	stok: number;
	price: number;
	image: File | string;
}

export interface updateProducts {
	id: string;
	storeId: string;
	name: string;
	description: string;
	stok: number;
	price: number;
	image: File | string | undefined;
}
