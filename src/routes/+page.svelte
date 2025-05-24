<script>
	import { page } from '$app/state';
	import ProductCard from '$lib/components/product/product-card.svelte';

	const { product } = page.data;
</script>

<main class="p-5 h-full">
	<ProductCard Api={product} />
</main>