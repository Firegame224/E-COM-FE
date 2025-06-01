<script>
	import { page } from '$app/state';
	import Header from '$lib/components/header.svelte';
	import ProductCard from '$lib/components/product/product-card.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ShoppingBag } from '@lucide/svelte';

	const { product, top } = page.data;
</script>

<main class="flex h-full flex-col gap-3 px-5 py-5 md:px-44">
	<div class="relative flex w-full rounded-sm opacity-75">
		<img
			src="https://www.qiscus.com/id/wp-content/uploads/sites/2/2022/02/Cara-Membuat-Toko-Online.jpg"
			alt="Olshop"
			class="h-40 w-full rounded-sm object-cover md:h-80"
		/>
		<Button
			class="absolute bottom-2 right-2 bg-orange-600 font-semibold text-white hover:bg-orange-500"
		>
			<ShoppingBag class="h-5 w-5" />
			<p>Belanja Sekarang</p>
		</Button>
	</div>
	<Header title="Produk Terlaris" />
	<ProductCard Api={top} />
	<Header title="Semua Product" />
	<ProductCard Api={product} />
</main>
