import type { ProductType } from '$lib/types/product-types';

export const productRows = (data : {product : ProductType[]}) => {
    const productRows = data.product;

    return productRows
}


export const productColumns = [
	{
		key: 'product_name',
		label: 'Nama'
	},
	{
		key: 'price',
		label: 'Harga'
	},
	{
		key: 'stok',
		label: 'Stok'
	},
	{
		key: 'status',
		label: 'Status',
	}
];
